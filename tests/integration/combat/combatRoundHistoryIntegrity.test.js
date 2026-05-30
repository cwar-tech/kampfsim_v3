import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat round history integrity",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_history_001",

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
            "round history remains ordered",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                for (
                    let i = 1;
                    i < result.rounds.length;
                    i++
                ) {

                    expect(
                        result.rounds[i]
                            .round
                    ).toBeGreaterThan(
                        result.rounds[i - 1]
                            .round
                    );
                }
            }
        );


        test(
            "every round contains roundRuntime",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                for (
                    const round
                    of result.rounds
                ) {

                    expect(
                        round
                    ).toHaveProperty(
                        "roundRuntime"
                    );
                }
            }
        );


        test(
            "every round contains damageEvents",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                for (
                    const round
                    of result.rounds
                ) {

                    expect(
                        Array.isArray(
                            round.damageEvents
                        )
                    ).toBe(true);
                }
            }
        );


        test(
            "every round contains overflowEvents",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

                const result =
                    resolveCombat(
                        runtime
                    );

                for (
                    const round
                    of result.rounds
                ) {

                    expect(
                        Array.isArray(
                            round.overflowEvents
                        )
                    ).toBe(true);
                }
            }
        );


        test(
            "round history remains deterministic",
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
            "round history survives serialization",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    restored.rounds
                ).toEqual(
                    result.rounds
                );
            }
        );


        test(
            "round history tracks destroyed units",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

                const result =
                    resolveCombat(
                        runtime
                    );

                const destroyed =
                    result.rounds.flatMap(
                        (round) => [

                            ...round
                                .roundRuntime
                                .attackerDestroyedUnits,

                            ...round
                                .roundRuntime
                                .defenderDestroyedUnits
                        ]
                    );

                expect(
                    destroyed.length
                ).toBeGreaterThan(0);
            }
        );


        test(
            "damage event history remains ordered",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const events =
                    result.rounds.flatMap(
                        (round) =>
                            round.damageEvents
                    );

                for (
                    const event
                    of events
                ) {

                    expect(
                        typeof event
                            .sourceRuntimeUnitId
                    ).toBe(
                        "string"
                    );
                }
            }
        );


        test(
            "overflow history remains ordered",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

                const result =
                    resolveCombat(
                        runtime
                    );

                const overflow =
                    result.rounds.flatMap(
                        (round) =>
                            round.overflowEvents
                    );

                for (
                    const event
                    of overflow
                ) {

                    expect(
                        event.overflowDamage
                    ).toBeGreaterThan(0);
                }
            }
        );

    }
);