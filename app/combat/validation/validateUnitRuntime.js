import validateUnitRuntime from "../../app/combat/validation/validateUnitRuntime.js";

describe(
    "validateUnitRuntime",
    () => {
        const validRuntime = {
            runtimeUnitId:
                "runtime_light_fighter_1",

            unitTypeId:
                "light_fighter",

            amount: 100,

            remainingUnits: 100,

            hpLastUnit: 430
        };

        test(
            "accepts valid unit runtime",
            () => {
                const result =
                    validateUnitRuntime(
                        validRuntime
                    );

                expect(result.valid)
                    .toBe(true);

                expect(result.errors)
                    .toEqual([]);
            }
        );

        test(
            "rejects missing runtimeUnitId",
            () => {
                const invalid = {
                    ...validRuntime
                };

                delete invalid.runtimeUnitId;

                const result =
                    validateUnitRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );

        test(
            "rejects missing unitTypeId",
            () => {
                const invalid = {
                    ...validRuntime
                };

                delete invalid.unitTypeId;

                const result =
                    validateUnitRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );

        test(
            "rejects negative amount",
            () => {
                const invalid = {
                    ...validRuntime,

                    amount: -1
                };

                const result =
                    validateUnitRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );

        test(
            "rejects string amount",
            () => {
                const invalid = {
                    ...validRuntime,

                    amount: "100"
                };

                const result =
                    validateUnitRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );

        test(
            "rejects negative remainingUnits",
            () => {
                const invalid = {
                    ...validRuntime,

                    remainingUnits: -5
                };

                const result =
                    validateUnitRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );

        test(
            "rejects remainingUnits exceeding amount",
            () => {
                const invalid = {
                    ...validRuntime,

                    remainingUnits: 200
                };

                const result =
                    validateUnitRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );

        test(
            "rejects negative hpLastUnit",
            () => {
                const invalid = {
                    ...validRuntime,

                    hpLastUnit: -10
                };

                const result =
                    validateUnitRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );

        test(
            "rejects hpLastUnit above zero when no units remain",
            () => {
                const invalid = {
                    ...validRuntime,

                    remainingUnits: 0,

                    hpLastUnit: 50
                };

                const result =
                    validateUnitRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );

        test(
            "rejects hpLastUnit equal zero when units remain",
            () => {
                const invalid = {
                    ...validRuntime,

                    hpLastUnit: 0
                };

                const result =
                    validateUnitRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );

        test(
            "rejects non-object input",
            () => {
                const result =
                    validateUnitRuntime(
                        null
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );
    }
);