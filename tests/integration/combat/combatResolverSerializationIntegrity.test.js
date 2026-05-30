import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat resolver serialization integrity",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_resolver_serialization_001",

                currentRound: 1,

                maxRounds: 5,

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

                            remainingUnits: 15,

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

                            remainingUnits: 15,

                            hpLastUnit: 500,

                            damage: 300,

                            receivedDamage: 0
                        }

                    ]
                }
            });



        test(
            "combat result survives serialization",
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
            "serialized combat remains deterministic",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                const resultA =
                    JSON.parse(
                        JSON.stringify(
                            resolveCombat(
                                runtimeA
                            )
                        )
                    );

                const resultB =
                    JSON.parse(
                        JSON.stringify(
                            resolveCombat(
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
            "serialized combat contains no undefined",
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
            "runtime ids survive serialization",
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
                    restored
                        .attackerFleet
                        .units[0]
                        .runtimeUnitId
                ).toBe(
                    result
                        .attackerFleet
                        .units[0]
                        .runtimeUnitId
                );
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

    }
);