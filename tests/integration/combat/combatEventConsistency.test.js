import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat event consistency",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_events_001",

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
            "all damage events contain source ids",
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
            "all damage events contain target ids",
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
                            .targetRuntimeUnitId
                    ).toBe(
                        "string"
                    );
                }
            }
        );


        test(
            "all damage events contain applied damage",
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
                        event.appliedDamage
                    ).toBeGreaterThan(0);
                }
            }
        );


        test(
            "overflow events contain overflow damage",
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


        test(
            "event ordering remains deterministic",
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
            "overflow ordering remains deterministic",
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
            "events remain serialization safe",
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

                expect(
                    () =>
                        JSON.stringify(
                            events
                        )
                ).not.toThrow();
            }
        );


        test(
            "overflow events remain serialization safe",
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

                expect(
                    () =>
                        JSON.stringify(
                            overflow
                        )
                ).not.toThrow();
            }
        );


        test(
            "events never contain undefined values",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const serialized =
                    JSON.stringify(
                        result.rounds.flatMap(
                            (round) =>
                                round.damageEvents
                        )
                    );

                expect(
                    serialized.includes(
                        "undefined"
                    )
                ).toBe(false);
            }
        );

    }
);