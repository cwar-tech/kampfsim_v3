import validateDamageEvent
    from "../../app/combat/validation/validateDamageEvent.js";

describe(
    "validateDamageEvent",
    () => {

        const validDamageEvent = {

            sourceRuntimeUnitId:
                "runtime_lf_001",

            targetRuntimeUnitId:
                "runtime_bomber_001",

            sourceUnitTypeId:
                "light_fighter",

            targetUnitTypeId:
                "bomber",

            baseDamage: 500,

            multiplier: 2,

            appliedDamage: 1000,

            overflowDamage: 0
        };



        // ==================================================
        // VALID EVENT
        // ==================================================

        test(
            "accepts valid damage event",
            () => {

                const result =
                    validateDamageEvent(
                        validDamageEvent
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
            "rejects missing sourceRuntimeUnitId",
            () => {

                const invalid = {
                    ...validDamageEvent
                };

                delete invalid.sourceRuntimeUnitId;

                const result =
                    validateDamageEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing targetRuntimeUnitId",
            () => {

                const invalid = {
                    ...validDamageEvent
                };

                delete invalid.targetRuntimeUnitId;

                const result =
                    validateDamageEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing baseDamage",
            () => {

                const invalid = {
                    ...validDamageEvent
                };

                delete invalid.baseDamage;

                const result =
                    validateDamageEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing appliedDamage",
            () => {

                const invalid = {
                    ...validDamageEvent
                };

                delete invalid.appliedDamage;

                const result =
                    validateDamageEvent(
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
            "rejects string baseDamage",
            () => {

                const invalid = {

                    ...validDamageEvent,

                    baseDamage: "500"
                };

                const result =
                    validateDamageEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects string appliedDamage",
            () => {

                const invalid = {

                    ...validDamageEvent,

                    appliedDamage: "1000"
                };

                const result =
                    validateDamageEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects array multiplier",
            () => {

                const invalid = {

                    ...validDamageEvent,

                    multiplier: []
                };

                const result =
                    validateDamageEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects null overflowDamage",
            () => {

                const invalid = {

                    ...validDamageEvent,

                    overflowDamage: null
                };

                const result =
                    validateDamageEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );



        // ==================================================
        // VALUE VALIDATION
        // ==================================================

        test(
            "rejects negative baseDamage",
            () => {

                const invalid = {

                    ...validDamageEvent,

                    baseDamage: -1
                };

                const result =
                    validateDamageEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects negative appliedDamage",
            () => {

                const invalid = {

                    ...validDamageEvent,

                    appliedDamage: -100
                };

                const result =
                    validateDamageEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects negative overflowDamage",
            () => {

                const invalid = {

                    ...validDamageEvent,

                    overflowDamage: -50
                };

                const result =
                    validateDamageEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects multiplier below 0",
            () => {

                const invalid = {

                    ...validDamageEvent,

                    multiplier: -1
                };

                const result =
                    validateDamageEvent(
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
            "rejects appliedDamage above multiplied baseDamage",
            () => {

                const invalid = {

                    ...validDamageEvent,

                    multiplier: 2,

                    baseDamage: 500,

                    appliedDamage: 1200
                };

                const result =
                    validateDamageEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );



        test(
            "rejects overflowDamage above appliedDamage",
            () => {

                const invalid = {

                    ...validDamageEvent,

                    appliedDamage: 100,

                    overflowDamage: 200
                };

                const result =
                    validateDamageEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects same source and target runtime ids",
            () => {

                const invalid = {

                    ...validDamageEvent,

                    sourceRuntimeUnitId:
                        "runtime_same",

                    targetRuntimeUnitId:
                        "runtime_same"
                };

                const result =
                    validateDamageEvent(
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
            "accepts exact damage without overflow",
            () => {

                const valid = {

                    ...validDamageEvent,

                    appliedDamage: 1000,

                    overflowDamage: 0
                };

                const result =
                    validateDamageEvent(
                        valid
                    );

                expect(result.valid)
                    .toBe(true);
            }
        );


        test(
            "accepts overflow chain event",
            () => {

                const valid = {

                    ...validDamageEvent,

                    appliedDamage: 1000,

                    overflowDamage: 250
                };

                const result =
                    validateDamageEvent(
                        valid
                    );

                expect(result.valid)
                    .toBe(true);
            }
        );


        test(
            "rejects decimal appliedDamage",
            () => {

                const invalid = {

                    ...validDamageEvent,

                    appliedDamage: 1000.5
                };

                const result =
                    validateDamageEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );

    }
);