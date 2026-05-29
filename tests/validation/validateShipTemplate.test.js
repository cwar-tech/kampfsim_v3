import ships from "../../app/combat/templates/ships.json" with {
    type: "json"
};

import validateShipTemplate from "../../app/combat/templates/validateShipTemplate.js";

describe(
    "validateShipTemplate",
    () => {

        const validShip =
            ships.find(
                (ship) =>
                    ship.unitTypeId ===
                    "light_fighter"
            );

        test(
            "accepts valid ship template",
            () => {

                const result =
                    validateShipTemplate([
                        validShip
                    ]);

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
            "rejects missing unitTypeId",
            () => {

                const invalid = [
                    {
                        ...validShip
                    }
                ];

                delete invalid[0].unitTypeId;

                const result =
                    validateShipTemplate(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing hp",
            () => {

                const invalid = [
                    {
                        ...validShip
                    }
                ];

                delete invalid[0].hp;

                const result =
                    validateShipTemplate(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing damage",
            () => {

                const invalid = [
                    {
                        ...validShip
                    }
                ];

                delete invalid[0].damage;

                const result =
                    validateShipTemplate(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing armor",
            () => {

                const invalid = [
                    {
                        ...validShip
                    }
                ];

                delete invalid[0].armor;

                const result =
                    validateShipTemplate(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing penetration",
            () => {

                const invalid = [
                    {
                        ...validShip
                    }
                ];

                delete invalid[0].penetration;

                const result =
                    validateShipTemplate(
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
            "rejects string hp",
            () => {

                const invalid = [
                    {
                        ...validShip,

                        hp: "100"
                    }
                ];

                const result =
                    validateShipTemplate(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects string damage",
            () => {

                const invalid = [
                    {
                        ...validShip,

                        damage: "500"
                    }
                ];

                const result =
                    validateShipTemplate(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects array armor",
            () => {

                const invalid = [
                    {
                        ...validShip,

                        armor: []
                    }
                ];

                const result =
                    validateShipTemplate(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects null penetration",
            () => {

                const invalid = [
                    {
                        ...validShip,

                        penetration: null
                    }
                ];

                const result =
                    validateShipTemplate(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );



        // ==================================================
        // ENUM VALIDATION
        // ==================================================

        test(
            "rejects invalid type enum",
            () => {

                const invalid = [
                    {
                        ...validShip,

                        type: "invalid_type"
                    }
                ];

                const result =
                    validateShipTemplate(
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
            "rejects negative hp",
            () => {

                const invalid = [
                    {
                        ...validShip,

                        hp: -1
                    }
                ];

                const result =
                    validateShipTemplate(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects negative armor",
            () => {

                const invalid = [
                    {
                        ...validShip,

                        armor: -10
                    }
                ];

                const result =
                    validateShipTemplate(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects negative penetration",
            () => {

                const invalid = [
                    {
                        ...validShip,

                        penetration: -5
                    }
                ];

                const result =
                    validateShipTemplate(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects armor above 100",
            () => {

                const invalid = [
                    {
                        ...validShip,

                        armor: 150
                    }
                ];

                const result =
                    validateShipTemplate(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );



        // ==================================================
        // DAMAGE MULTIPLIER VALIDATION
        // ==================================================

        test(
            "rejects duplicate damage multiplier targetType",
            () => {

                const invalid = [
                    {
                        ...validShip,

                        damageMultipliers: [

                            {
                                targetType:
                                    "bomber",

                                multiplier: 2
                            },

                            {
                                targetType:
                                    "bomber",

                                multiplier: 3
                            }

                        ]
                    }
                ];

                const result =
                    validateShipTemplate(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects negative multiplier",
            () => {

                const invalid = [
                    {
                        ...validShip,

                        damageMultipliers: [

                            {
                                targetType:
                                    "bomber",

                                multiplier: -2
                            }

                        ]
                    }
                ];

                const result =
                    validateShipTemplate(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );



        // ==================================================
        // STRUCTURE VALIDATION
        // ==================================================

        test(
            "rejects additional unknown properties",
            () => {

                const invalid = [
                    {
                        ...validShip,

                        invalidField: true
                    }
                ];

                const result =
                    validateShipTemplate(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects duplicate unitTypeId",
            () => {

                const invalid = [

                    {
                        ...validShip
                    },

                    {
                        ...validShip
                    }

                ];

                const result =
                    validateShipTemplate(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects empty template array",
            () => {

                const result =
                    validateShipTemplate([]);

                expect(result.valid)
                    .toBe(false);
            }
        );

    }
);