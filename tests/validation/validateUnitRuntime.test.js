import validateUnitRuntime
    from "../../app/combat/validation/validateUnitRuntime.js";

describe(
    "validateUnitRuntime",
    () => {

        const validRuntime = {

            runtimeUnitId:
                "runtime_lf_001",

            unitTypeId:
                "light_fighter",

            amount: 100,

            remainingUnits: 100,

            hpLastUnit: 430
        };



        // ==================================================
        // VALID RUNTIME
        // ==================================================

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



        // ==================================================
        // REQUIRED FIELDS
        // ==================================================

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
            "rejects missing amount",
            () => {

                const invalid = {
                    ...validRuntime
                };

                delete invalid.amount;

                const result =
                    validateUnitRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing remainingUnits",
            () => {

                const invalid = {
                    ...validRuntime
                };

                delete invalid.remainingUnits;

                const result =
                    validateUnitRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing hpLastUnit",
            () => {

                const invalid = {
                    ...validRuntime
                };

                delete invalid.hpLastUnit;

                const result =
                    validateUnitRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );



        // ==================================================
        // TYPE VALIDATION
        // ==================================================

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
            "rejects string remainingUnits",
            () => {

                const invalid = {

                    ...validRuntime,

                    remainingUnits: "50"
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
            "rejects string hpLastUnit",
            () => {

                const invalid = {

                    ...validRuntime,

                    hpLastUnit: "430"
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
            "rejects array amount",
            () => {

                const invalid = {

                    ...validRuntime,

                    amount: []
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
            "rejects null runtime",
            () => {

                const result =
                    validateUnitRuntime(
                        null
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );



        // ==================================================
        // VALUE VALIDATION
        // ==================================================

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
            "rejects negative hpLastUnit",
            () => {

                const invalid = {

                    ...validRuntime,

                    hpLastUnit: -100
                };

                const result =
                    validateUnitRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );



        // ==================================================
        // CROSS VALIDATION
        // ==================================================

        test(
            "rejects remainingUnits above amount",
            () => {

                const invalid = {

                    ...validRuntime,

                    amount: 50,

                    remainingUnits: 60
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
            "rejects hpLastUnit above 0 when no units remain",
            () => {

                const invalid = {

                    ...validRuntime,

                    remainingUnits: 0,

                    hpLastUnit: 100
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
            "rejects hpLastUnit equal 0 when units remain",
            () => {

                const invalid = {

                    ...validRuntime,

                    remainingUnits: 10,

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



        // ==================================================
        // EDGE CASES
        // ==================================================

        test(
            "accepts destroyed runtime",
            () => {

                const validDestroyed = {

                    ...validRuntime,

                    remainingUnits: 0,

                    hpLastUnit: 0
                };

                const result =
                    validateUnitRuntime(
                        validDestroyed
                    );

                expect(result.valid)
                    .toBe(true);
            }
        );


        test(
            "accepts single damaged remaining unit",
            () => {

                const validDamaged = {

                    ...validRuntime,

                    amount: 1,

                    remainingUnits: 1,

                    hpLastUnit: 120
                };

                const result =
                    validateUnitRuntime(
                        validDamaged
                    );

                expect(result.valid)
                    .toBe(true);
            }
        );


        test(
            "rejects decimal amount",
            () => {

                const invalid = {

                    ...validRuntime,

                    amount: 10.5
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
            "rejects decimal remainingUnits",
            () => {

                const invalid = {

                    ...validRuntime,

                    remainingUnits: 4.2
                };

                const result =
                    validateUnitRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );

    }
);