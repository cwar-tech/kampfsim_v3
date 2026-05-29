class DamageEvent {
    constructor({
        sourceRuntimeUnitId,
        targetRuntimeUnitId,

        sourceUnitTypeId,
        targetUnitTypeId,

        baseDamage,
        multiplier,

        appliedDamage,
        overflowDamage
    }) {
        this.sourceRuntimeUnitId = sourceRuntimeUnitId;
        this.targetRuntimeUnitId = targetRuntimeUnitId;

        this.sourceUnitTypeId = sourceUnitTypeId;
        this.targetUnitTypeId = targetUnitTypeId;

        this.baseDamage = baseDamage;
        this.multiplier = multiplier;

        this.appliedDamage = appliedDamage;
        this.overflowDamage = overflowDamage;
    }
}

module.exports = DamageEvent;