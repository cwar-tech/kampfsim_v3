import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

import buildCombatRuntime
    from "../../factories/buildCombatRuntime.js";



describe(
    "combat boundary conditions",
    () => {

        test(
            "combat handles empty fleets",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet: {
                            units: []
                        },

                        defenderFleet: {
                            units: []
                        }
                    });

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );



        test(
            "combat handles attacker with no units",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet: {
                            units: []
                        }
                    });

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );



        test(
            "combat handles defender with no units",
            () => {

                const runtime =
                    buildCombatRuntime({

                        defenderFleet: {
                            units: []
                        }
                    });

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );



        test(
            "combat handles single unit fleets",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet: {

                            units: [

                                {
                                    runtimeUnitId:
                                        "a",

                                    hpPerUnit:
                                        100,

                                    dmgPerUnit:
                                        10,

                                    remainingUnits:
                                        1,

                                    remainingHp:
                                        100
                                }
                            ]
                        },

                        defenderFleet: {

                            units: [

                                {
                                    runtimeUnitId:
                                        "d",

                                    hpPerUnit:
                                        100,

                                    dmgPerUnit:
                                        10,

                                    remainingUnits:
                                        1,

                                    remainingHp:
                                        100
                                }
                            ]
                        }
                    });

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );



        test(
            "combat handles zero damage units",
            () => {

                const runtime =
                    buildCombatRuntime();

                runtime
                    .attackerFleet
                    .units
                    .forEach(

                        unit => {

                            unit.dmgPerUnit =
                                0;
                        }
                    );

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );



        test(
            "combat handles zero hp units",
            () => {

                const runtime =
                    buildCombatRuntime();

                runtime
                    .attackerFleet
                    .units
                    .forEach(

                        unit => {

                            unit.remainingHp =
                                0;
                        }
                    );

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );



        test(
            "combat handles very large damage values",
            () => {

                const runtime =
                    buildCombatRuntime();

                runtime
                    .attackerFleet
                    .units
                    .forEach(

                        unit => {

                            unit.dmgPerUnit =
                                1_000_000;
                        }
                    );

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                ).toBeDefined();
            }
        );



        test(
            "combat handles very large hp values",
            () => {

                const runtime =
                    buildCombatRuntime();

                runtime
                    .defenderFleet
                    .units
                    .forEach(

                        unit => {

                            unit.remainingHp =
                                1_000_000;
                        }
                    );

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                ).toBeDefined();
            }
        );



        test(
            "combat respects maxRounds boundary",
            () => {

                const runtime =
                    buildCombatRuntime();

                runtime.maxRounds =
                    1;

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.currentRound
                ).toBeLessThanOrEqual(
                    1
                );
            }
        );



        test(
            "combat remains serializable at boundaries",
            () => {

                const result =
                    resolveCombat(
                        buildCombatRuntime()
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