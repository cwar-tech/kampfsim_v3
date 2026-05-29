class ResolverInvariantError extends Error {
    constructor({
        message,
        combatId = null,
        roundNumber = null,
        invariant = null,
        code = "RESOLVER_INVARIANT_ERROR",
        details = null
    }) {
        super(message);

        this.name =
            "ResolverInvariantError";

        this.combatId = combatId;

        this.roundNumber =
            roundNumber;

        this.invariant =
            invariant;

        this.code = code;

        this.details = details;

        Error.captureStackTrace(
            this,
            ResolverInvariantError
        );
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            combatId: this.combatId,
            roundNumber:
                this.roundNumber,
            invariant:
                this.invariant,
            code: this.code,
            details: this.details
        };
    }
}

module.exports =
    ResolverInvariantError;