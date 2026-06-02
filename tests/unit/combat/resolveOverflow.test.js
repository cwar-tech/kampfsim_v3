import resolveOverflow
    from "../../../app/combat/resolver/resolveOverflow.js";

import createRuntimeUnit
    from "../../factories/createRuntimeUnit.js";

import recalculateRuntimeState
    from "../../../app/combat/runtime/recalculateRuntimeState.js";

describe(
    "resolveOverflow",
    () => {

        // ==================================================
        // FACTORIES
        // ==================================================

        const createFleet =
            () => ([

                createRuntimeUnit({

                    runtimeUnitId:
                        "runtime_1",

                    shipTemplateId:
                        "fighter",

                    unitCount: 1
                }),

                createRuntimeUnit({

                    runtimeUnitId:
                        "runtime_2",

                    shipTemplateId:
                        "fighter",

                    unitCount: 1
                }),

                createRuntimeUnit({

                    runtimeUnitId:
                        "runtime_3",

                    shipTemplateId:
                        "fighter",

                    unitCount: 1
                })
            ]);



        // ==================================================
        // BASIC OVERFLOW
        // ==================================================

        test(
            "applies overflow to next target",
            () => {

                const fleet =
                    createFleet();

                fleet[0]
                    .remainingHp = 0;

                recalculateRuntimeState(
                    fleet[0]
                );

                const result =
                    resolveOverflow(
                        fleet,
                        200
                    );

                expect(
                    result.targets[1]
                        .remainingHp
                ).toBe(300);
            }
        );


        test(
            "consumes overflow deterministically",
            () => {

                const fleetA =
                    createFleet();

                const fleetB =
                    createFleet();

                fleetA[0]
                    .remainingHp = 0;

                fleetB[0]
                    .remainingHp = 0;

                recalculateRuntimeState(
                    fleetA[0]
                );

                recalculateRuntimeState(
                    fleetB[0]
                );

                const resultA =
                    resolveOverflow(
                        fleetA,
                        200
                    );

                const resultB =
                    resolveOverflow(
                        fleetB,
                        200
                    );

                expect(resultA)
                    .toEqual(resultB);
            }
        );



        // ==================================================
        // CHAIN DAMAGE
        // ==================================================

        test(
            "destroys multiple units through chaining",
            () => {

                const fleet =
                    createFleet();

                fleet[0]
                    .remainingHp = 0;

                recalculateRuntimeState(
                    fleet[0]
                );

                const result =
                    resolveOverflow(
                        fleet,
                        700
                    );

                expect(
                    result.targets[1]
                        .remainingHp
                ).toBe(0);

                expect(
                    result.targets[2]
                        .remainingHp
                ).toBe(300);

                expect(
                    result.targets[1]
                        .destroyed
                ).toBe(true);

                expect(
                    result.targets[2]
                        .destroyed
                ).toBe(false);
            }
        );


        test(
            "handles exact multi kill cleanly",
            () => {

                const fleet =
                    createFleet();

                fleet[0]
                    .remainingHp = 0;

                recalculateRuntimeState(
                    fleet[0]
                );

                const result =
                    resolveOverflow(
                        fleet,
                        1000
                    );

                expect(
                    result.targets[1]
                        .remainingHp
                ).toBe(0);

                expect(
                    result.targets[2]
                        .remainingHp
                ).toBe(0);

                expect(
                    result.remainingOverflow
                ).toBe(0);
            }
        );



        // ==================================================
        // FLEET WIPE
        // ==================================================

        test(
            "handles complete fleet wipe",
            () => {

                const fleet =
                    createFleet();

                fleet[0]
                    .remainingHp = 0;

                recalculateRuntimeState(
                    fleet[0]
                );

                const result =
                    resolveOverflow(
                        fleet,
                        2000
                    );

                expect(
                    result.targets[1]
                        .remainingHp
                ).toBe(0);

                expect(
                    result.targets[2]
                        .remainingHp
                ).toBe(0);

                expect(
                    result.targets[1]
                        .destroyed
                ).toBe(true);

                expect(
                    result.targets[2]
                        .destroyed
                ).toBe(true);
            }
        );


        test(
            "returns remaining overflow after fleet wipe",
            () => {

                const fleet =
                    createFleet();

                fleet[0]
                    .remainingHp = 0;

                recalculateRuntimeState(
                    fleet[0]
                );

                const result =
                    resolveOverflow(
                        fleet,
                        2000
                    );

                expect(
                    result.remainingOverflow
                ).toBe(1000);
            }
        );



        // ==================================================
        // MASS BATTLE STACKS
        // ==================================================

        test(
            "handles massive stack battles efficiently",
            () => {

                const fleet = [

                    createRuntimeUnit({

                        runtimeUnitId:
                            "massive_stack_1",

                        shipTemplateId:
                            "fighter",

                        unitCount:
                            100000
                    }),

                    createRuntimeUnit({

                        runtimeUnitId:
                            "massive_stack_2",

                        shipTemplateId:
                            "fighter",

                        unitCount:
                            100000
                    })
                ];

                fleet[0]
                    .remainingHp = 0;

                recalculateRuntimeState(
                    fleet[0]
                );

                const result =
                    resolveOverflow(
                        fleet,
                        12000000
                    );

                expect(
                    result.targets[1]
                        .remainingHp
                ).toBe(
                    38000000
                );

                expect(
                    result.targets[1]
                        .remainingUnits
                ).toBe(
                    76000
                );
            }
        );



        // ==================================================
        // SAFETY
        // ==================================================

        test(
            "never creates negative hp",
            () => {

                const fleet =
                    createFleet();

                fleet[0]
                    .remainingHp = 0;

                recalculateRuntimeState(
                    fleet[0]
                );

                const result =
                    resolveOverflow(
                        fleet,
                        999999
                    );

                for (
                    const unit
                    of result.targets
                ) {

                    expect(
                        unit.remainingHp
                    ).toBeGreaterThanOrEqual(
                        0
                    );
                }
            }
        );


        test(
            "never creates hp above totalHp",
            () => {

                const fleet =
                    createFleet();

                const result =
                    resolveOverflow(
                        fleet,
                        0
                    );

                for (
                    const unit
                    of result.targets
                ) {

                    expect(
                        unit.remainingHp
                    ).toBeLessThanOrEqual(
                        unit.totalHp
                    );
                }
            }
        );


        test(
            "never creates negative remaining units",
            () => {

                const fleet =
                    createFleet();

                fleet[0]
                    .remainingHp = 0;

                recalculateRuntimeState(
                    fleet[0]
                );

                const result =
                    resolveOverflow(
                        fleet,
                        999999
                    );

                for (
                    const unit
                    of result.targets
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
            "never creates NaN overflow",
            () => {

                const fleet =
                    createFleet();

                fleet[0]
                    .remainingHp = 0;

                recalculateRuntimeState(
                    fleet[0]
                );

                const result =
                    resolveOverflow(
                        fleet,
                        999999
                    );

                expect(
                    Number.isNaN(
                        result.remainingOverflow
                    )
                ).toBe(false);
            }
        );



        // ==================================================
        // EDGE CASES
        // ==================================================

        test(
            "handles zero overflow safely",
            () => {

                const fleet =
                    createFleet();

                const result =
                    resolveOverflow(
                        fleet,
                        0
                    );

                expect(
                    result.remainingOverflow
                ).toBe(0);
            }
        );


        test(
            "handles empty fleet",
            () => {

                const result =
                    resolveOverflow(
                        [],
                        500
                    );

                expect(
                    result.remainingOverflow
                ).toBe(500);
            }
        );


        test(
            "ignores already destroyed units",
            () => {

                const fleet =
                    createFleet();

                fleet[0]
                    .remainingHp = 0;

                recalculateRuntimeState(
                    fleet[0]
                );

                const result =
                    resolveOverflow(
                        fleet,
                        200
                    );

                expect(
                    result.targets[1]
                        .remainingHp
                ).toBe(300);
            }
        );



        // ==================================================
        // SERIALIZATION
        // ==================================================

        test(
            "creates replay safe result",
            () => {

                const fleet =
                    createFleet();

                const result =
                    resolveOverflow(
                        fleet,
                        500
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
            "creates serializable targets",
            () => {

                const fleet =
                    createFleet();

                const result =
                    resolveOverflow(
                        fleet,
                        500
                    );

                expect(
                    () =>
                        JSON.stringify(
                            result.targets
                        )
                ).not.toThrow();
            }
        );

    }
);