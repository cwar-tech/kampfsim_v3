import validateOverflowEvent
    from "../../app/combat/validation/validateOverflowEvent.js";

describe(
    "validateOverflowEvent",
    () => {

        const validOverflowEvent = {

            sourceDamageEventId:
                "damage_event_001",

            sourceRuntimeUnitId:
                "runtime_lf_001",

            targetRuntimeUnitId:
                "runtime_bomber_002",

            overflowDamage: 250,

            chainDepth: 1,

            maxChainDepth: 5
        };



        // ==================================================
        // VALID EVENT
        // ==================================================

        test(
            "accepts valid overflow event",
            () => {

                const result =
                    validateOverflowEvent(
                        validOverflowEvent
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
            "rejects missing sourceDamageEventId",
            () => {

                const invalid = {
                    ...validOverflowEvent
                };

                delete invalid.sourceDamageEventId;

                const result =
                    validateOverflowEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing sourceRuntimeUnitId",
            () => {

                const invalid = {
                    ...validOverflowEvent
                };

                delete invalid.sourceRuntimeUnitId;

                const result =
                    validateOverflowEvent(
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
                    ...validOverflowEvent
                };

                delete invalid.targetRuntimeUnitId;

                const result =
                    validateOverflowEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing overflowDamage",
            () => {

                const invalid = {
                    ...validOverflowEvent
                };

                delete invalid.overflowDamage;

                const result =
                    validateOverflowEvent(
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
            "rejects string overflowDamage",
            () => {

                const invalid = {

                    ...validOverflowEvent,

                    overflowDamage: "250"
                };

                const result =
                    validateOverflowEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects array chainDepth",
            () => {

                const invalid = {

                    ...validOverflowEvent,

                    chainDepth: []
                };

                const result =
                    validateOverflowEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects null event",
            () => {

                const result =
                    validateOverflowEvent(
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
            "rejects negative overflowDamage",
            () => {

                const invalid = {

                    ...validOverflowEvent,

                    overflowDamage: -1
                };

                const result =
                    validateOverflowEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects negative chainDepth",
            () => {

                const invalid = {

                    ...validOverflowEvent,

                    chainDepth: -1
                };

                const result =
                    validateOverflowEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects negative maxChainDepth",
            () => {

                const invalid = {

                    ...validOverflowEvent,

                    maxChainDepth: -5
                };

                const result =
                    validateOverflowEvent(
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
            "rejects chainDepth above maxChainDepth",
            () => {

                const invalid = {

                    ...validOverflowEvent,

                    chainDepth: 6,

                    maxChainDepth: 5
                };

                const result =
                    validateOverflowEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects zero overflowDamage",
            () => {

                const invalid = {

                    ...validOverflowEvent,

                    overflowDamage: 0
                };

                const result =
                    validateOverflowEvent(
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

                    ...validOverflowEvent,

                    sourceRuntimeUnitId:
                        "runtime_same",

                    targetRuntimeUnitId:
                        "runtime_same"
                };

                const result =
                    validateOverflowEvent(
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
            "accepts maximum allowed chain depth",
            () => {

                const valid = {

                    ...validOverflowEvent,

                    chainDepth: 5,

                    maxChainDepth: 5
                };

                const result =
                    validateOverflowEvent(
                        valid
                    );

                expect(result.valid)
                    .toBe(true);
            }
        );


        test(
            "rejects decimal overflowDamage",
            () => {

                const invalid = {

                    ...validOverflowEvent,

                    overflowDamage: 100.5
                };

                const result =
                    validateOverflowEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects decimal chainDepth",
            () => {

                const invalid = {

                    ...validOverflowEvent,

                    chainDepth: 1.5
                };

                const result =
                    validateOverflowEvent(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );

    }
);