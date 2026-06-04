class DamageEvent {
    constructor({
        sourceRuntimeUnitId,
        targetRuntimeUnitId,

        sourceUnitTypeId,
        targetUnitTypeId,

        baseDamage,
        multiplier,

        appliedDamage,
        overflowDamage,

        // ==========================================
        // COMBAT ANALYSIS
        // ==========================================

        focusReason = null,

        counterBonus = 0,

        armorPercent = 0,

        penetrationPercent = 0,

        targetDestroyed = false,

        overflowTriggered = false
    }) {

        // ==========================================
        // SOURCE
        // ==========================================

        this.sourceRuntimeUnitId =
            sourceRuntimeUnitId;

        this.targetRuntimeUnitId =
            targetRuntimeUnitId;

        this.sourceUnitTypeId =
            sourceUnitTypeId;

        this.targetUnitTypeId =
            targetUnitTypeId;



        // ==========================================
        // DAMAGE
        // ==========================================

        this.baseDamage =
            baseDamage;

        this.multiplier =
            multiplier;

        this.appliedDamage =
            appliedDamage;

        this.overflowDamage =
            overflowDamage;



        // ==========================================
        // COMBAT ANALYSIS
        // ==========================================

        this.focusReason =
            focusReason;

        this.counterBonus =
            counterBonus;

        this.armorPercent =
            armorPercent;

        this.penetrationPercent =
            penetrationPercent;

        this.targetDestroyed =
            Boolean(
                targetDestroyed
            );

        this.overflowTriggered =
            Boolean(
                overflowTriggered
            );
    }
}

export default DamageEvent;