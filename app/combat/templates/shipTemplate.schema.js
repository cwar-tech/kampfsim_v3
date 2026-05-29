const SHIP_TYPES = [
    "ship",
    "defense"
];

const shipTemplateSchema = {
    type: "array",

    minItems: 1,

    items: {
        type: "object",

        additionalProperties: false,

        required: [
            "unitTypeId",
            "name",
            "type",
            "hp",
            "damage",
            "volume",
            "armor",
            "penetration",
            "repairDuration",
            "damageMultipliers"
        ],

        properties: {
            unitTypeId: {
                type: "string",
                minLength: 1
            },

            name: {
                type: "string",
                minLength: 1
            },

            type: {
                type: "string",
                enum: SHIP_TYPES
            },

            hp: {
                type: "integer",
                minimum: 1
            },

            damage: {
                type: "integer",
                minimum: 0
            },

            speed: {
                type: "integer",
                minimum: 0
            },

            fuel: {
                type: "integer",
                minimum: 0
            },

            capacity: {
                type: "integer",
                minimum: 0
            },

            volume: {
                type: "integer",
                minimum: 1
            },

            armor: {
                type: "integer",
                minimum: 0,
                maximum: 100
            },

            penetration: {
                type: "integer",
                minimum: 0,
                maximum: 100
            },

            repairDuration: {
                type: "integer",
                minimum: 0
            },

            damageMultipliers: {
                type: "array",

                items: {
                    type: "object",

                    additionalProperties: false,

                    required: [
                        "targetType",
                        "multiplier"
                    ],

                    properties: {
                        targetType: {
                            type: "string",
                            minLength: 1
                        },

                        multiplier: {
                            type: "number",
                            minimum: 0
                        }
                    }
                }
            }
        }
    }
};

export default shipTemplateSchema;