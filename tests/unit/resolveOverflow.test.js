import resolveOverflow
    from "../../app/combat/resolver/resolveOverflow.js";

describe(
    "resolveOverflow",
    () => {

        const createFleet = () => ([
            {
                runtimeUnitId:
                    "runtime_1",

                unitTypeId:
                    "fighter",

                amount: 1,

                remainingUnits: 1,

                hpLastUnit: 500
            },

            {
                runtimeUnitId:
                    "runtime_2",

                unitTypeId:
                    "fighter",

                amount: 1,

                remainingUnits: 1,

                hpLastUnit: 500
            },

            {
                runtimeUnitId:
                    "runtime_3",

                unitTypeId:
                    "fighter",

                amount: 1,

                remainingUnits: 1,

                hpLastUnit: 500
            }
        ]);



        // ==================================================
        // BASIC OVERFLOW
        // ==================================================

        test(
            "applies overflow to next target",
            () => {

                const fleet =
                    createFleet();

                const result =
                    resolveOverflow(
                        fleet,
                        200
                    );

                expect(
                    result.targets[0]
                        .hpLastUnit
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

                const result =
                    resolveOverflow(
                        fleet,
                        1200
                    );

                expect(
                    result.targets[0]
                        .remainingUnits
                ).toBe(0);

                expect(
                    result.targets[1]
                        .remainingUnits
                ).toBe(0);

                expect(
                    result.targets[2]
                        .remainingUnits
                ).toBe(1);

                expect(
                    result.targets[2]
                        .hpLastUnit
                ).toBe(300);
            }
        );


        test(
            "handles exact multi kill cleanly",
            () => {

                const fleet =
                    createFleet();

                const result =
                    resolveOverflow(
                        fleet,
                        1000
                    );

                expect(
                    result.targets[0]
                        .remainingUnits
                ).toBe(0);

                expect(
                    result.targets[1]
                        .remainingUnits
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

                const result =
                    resolveOverflow(
                        fleet,
                        2000
                    );

                expect(
                    result.targets[0]
                        .remainingUnits
                ).toBe(0);

                expect(
                    result.targets[1]
                        .remainingUnits
                ).toBe(0);

                expect(
                    result.targets[2]
                        .remainingUnits
                ).toBe(0);
            }
        );


        test(
            "returns remaining overflow after fleet wipe",
            () => {

                const fleet =
                    createFleet();

                const result =
                    resolveOverflow(
                        fleet,
                        2000
                    );

                expect(
                    result.remainingOverflow
                ).toBe(500);
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
                        unit.hpLastUnit
                    ).toBeGreaterThanOrEqual(
                        0
                    );
                }
            }
        );


        test(
            "never creates negative remaining units",
            () => {

                const fleet =
                    createFleet();

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
            "returns null for invalid fleet",
            () => {

                const result =
                    resolveOverflow(
                        null,
                        100
                    );

                expect(result)
                    .toBeNull();
            }
        );


        test(
            "returns null for negative overflow",
            () => {

                const fleet =
                    createFleet();

                const result =
                    resolveOverflow(
                        fleet,
                        -100
                    );

                expect(result)
                    .toBeNull();
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
                    .remainingUnits = 0;

                fleet[0]
                    .hpLastUnit = 0;

                const result =
                    resolveOverflow(
                        fleet,
                        200
                    );

                expect(
                    result.targets[1]
                        .hpLastUnit
                ).toBe(300);
            }
        );

    }
);