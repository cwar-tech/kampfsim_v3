class CombatRuntimeError extends Error {
  constructor({
    message,
    runtimeState = null,
    code = "COMBAT_RUNTIME_ERROR",
    details = null
  }) {
    super(message);

    this.name =
      "CombatRuntimeError";

    this.runtimeState =
      runtimeState;

    this.code = code;

    this.details = details;

    Error.captureStackTrace(
      this,
      CombatRuntimeError
    );
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      runtimeState:
        this.runtimeState,
      code: this.code,
      details: this.details
    };
  }
}

module.exports =
  CombatRuntimeError;