class InvalidCombatStateError extends Error {
    constructor({
        message,
        combatId = null,
        roundNumber = null,
        code = "INVALID_COMBAT_STATE",
        details = null
    }) {
        super(message);

        this.name =
            "InvalidCombatStateError";

        this.combatId = combatId;

        this.roundNumber =
            roundNumber;

        this.code = code;

        this.details = details;

        Error.captureStackTrace(
            this,
            InvalidCombatStateError
        );
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            combatId: this.combatId,
            roundNumber:
                this.roundNumber,
            code: this.code,
            details: this.details
        };
    }
}

module.exports =
    InvalidCombatStateError;