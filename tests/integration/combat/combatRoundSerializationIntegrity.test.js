import resolveRound
    from "../../../app/combat/resolver/resolveRound.js";

describe(
    "combat round serialization integrity",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_round_serialization_001",

                currentRound: 1,

                maxRounds: 10,

                combatFinished: false,

                attackerDefeated: false,

                defenderDefeated: false,

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
            "combatRuntime survives serialization",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
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
                    restored.combatRuntime
                ).toEqual(
                    result.combatRuntime
                );
            }
        );


        test(
            "damageEvents survive serialization",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
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
            "overflowEvents survive serialization",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

                const result =
                    resolveRound(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    restored.overflowEvents
                ).toEqual(
                    result.overflowEvents
                );
            }
        );


        test(
            "roundRuntime survives serialization",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    restored.roundRuntime
                ).toEqual(
                    result.roundRuntime
                );
            }
        );


        test(
            "serialization remains deterministic",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                const resultA =
                    JSON.parse(
                        JSON.stringify(
                            resolveRound(
                                runtimeA
                            )
                        )
                    );

                const resultB =
                    JSON.parse(
                        JSON.stringify(
                            resolveRound(
                                runtimeB
                            )
                        )
                    );

                expect(
                    resultA
                ).toEqual(
                    resultB
                );
            }
        );


        test(
            "serialized runtime contains no undefined",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
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
            "serialized runtime remains replay safe",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                expect(
                    () =>
                        JSON.parse(
                            JSON.stringify(
                                result
                            )
                        )
                ).not.toThrow();
            }
        );


        test(
            "runtime ids survive serialization",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    restored
                        .combatRuntime
                        .attackerFleet
                        .units[0]
                        .runtimeUnitId
                ).toBe(
                    result
                        .combatRuntime
                        .attackerFleet
                        .units[0]
                        .runtimeUnitId
                );
            }
        );


        test(
            "serialized combatRuntime remains valid",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    restored.combatRuntime
                ).toBeDefined();
            }
        );

    }
);