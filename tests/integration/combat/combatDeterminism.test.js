import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

import buildCombatRuntime
    from "../../factories/buildCombatRuntime.js";



describe(
    "combat determinism",
    () => {

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



        test(
            "same combat input produces same result",
            () => {

                const runtimeA =
                    buildCombatRuntime();

                const runtimeB =
                    buildCombatRuntime();

                const resultA =
                    resolveCombat(
                        runtimeA
                    );

                const resultB =
                    resolveCombat(
                        runtimeB
                    );

                expect(
                    sanitize(
                        resultA
                    )
                ).toEqual(

                    sanitize(
                        resultB
                    )
                );
            }
        );



        test(
            "multiple combat executions remain stable",
            () => {

                const baseline =
                    sanitize(

                        resolveCombat(
                            buildCombatRuntime()
                        )
                    );

                for (
                    let i = 0;
                    i < 10;
                    i++
                ) {

                    const result =
                        sanitize(

                            resolveCombat(
                                buildCombatRuntime()
                            )
                        );

                    expect(
                        result
                    ).toEqual(
                        baseline
                    );
                }
            }
        );



        test(
            "combat results remain serialization stable",
            () => {

                const result =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                const serialized =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    serialized
                ).toEqual(
                    result
                );
            }
        );



        test(
            "combat never creates negative hp",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet: {

                            ...buildCombatRuntime()
                                .attackerFleet,

                            totalDamage:
                                999999999
                        }
                    });

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                        .attackerFleet
                        .totalHp
                ).toBeGreaterThanOrEqual(
                    0
                );

                expect(
                    result
                        .defenderFleet
                        .totalHp
                ).toBeGreaterThanOrEqual(
                    0
                );
            }
        );



        test(
            "combat never creates negative remaining units",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet: {

                            ...buildCombatRuntime()
                                .attackerFleet,

                            totalDamage:
                                999999999
                        }
                    });

                const result =
                    resolveCombat(
                        runtime
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
        );



        test(
            "combat preserves fleet ids",
            () => {

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
        );



        test(
            "combat preserves combat id",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.combatId
                ).toBe(
                    runtime.combatId
                );
            }
        );



        test(
            "combat result remains json safe",
            () => {

                const runtime =
                    buildCombatRuntime();

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
            "combat result remains structurally valid",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
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

                expect(
                    result
                ).toHaveProperty(
                    "combatFinished"
                );
            }
        );



        test(
            "combat never produces NaN values",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
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
        );

    }
);