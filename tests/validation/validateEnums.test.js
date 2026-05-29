import validateEnums
    from "../../app/combat/validation/validateEnums.js";

describe(
    "validateEnums",
    () => {

        // ==================================================
        // WINNER ENUM
        // ==================================================

        test(
            "accepts valid winner enum values",
            () => {

                const result =
                    validateEnums();

                expect(
                    result.enums.WINNERS
                ).toContain(
                    "attacker"
                );

                expect(
                    result.enums.WINNERS
                ).toContain(
                    "defender"
                );

                expect(
                    result.enums.WINNERS
                ).toContain(
                    "draw"
                );
            }
        );


        test(
            "rejects duplicate winner enum values",
            () => {

                const values =
                    validateEnums()
                        .enums
                        .WINNERS;

                const unique =
                    new Set(values);

                expect(
                    unique.size
                ).toBe(
                    values.length
                );
            }
        );



        // ==================================================
        // SHIP TYPES
        // ==================================================

        test(
            "accepts valid ship types",
            () => {

                const result =
                    validateEnums();

                expect(
                    result.enums.SHIP_TYPES
                ).toContain(
                    "ship"
                );

                expect(
                    result.enums.SHIP_TYPES
                ).toContain(
                    "defense"
                );
            }
        );


        test(
            "rejects duplicate ship types",
            () => {

                const values =
                    validateEnums()
                        .enums
                        .SHIP_TYPES;

                const unique =
                    new Set(values);

                expect(
                    unique.size
                ).toBe(
                    values.length
                );
            }
        );



        // ==================================================
        // TARGET TYPES
        // ==================================================

        test(
            "accepts target types",
            () => {

                const result =
                    validateEnums();

                expect(
                    result.enums.TARGET_TYPES
                ).toContain(
                    "light_fighter"
                );

                expect(
                    result.enums.TARGET_TYPES
                ).toContain(
                    "bomber"
                );
            }
        );


        test(
            "rejects duplicate target types",
            () => {

                const values =
                    validateEnums()
                        .enums
                        .TARGET_TYPES;

                const unique =
                    new Set(values);

                expect(
                    unique.size
                ).toBe(
                    values.length
                );
            }
        );



        // ==================================================
        // COMBAT STATES
        // ==================================================

        test(
            "accepts combat states",
            () => {

                const result =
                    validateEnums();

                expect(
                    result.enums.COMBAT_STATES
                ).toContain(
                    "running"
                );

                expect(
                    result.enums.COMBAT_STATES
                ).toContain(
                    "finished"
                );
            }
        );


        test(
            "rejects duplicate combat states",
            () => {

                const values =
                    validateEnums()
                        .enums
                        .COMBAT_STATES;

                const unique =
                    new Set(values);

                expect(
                    unique.size
                ).toBe(
                    values.length
                );
            }
        );



        // ==================================================
        // IMMUTABILITY
        // ==================================================

        test(
            "enum arrays are immutable",
            () => {

                const result =
                    validateEnums();

                expect(
                    Object.isFrozen(
                        result.enums.WINNERS
                    )
                ).toBe(true);

                expect(
                    Object.isFrozen(
                        result.enums.SHIP_TYPES
                    )
                ).toBe(true);

                expect(
                    Object.isFrozen(
                        result.enums.TARGET_TYPES
                    )
                ).toBe(true);

                expect(
                    Object.isFrozen(
                        result.enums.COMBAT_STATES
                    )
                ).toBe(true);
            }
        );



        // ==================================================
        // STRUCTURE
        // ==================================================

        test(
            "returns expected enum structure",
            () => {

                const result =
                    validateEnums();

                expect(
                    result.enums
                ).toHaveProperty(
                    "WINNERS"
                );

                expect(
                    result.enums
                ).toHaveProperty(
                    "SHIP_TYPES"
                );

                expect(
                    result.enums
                ).toHaveProperty(
                    "TARGET_TYPES"
                );

                expect(
                    result.enums
                ).toHaveProperty(
                    "COMBAT_STATES"
                );
            }
        );

    }
);