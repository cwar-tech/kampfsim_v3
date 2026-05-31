import resolveOverflow
    from "../../../app/combat/resolver/resolveOverflow.js";

describe(
    "resolveOverflow",
    () => {

        const createTargets =
            () => ([

                {
                    runtimeUnitId:
                        "t1",

                    hp: 500,

                    remainingUnits: 5,

                    hpLastUnit: 500
                },

                {
                    runtimeUnitId:
                        "t2",

                    hp: 500,

                    remainingUnits: 5,

                    hpLastUnit: 500
                }
            ]);



        test(
            "returns targets",
            () => {

                const result =
                    resolveOverflow(
                        createTargets(),
                        500
                    );

                expect(
                    result.targets
                ).toBeDefined();
            }
        );


        test(
            "never creates negative units",
            () => {

                const result =
                    resolveOverflow(
                        createTargets(),
                        999999999
                    );

                for (
                    const target
                    of result.targets
                ) {

                    expect(
                        target.remainingUnits
                    ).toBeGreaterThanOrEqual(0);
                }
            }
        );


        test(
            "handles malformed targets safely",
            () => {

                expect(
                    () =>
                        resolveOverflow(
                            null,
                            100
                        )
                ).not.toThrow();
            }
        );

    }
);
