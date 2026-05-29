import validateCombatFleetRuntime
    from "../../app/combat/validation/validateCombatFleetRuntime.js";

describe(
    "validateCombatFleetRuntime",
    () => {

        const validFleet = {

            fleetId:
                "fleet_alpha",

            ownerId:
                "player_1",

            totalUnits: 100,

            totalHp: 43000,

            totalDamage: 8500,

            totalVolume: 2000,

            units: [

                {
                    runtimeUnitId:
                        "runtime_lf_001",

                    unitTypeId:
                        "light_fighter",

                    amount: 100,

                    remainingUnits: 100,

                    hpLastUnit: 430
                }

            ]
        };



        // ==================================================
        // VALID RUNTIME
        // ==================================================

        test(
            "accepts valid combat fleet runtime",
            () => {

                const result =
                    validateCombatFleetRuntime(
                        validFleet
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
            "rejects missing fleetId",
            () => {

                const invalid = {
                    ...validFleet
                };

                delete invalid.fleetId;

                const result =
                    validateCombatFleetRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing units",
            () => {

                const invalid = {
                    ...validFleet
                };

                delete invalid.units;

                const result =
                    validateCombatFleetRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing totalHp",
            () => {

                const invalid = {
                    ...validFleet
                };

                delete invalid.totalHp;

                const result =
                    validateCombatFleetRuntime(
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
            "rejects string totalHp",
            () => {

                const invalid = {

                    ...validFleet,

                    totalHp: "43000"
                };

                const result =
                    validateCombatFleetRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects object units",
            () => {

                const invalid = {

                    ...validFleet,

                    units: {}
                };

                const result =
                    validateCombatFleetRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects null fleet runtime",
            () => {

                const result =
                    validateCombatFleetRuntime(
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
            "rejects negative totalHp",
            () => {

                const invalid = {

                    ...validFleet,

                    totalHp: -1
                };

                const result =
                    validateCombatFleetRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects negative totalDamage",
            () => {

                const invalid = {

                    ...validFleet,

                    totalDamage: -100
                };

                const result =
                    validateCombatFleetRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects negative totalUnits",
            () => {

                const invalid = {

                    ...validFleet,

                    totalUnits: -10
                };

                const result =
                    validateCombatFleetRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );



        // ==================================================
        // UNIT VALIDATION
        // ==================================================

        test(
            "rejects invalid unit runtime",
            () => {

                const invalid = {

                    ...validFleet,

                    units: [

                        {
                            runtimeUnitId:
                                "runtime_lf_001",

                            amount: -5
                        }

                    ]
                };

                const result =
                    validateCombatFleetRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects duplicate runtimeUnitIds",
            () => {

                const invalid = {

                    ...validFleet,

                    units: [

                        {
                            runtimeUnitId:
                                "runtime_lf_001",

                            unitTypeId:
                                "light_fighter",

                            amount: 50,

                            remainingUnits: 50,

                            hpLastUnit: 430
                        },

                        {
                            runtimeUnitId:
                                "runtime_lf_001",

                            unitTypeId:
                                "light_fighter",

                            amount: 50,

                            remainingUnits: 50,

                            hpLastUnit: 430
                        }

                    ]
                };

                const result =
                    validateCombatFleetRuntime(
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
            "rejects totalUnits below actual remaining units",
            () => {

                const invalid = {

                    ...validFleet,

                    totalUnits: 10
                };

                const result =
                    validateCombatFleetRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "accepts destroyed fleet",
            () => {

                const validDestroyed = {

                    ...validFleet,

                    totalUnits: 0,

                    totalHp: 0,

                    totalDamage: 0,

                    units: []
                };

                const result =
                    validateCombatFleetRuntime(
                        validDestroyed
                    );

                expect(result.valid)
                    .toBe(true);
            }
        );



        // ==================================================
        // EDGE CASES
        // ==================================================

        test(
            "rejects decimal totalUnits",
            () => {

                const invalid = {

                    ...validFleet,

                    totalUnits: 10.5
                };

                const result =
                    validateCombatFleetRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects empty fleetId",
            () => {

                const invalid = {

                    ...validFleet,

                    fleetId: ""
                };

                const result =
                    validateCombatFleetRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );

    }
);