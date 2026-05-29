import Ajv from "ajv";

import shipTemplateSchema
    from "./shipTemplate.schema.js";

const ajv = new Ajv({
    allErrors: true
});

const validateSchema =
    ajv.compile(
        shipTemplateSchema
    );

function validateShipTemplate(
    shipTemplates
) {
    const valid =
        validateSchema(
            shipTemplates
        );

    if (!valid) {
        return {
            valid: false,
            errors:
                validateSchema.errors
        };
    }

    const unitTypeIds =
        new Set();

    for (const template of shipTemplates) {

        if (
            unitTypeIds.has(
                template.unitTypeId
            )
        ) {
            return {
                valid: false,
                errors: [
                    {
                        message:
                            `duplicate unitTypeId: ${template.unitTypeId}`
                    }
                ]
            };
        }

        unitTypeIds.add(
            template.unitTypeId
        );
        const multiplierTargets =
            new Set();

        for (
            const multiplier
            of template.damageMultipliers
        ) {

            if (
                multiplierTargets.has(
                    multiplier.targetType
                )
            ) {
                return {
                    valid: false,
                    errors: [
                        {
                            message:
                                `duplicate multiplier targetType '${multiplier.targetType}' in '${template.unitTypeId}'`
                        }
                    ]
                };
            }

            multiplierTargets.add(
                multiplier.targetType
            );
        }

    }

    return {
        valid: true,
        errors: []
    };
}

export default validateShipTemplate;