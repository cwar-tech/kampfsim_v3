function validateUnitRuntime(
    unitRuntime
) {
    const errors = [];

    if (
        !unitRuntime ||
        typeof unitRuntime !== "object"
    ) {
        return {
            valid: false,
            errors: [
                {
                    field: "unitRuntime",
                    message:
                        "unitRuntime must be an object"
                }
            ]
        };
    }

    if (
        !unitRuntime.runtimeUnitId ||
        typeof unitRuntime.runtimeUnitId !==
        "string"
    ) {
        errors.push({
            field: "runtimeUnitId",
            message:
                "runtimeUnitId must be a non-empty string"
        });
    }

    if (
        !unitRuntime.unitTypeId ||
        typeof unitRuntime.unitTypeId !==
        "string"
    ) {
        errors.push({
            field: "unitTypeId",
            message:
                "unitTypeId must be a non-empty string"
        });
    }

    if (
        typeof unitRuntime.amount !==
        "number" ||
        !Number.isInteger(
            unitRuntime.amount
        ) ||
        unitRuntime.amount < 0
    ) {
        errors.push({
            field: "amount",
            message:
                "amount must be a non-negative integer"
        });
    }

    if (
        typeof unitRuntime.remainingUnits !==
        "number" ||
        !Number.isInteger(
            unitRuntime.remainingUnits
        ) ||
        unitRuntime.remainingUnits < 0
    ) {
        errors.push({
            field: "remainingUnits",
            message:
                "remainingUnits must be a non-negative integer"
        });
    }

    if (
        typeof unitRuntime.hpLastUnit !==
        "number" ||
        unitRuntime.hpLastUnit < 0
    ) {
        errors.push({
            field: "hpLastUnit",
            message:
                "hpLastUnit must be a non-negative number"
        });
    }

    if (
        unitRuntime.remainingUnits >
        unitRuntime.amount
    ) {
        errors.push({
            field: "remainingUnits",
            message:
                "remainingUnits cannot exceed amount"
        });
    }

    if (
        unitRuntime.remainingUnits === 0 &&
        unitRuntime.hpLastUnit > 0
    ) {
        errors.push({
            field: "hpLastUnit",
            message:
                "hpLastUnit must be 0 when no units remain"
        });
    }

    if (
        unitRuntime.remainingUnits > 0 &&
        unitRuntime.hpLastUnit <= 0
    ) {
        errors.push({
            field: "hpLastUnit",
            message:
                "hpLastUnit must be greater than 0 when units remain"
        });
    }

    return {
        valid:
            errors.length === 0,

        errors
    };
}

export default validateUnitRuntime;