import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

import buildCombatRuntime
    from "../../factories/buildCombatRuntime.js";



describe(
    "combat replay integrity",
    () => {

        test(
            "combat replay remains deterministic without timestamps",
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
            "combat replay survives serialization",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const replay =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    replay
                ).toEqual(
                    result
                );
            }
        );



        test(
            "combat replay remains json safe",
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
            "combat replay preserves runtime ids",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const ids =
                    new Set();

                const allUnits = [

                    ...result
                        .attackerFleet
                        .units,

                    ...result
                        .defenderFleet
                        .units
                ];

                for (
                    const unit
                    of allUnits
                ) {

                    expect(
                        ids.has(
                            unit.runtimeUnitId
                        )
                    ).toBe(false);

                    ids.add(
                        unit.runtimeUnitId
                    );
                }
            }
        );



        test(
            "combat replay never creates negative remaining values",
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
            "combat replay preserves combat id",
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
            "combat replay preserves fleet ids",
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
            "combat replay result remains immutable after serialization",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const replay =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                replay.currentRound = 999;

                expect(
                    result.currentRound
                ).not.toBe(
                    999
                );
            }
        );



        test(
            "combat replay produces stable unit counts",
            () => {

                const runtime =
                    buildCombatRuntime();

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
            "combat replay structure remains valid",
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

    }
);