class OverflowEvent {

    constructor({

        sourceDamageEventId,

        previousTargetRuntimeUnitId,
        newTargetRuntimeUnitId,

        originalOverflowDamage,

        overflowLoss,

        normalizedOverflowDamage,

        previousMultiplierRemoved,

        newMultiplierApplied,

        // ==========================================
        // COMBAT ANALYSIS
        // ==========================================

        overflowLossReason = null,

        targetChangeTriggered = false,

        fleetChangeTriggered = false

    }) {

        this.sourceDamageEventId =
            sourceDamageEventId;

        this.previousTargetRuntimeUnitId =
            previousTargetRuntimeUnitId;

        this.newTargetRuntimeUnitId =
            newTargetRuntimeUnitId;

        this.originalOverflowDamage =
            originalOverflowDamage;

        this.overflowLoss =
            overflowLoss;

        this.normalizedOverflowDamage =
            normalizedOverflowDamage;

        this.previousMultiplierRemoved =
            previousMultiplierRemoved;

        this.newMultiplierApplied =
            newMultiplierApplied;

        // ==========================================
        // COMBAT ANALYSIS
        // ==========================================

        this.overflowLossReason =
            overflowLossReason;

        this.targetChangeTriggered =
            Boolean(
                targetChangeTriggered
            );

        this.fleetChangeTriggered =
            Boolean(
                fleetChangeTriggered
            );
    }
}

export default OverflowEvent;