import selectTarget
    from "../../../app/combat/resolver/selectTarget.js";

describe(
    "selectTarget",
    () => {

        test(
            "returns first alive target",
            () => {

                const result =
                    selectTarget(
                        {},
                        [
                            {
                                runtimeUnitId:
                                    "dead",

                                remainingUnits: 0,

                                hpLastUnit: 0
                            },

                            {
                                runtimeUnitId:
                                    "alive",

                                remainingUnits: 5,

                                hpLastUnit: 500
                            }
                        ]
                    );

                expect(
                    result.runtimeUnitId
                ).toBe(
                    "alive"
                );
            }
        );


        test(
            "returns null if no targets alive",
            () => {

                const result =
                    selectTarget(
                        {},
                        [
                            {
                                remainingUnits: 0,

                                hpLastUnit: 0
                            }
                        ]
                    );

                expect(
                    result
                ).toBeNull();
            }
        );


        test(
            "filters self targeting",
            () => {

                const attacker = {

                    runtimeUnitId:
                        "unit_1"
                };

                const result =
                    selectTarget(
                        attacker,
                        [
                            {
                                runtimeUnitId:
                                    "unit_1",

                                remainingUnits: 5,

                                hpLastUnit: 500
                            }
                        ]
                    );

                expect(
                    result
                ).toBeNull();
            }
        );


        test(
            "filters destroyed hp targets",
            () => {

                const result =
                    selectTarget(
                        {},
                        [
                            {
                                runtimeUnitId:
                                    "destroyed",

                                remainingUnits: 5,

                                hpLastUnit: 0
                            }
                        ]
                    );

                expect(
                    result
                ).toBeNull();
            }
        );


        test(
            "handles malformed targets safely",
            () => {

                expect(
                    () =>
                        selectTarget(
                            {},
                            [null]
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles invalid target arrays safely",
            () => {

                const result =
                    selectTarget(
                        {},
                        null
                    );

                expect(
                    result
                ).toBeNull();
            }
        );

    }
);