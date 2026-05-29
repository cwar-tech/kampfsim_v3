import validateUnitRuntime
    from "./validateUnitRuntime.js";

function validateCombatFleetRuntime(
    fleetRuntime
) {
    const errors = [];

    if (
        !fleetRuntime ||
        typeof fleetRuntime !== "object"
    ) {
        return {
            valid: false,
            errors: [
                {
                    field: "fleetRuntime",
                    message:
                        "fleetRuntime must be an object"
                }
            ]
        };
    }

    if (
        !fleetRuntime.fleetId ||
        typeof fleetRuntime.fleetId !==
        "string"
    ) {
        errors.push({
            field: "fleetId",
            message:
                "fleetId must be a non-empty string"
        });
    }

    if (
        typeof fleetRuntime.totalUnits !==
        "number" ||
        !Number.isInteger(
            fleetRuntime.totalUnits
        ) ||
        fleetRuntime.totalUnits < 0
    ) {
        errors.push({
            field: "totalUnits",
            message:
                "totalUnits must be a non-negative integer"
        });
    }

    if (
        typeof fleetRuntime.totalHp !==
        "number" ||
        fleetRuntime.totalHp < 0
    ) {
        errors.push({
            field: "totalHp",
            message:
                "totalHp must be a non-negative number"
        });
    }

    if (
        typeof fleetRuntime.totalDamage !==
        "number" ||
        fleetRuntime.totalDamage < 0
    ) {
        errors.push({
            field: "totalDamage",
            message:
                "totalDamage must be a non-negative number"
        });
    }

    if (
        !Array.isArray(
            fleetRuntime.units
        )
    ) {
        errors.push({
            field: "units",
            message:
                "units must be an array"
        });
    }

    if (
        errors.length > 0
    ) {
        return {
            valid: false,
            errors
        };
    }

    const runtimeUnitIds =
        new Set();

    let calculatedUnits = 0;

    for (
        const unit
        of fleetRuntime.units
    ) {

        const unitValidation =
            validateUnitRuntime(
                unit
            );

        if (
            !unitValidation.valid
        ) {
            return {
                valid: false,
                errors:
                    unitValidation.errors
            };
        }

        if (
            runtimeUnitIds.has(
                unit.runtimeUnitId
            )
        ) {
            return {
                valid: false,
                errors: [
                    {
                        field:
                            "runtimeUnitId",

                        message:
                            `duplicate runtimeUnitId '${unit.runtimeUnitId}'`
                    }
                ]
            };
        }

        runtimeUnitIds.add(
            unit.runtimeUnitId
        );

        calculatedUnits +=
            unit.remainingUnits;
    }

    if (
        calculatedUnits >
        fleetRuntime.totalUnits
    ) {
        return {
            valid: false,
            errors: [
                {
                    field:
                        "totalUnits",

                    message:
                        "totalUnits below actual remaining units"
                }
            ]
        };
    }

    return {
        valid: true,
        errors: []
    };
}

export default
    validateCombatFleetRuntime;