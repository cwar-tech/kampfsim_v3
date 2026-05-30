import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat resolver deep clone integrity",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_resolver_deep_clone_001",

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
            "resolver returns cloned runtime",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                ).not.toBe(
                    runtime
                );
            }
        );


        test(
            "resolver clones fleets",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.attackerFleet
                ).not.toBe(
                    runtime.attackerFleet
                );

                expect(
                    result.defenderFleet
                ).not.toBe(
                    runtime.defenderFleet
                );
            }
        );


        test(
            "resolver clones unit arrays",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                        .attackerFleet
                        .units
                ).not.toBe(
                    runtime
                        .attackerFleet
                        .units
                );

                expect(
                    result
                        .defenderFleet
                        .units
                ).not.toBe(
                    runtime
                        .defenderFleet
                        .units
                );
            }
        );


        test(
            "resolver clones unit objects",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                        .attackerFleet
                        .units[0]
                ).not.toBe(
                    runtime
                        .attackerFleet
                        .units[0]
                );

                expect(
                    result
                        .defenderFleet
                        .units[0]
                ).not.toBe(
                    runtime
                        .defenderFleet
                        .units[0]
                );
            }
        );


        test(
            "deep clone integrity remains deterministic",
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
                    resultA
                ).toEqual(
                    resultB
                );
            }
        );

    }
);