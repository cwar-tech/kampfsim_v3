import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

import buildCombatRuntime
    from "../../factories/buildCombatRuntime.js";



describe(
    "combat replay chain integrity",
    () => {

        test(
            "combat stores round history",
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
            "all rounds are serializable",
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
            "replay chain survives persistence cycle",
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
            "round order remains chronological",
            () => {

                const result =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                let previous =
                    0;

                for (
                    const round
                    of result.rounds
                ) {

                    expect(
                        round.round
                    ).toBeGreaterThan(
                        previous
                    );

                    previous =
                        round.round;
                }
            }
        );



        test(
            "damage events survive replay chain",
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
            "overflow events survive replay chain",
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
            "replay chain remains deterministic",
            () => {

                const resultA =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                const resultB =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                expect(
                    resultA.rounds.length
                ).toBe(
                    resultB.rounds.length
                );
            }
        );



        test(
            "round history never disappears after combat",
            () => {

                const result =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                expect(
                    result.rounds
                ).toBeDefined();
            }
        );



        test(
            "replay chain remains isolated",
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
            "replay chain never breaks combat serialization",
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