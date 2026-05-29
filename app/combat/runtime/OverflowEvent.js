class OverflowEvent {
    constructor({
        sourceDamageEventId,
        previousTargetRuntimeUnitId,
        newTargetRuntimeUnitId,
        originalOverflowDamage,
        overflowLoss,
        normalizedOverflowDamage,
        previousMultiplierRemoved,
        newMultiplierApplied
    }) {
        this.sourceDamageEventId = sourceDamageEventId;

        this.previousTargetRuntimeUnitId = previousTargetRuntimeUnitId;
        this.newTargetRuntimeUnitId = newTargetRuntimeUnitId;

        this.originalOverflowDamage = originalOverflowDamage;

        this.overflowLoss = overflowLoss;

        this.normalizedOverflowDamage = normalizedOverflowDamage;

        this.previousMultiplierRemoved = previousMultiplierRemoved;

        this.newMultiplierApplied = newMultiplierApplied;
    }
}

module.exports = OverflowEvent;