class CombatValidationError extends Error {
    constructor({
        message,
        field = null,
        code = "COMBAT_VALIDATION_ERROR",
        details = null
    }) {
        super(message);

        this.name =
            "CombatValidationError";

        this.field = field;

        this.code = code;

        this.details = details;

        Error.captureStackTrace(
            this,
            CombatValidationError
        );
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            field: this.field,
            code: this.code,
            details: this.details
        };
    }
}

module.exports =
    CombatValidationError;