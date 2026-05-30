import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat serialization",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_serialization_001",

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
            "combat result is serializable",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    () =>
                        JSON.stringify(
                            result
                        )
                ).not.toThrow();
            }
        );


        test(
            "serialized combat can be restored",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const serialized =
                    JSON.stringify(
                        result
                    );

                const restored =
                    JSON.parse(
                        serialized
                    );

                expect(
                    restored
                ).toEqual(
                    result
                );
            }
        );


        test(
            "serialized rounds remain intact",
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
                    restored.rounds.length
                ).toBe(
                    result.rounds.length
                );
            }
        );


        test(
            "serialized damage events remain intact",
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
                    restored.damageEvents
                ).toEqual(
                    result.damageEvents
                );
            }
        );


        test(
            "serialized overflow events remain intact",
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
            "serialized runtime remains deterministic",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                const resultA =
                    JSON.stringify(
                        resolveCombat(
                            runtimeA
                        )
                    );

                const resultB =
                    JSON.stringify(
                        resolveCombat(
                            runtimeB
                        )
                    );

                expect(
                    resultA
                ).toBe(
                    resultB
                );
            }
        );


        test(
            "serialized combat contains no undefined values",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const serialized =
                    JSON.stringify(
                        result
                    );

                expect(
                    serialized.includes(
                        "undefined"
                    )
                ).toBe(false);
            }
        );


        test(
            "serialized combat remains replay safe",
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
                    restored.currentRound
                ).toBe(
                    result.currentRound
                );
            }
        );


        test(
            "empty combat serializes safely",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units = [];

                runtime
                    .defenderFleet
                    .units = [];

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    () =>
                        JSON.stringify(
                            result
                        )
                ).not.toThrow();
            }
        );

    }
);