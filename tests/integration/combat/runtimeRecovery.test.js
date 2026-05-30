import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "runtime recovery",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_recovery_001",

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
            "restored runtime resolves identically",
            () => {

                const originalRuntime =
                    createCombatRuntime();

                const restoredRuntime =
                    JSON.parse(
                        JSON.stringify(
                            originalRuntime
                        )
                    );

                const originalResult =
                    resolveCombat(
                        originalRuntime
                    );

                const restoredResult =
                    resolveCombat(
                        restoredRuntime
                    );

                expect(
                    restoredResult
                ).toEqual(
                    originalResult
                );
            }
        );


        test(
            "runtime survives serialization roundtrip",
            () => {

                const runtime =
                    createCombatRuntime();

                const serialized =
                    JSON.stringify(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        serialized
                    );

                expect(
                    restored
                ).toEqual(
                    runtime
                );
            }
        );


        test(
            "runtime recovery preserves rounds",
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
            "runtime recovery preserves fleets",
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
                    restored.attackerFleet
                ).toEqual(
                    result.attackerFleet
                );

                expect(
                    restored.defenderFleet
                ).toEqual(
                    result.defenderFleet
                );
            }
        );


        test(
            "runtime recovery preserves combat state",
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
                    restored.combatFinished
                ).toBe(
                    result.combatFinished
                );

                expect(
                    restored.attackerDefeated
                ).toBe(
                    result.attackerDefeated
                );

                expect(
                    restored.defenderDefeated
                ).toBe(
                    result.defenderDefeated
                );
            }
        );


        test(
            "runtime recovery preserves event history",
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

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                const originalEvents =
                    result.rounds.flatMap(
                        (round) =>
                            round.damageEvents
                    );

                const restoredEvents =
                    restored.rounds.flatMap(
                        (round) =>
                            round.damageEvents
                    );

                expect(
                    restoredEvents
                ).toEqual(
                    originalEvents
                );
            }
        );


        test(
            "runtime recovery preserves overflow chains",
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

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                const originalOverflow =
                    result.rounds.flatMap(
                        (round) =>
                            round.overflowEvents
                    );

                const restoredOverflow =
                    restored.rounds.flatMap(
                        (round) =>
                            round.overflowEvents
                    );

                expect(
                    restoredOverflow
                ).toEqual(
                    originalOverflow
                );
            }
        );


        test(
            "runtime recovery remains deterministic",
            () => {

                const runtime =
                    createCombatRuntime();

                const snapshotA =
                    JSON.stringify(
                        resolveCombat(
                            runtime
                        )
                    );

                const snapshotB =
                    JSON.stringify(
                        resolveCombat(
                            JSON.parse(
                                JSON.stringify(
                                    runtime
                                )
                            )
                        )
                    );

                expect(
                    snapshotA
                ).toBe(
                    snapshotB
                );
            }
        );


        test(
            "empty runtime recovers safely",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units = [];

                runtime
                    .defenderFleet
                    .units = [];

                const serialized =
                    JSON.stringify(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        serialized
                    );

                expect(
                    restored
                ).toEqual(
                    runtime
                );
            }
        );

    }
);