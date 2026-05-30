import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "replay consistency across runs",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_consistency_001",

                currentRound: 1,

                maxRounds: 10,

                combatFinished: false,

                attackerDefeated: false,

                defenderDefeated: false,

                rounds: [],

                attackerFleet: {

                    fleetId:
                        "fleet_attacker",

                    units: [

                        {
                            runtimeUnitId:
                                "attacker_1",

                            unitTypeId:
                                "fighter",

                            hp: 500,

                            remainingUnits: 10,

                            hpLastUnit: 500,

                            damage: 300,

                            receivedDamage: 0
                        }

                    ]
                },

                defenderFleet: {

                    fleetId:
                        "fleet_defender",

                    units: [

                        {
                            runtimeUnitId:
                                "defender_1",

                            unitTypeId:
                                "fighter",

                            hp: 500,

                            remainingUnits: 10,

                            hpLastUnit: 500,

                            damage: 300,

                            receivedDamage: 0
                        }

                    ]
                }
            });



        test(
            "multiple executions remain identical",
            () => {

                const snapshots = [];

                for (
                    let i = 0;
                    i < 25;
                    i++
                ) {

                    const runtime =
                        createCombatRuntime();

                    const result =
                        resolveCombat(
                            runtime
                        );

                    snapshots.push(
                        JSON.stringify(
                            result
                        )
                    );
                }

                for (
                    let i = 1;
                    i < snapshots.length;
                    i++
                ) {

                    expect(
                        snapshots[i]
                    ).toBe(
                        snapshots[0]
                    );
                }
            }
        );


        test(
            "event ordering remains stable",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                const resultA =
                    resolveCombat(
                        runtimeA
                    );

                const resultB =
                    resolveCombat(
                        runtimeB
                    );

                const eventsA =
                    resultA.rounds.flatMap(
                        (round) =>
                            round.damageEvents
                    );

                const eventsB =
                    resultB.rounds.flatMap(
                        (round) =>
                            round.damageEvents
                    );

                expect(
                    eventsA
                ).toEqual(
                    eventsB
                );
            }
        );


        test(
            "overflow ordering remains stable",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                runtimeA
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

                runtimeB
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

                const resultA =
                    resolveCombat(
                        runtimeA
                    );

                const resultB =
                    resolveCombat(
                        runtimeB
                    );

                const overflowA =
                    resultA.rounds.flatMap(
                        (round) =>
                            round.overflowEvents
                    );

                const overflowB =
                    resultB.rounds.flatMap(
                        (round) =>
                            round.overflowEvents
                    );

                expect(
                    overflowA
                ).toEqual(
                    overflowB
                );
            }
        );


        test(
            "round history remains identical",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                const resultA =
                    resolveCombat(
                        runtimeA
                    );

                const resultB =
                    resolveCombat(
                        runtimeB
                    );

                expect(
                    resultA.rounds
                ).toEqual(
                    resultB.rounds
                );
            }
        );


        test(
            "winner state remains stable",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                runtimeA
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

                runtimeB
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

                const resultA =
                    resolveCombat(
                        runtimeA
                    );

                const resultB =
                    resolveCombat(
                        runtimeB
                    );

                expect(
                    resultA.defenderDefeated
                ).toBe(
                    resultB.defenderDefeated
                );
            }
        );


        test(
            "serialized snapshots remain identical",
            () => {

                const snapshots = [];

                for (
                    let i = 0;
                    i < 10;
                    i++
                ) {

                    const runtime =
                        createCombatRuntime();

                    const result =
                        resolveCombat(
                            runtime
                        );

                    snapshots.push(
                        JSON.stringify(
                            result
                        )
                    );
                }

                for (
                    let i = 1;
                    i < snapshots.length;
                    i++
                ) {

                    expect(
                        snapshots[i]
                    ).toBe(
                        snapshots[0]
                    );
                }
            }
        );


        test(
            "combat result structure remains stable",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                ).toHaveProperty(
                    "combatFinished"
                );

                expect(
                    result
                ).toHaveProperty(
                    "rounds"
                );

                expect(
                    result
                ).toHaveProperty(
                    "attackerFleet"
                );

                expect(
                    result
                ).toHaveProperty(
                    "defenderFleet"
                );
            }
        );


        test(
            "repeated replay execution never mutates original runtime",
            () => {

                const runtime =
                    createCombatRuntime();

                const original =
                    JSON.stringify(
                        runtime
                    );

                resolveCombat(
                    runtime
                );

                expect(
                    JSON.stringify(
                        runtime
                    )
                ).toBe(
                    original
                );
            }
        );


        test(
            "empty combat remains replay stable",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                runtimeA
                    .attackerFleet
                    .units = [];

                runtimeA
                    .defenderFleet
                    .units = [];

                runtimeB
                    .attackerFleet
                    .units = [];

                runtimeB
                    .defenderFleet
                    .units = [];

                const resultA =
                    resolveCombat(
                        runtimeA
                    );

                const resultB =
                    resolveCombat(
                        runtimeB
                    );

                expect(
                    resultA
                ).toEqual(
                    resultB
                );
            }
        );

    }
);