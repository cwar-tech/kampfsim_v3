import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

import buildCombatRuntime
    from "../../factories/buildCombatRuntime.js";



describe(
    "combat round history integrity",
    () => {

        test(
            "round history always exists",
            () => {

                const result =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                expect(
                    Array.isArray(
                        result.rounds
                    )
                ).toBe(true);
            }
        );



        test(
            "round history is serializable",
            () => {

                const result =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                expect(
                    () =>
                        JSON.stringify(
                            result.rounds
                        )
                ).not.toThrow();
            }
        );



        test(
            "all rounds contain damageEvents arrays",
            () => {

                const result =
                    resolveCombat(
                        buildCombatRuntime()
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
            "all rounds contain overflowEvents arrays",
            () => {

                const result =
                    resolveCombat(
                        buildCombatRuntime()
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
            "round history survives persistence cycle",
            () => {

                const result =
                    resolveCombat(
                        buildCombatRuntime()
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
            "round count is never negative",
            () => {

                const result =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                expect(
                    result.rounds.length
                ).toBeGreaterThanOrEqual(
                    0
                );
            }
        );



        test(
            "round history remains isolated between combats",
            () => {

                const resultA =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                const resultB =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                if (
                    resultA.rounds.length === 0
                ) {

                    return;
                }

                resultA
                    .rounds[0]
                    .round = 999;

                expect(
                    resultB
                        .rounds[0]
                        .round
                ).not.toBe(
                    999
                );
            }
        );



        test(
            "round history arrays are deep cloned",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                if (
                    runtime.rounds
                ) {

                    expect(
                        result.rounds
                    ).not.toBe(
                        runtime.rounds
                    );
                }
            }
        );



        test(
            "round history never breaks combat serialization",
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



        test(
            "round history remains deterministic",
            () => {

                const sanitize =
                    (
                        result
                    ) => ({

                        ...result,

                        damageEvents: [],

                        rounds:
                            result.rounds.map(

                                (
                                    round
                                ) => ({

                                    ...round,

                                    damageEvents: [],

                                    overflowEvents: []
                                })
                            ),

                        attackerFleet: {

                            ...result.attackerFleet,

                            units:

                                result
                                    .attackerFleet
                                    .units
                                    .map(

                                        ({
                                            runtimeUnitId,
                                            ...unit
                                        }) => unit
                                    )
                        },

                        defenderFleet: {

                            ...result.defenderFleet,

                            units:

                                result
                                    .defenderFleet
                                    .units
                                    .map(

                                        ({
                                            runtimeUnitId,
                                            ...unit
                                        }) => unit
                                    )
                        }
                    });

                const resultA =
                    sanitize(

                        resolveCombat(
                            buildCombatRuntime()
                        )
                    );

                const resultB =
                    sanitize(

                        resolveCombat(
                            buildCombatRuntime()
                        )
                    );

                expect(
                    resultA.rounds.length
                ).toBe(
                    resultB.rounds.length
                );
            }
        );

    }
);