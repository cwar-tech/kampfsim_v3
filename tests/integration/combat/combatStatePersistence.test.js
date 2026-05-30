import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat state persistence",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_persistence_001",

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
            "combat state survives persistence cycle",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const persisted =
                    JSON.stringify(
                        result
                    );

                const restored =
                    JSON.parse(
                        persisted
                    );

                expect(
                    restored
                ).toEqual(
                    result
                );
            }
        );


        test(
            "persisted combat preserves rounds",
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
            "persisted combat preserves fleets",
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
            "persisted combat preserves damage events",
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
            "persisted combat preserves overflow events",
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
            "persisted combat preserves winner state",
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
            "persisted combat preserves current round",
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
                    restored.currentRound
                ).toBe(
                    result.currentRound
                );
            }
        );


        test(
            "persisted combat preserves combatFinished state",
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
            }
        );


        test(
            "persisted combat remains deterministic",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                const snapshotA =
                    JSON.stringify(
                        resolveCombat(
                            runtimeA
                        )
                    );

                const snapshotB =
                    JSON.stringify(
                        resolveCombat(
                            runtimeB
                        )
                    );

                expect(
                    snapshotA
                ).toBe(
                    snapshotB
                );
            }
        );

    }
);