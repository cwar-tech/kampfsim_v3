import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

import buildCombatRuntime
    from "../../factories/buildCombatRuntime.js";



describe(
    "combat performance baseline",
    () => {

        test(
            "single combat finishes within acceptable time",
            () => {

                const runtime =
                    buildCombatRuntime();

                const start =
                    performance.now();

                resolveCombat(
                    runtime
                );

                const duration =
                    performance.now() -
                    start;

                expect(
                    duration
                ).toBeLessThan(
                    100
                );
            }
        );



        test(
            "100 combat executions remain stable",
            () => {

                const start =
                    performance.now();

                for (
                    let i = 0;
                    i < 100;
                    i++
                ) {

                    resolveCombat(
                        buildCombatRuntime()
                    );
                }

                const duration =
                    performance.now() -
                    start;

                expect(
                    duration
                ).toBeLessThan(
                    5000
                );
            }
        );



        test(
            "combat execution never throws under load",
            () => {

                expect(
                    () => {

                        for (
                            let i = 0;
                            i < 100;
                            i++
                        ) {

                            resolveCombat(
                                buildCombatRuntime()
                            );
                        }
                    }
                ).not.toThrow();
            }
        );



        test(
            "combat results remain valid under repetition",
            () => {

                for (
                    let i = 0;
                    i < 50;
                    i++
                ) {

                    const result =
                        resolveCombat(
                            buildCombatRuntime()
                        );

                    expect(
                        result
                    ).toHaveProperty(
                        "attackerFleet"
                    );

                    expect(
                        result
                    ).toHaveProperty(
                        "defenderFleet"
                    );
                }
            }
        );



        test(
            "combat results remain serializable under repetition",
            () => {

                for (
                    let i = 0;
                    i < 50;
                    i++
                ) {

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
            }
        );



        test(
            "combat results never produce NaN values under load",
            () => {

                for (
                    let i = 0;
                    i < 50;
                    i++
                ) {

                    const result =
                        resolveCombat(
                            buildCombatRuntime()
                        );

                    expect(
                        Number.isNaN(

                            result
                                .attackerFleet
                                .totalHp
                        )
                    ).toBe(false);

                    expect(
                        Number.isNaN(

                            result
                                .defenderFleet
                                .totalHp
                        )
                    ).toBe(false);
                }
            }
        );



        test(
            "combat preserves fleet ids under repetition",
            () => {

                for (
                    let i = 0;
                    i < 50;
                    i++
                ) {

                    const runtime =
                        buildCombatRuntime();

                    const result =
                        resolveCombat(
                            runtime
                        );

                    expect(
                        result
                            .attackerFleet
                            .fleetId
                    ).toBe(

                        runtime
                            .attackerFleet
                            .fleetId
                    );

                    expect(
                        result
                            .defenderFleet
                            .fleetId
                    ).toBe(

                        runtime
                            .defenderFleet
                            .fleetId
                    );
                }
            }
        );



        test(
            "combat preserves unit counts under repetition",
            () => {

                for (
                    let i = 0;
                    i < 50;
                    i++
                ) {

                    const result =
                        resolveCombat(
                            buildCombatRuntime()
                        );

                    for (
                        const unit
                        of result
                            .attackerFleet
                            .units
                    ) {

                        expect(
                            unit.remainingUnits
                        ).toBeGreaterThanOrEqual(
                            0
                        );
                    }

                    for (
                        const unit
                        of result
                            .defenderFleet
                            .units
                    ) {

                        expect(
                            unit.remainingUnits
                        ).toBeGreaterThanOrEqual(
                            0
                        );
                    }
                }
            }
        );



        const sanitize =
            (
                result
            ) => ({

                ...result,

                roundEvents: [],

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

        const baseline =
            sanitize(

                resolveCombat(
                    buildCombatRuntime()
                )
            );

        for (
            let i = 0;
            i < 20;
            i++
        ) {

            const current =
                sanitize(

                    resolveCombat(
                        buildCombatRuntime()
                    )
                );

            expect(
                current
            ).toEqual(
                baseline
            );
        }
    }
);



test(
    "combat memory footprint remains serializable",
    () => {

        const results =
            [];

        for (
            let i = 0;
            i < 100;
            i++
        ) {

            results.push(

                resolveCombat(
                    buildCombatRuntime()
                )
            );
        }

        expect(
            () =>
                JSON.stringify(
                    results
                )
        ).not.toThrow();
    }
);