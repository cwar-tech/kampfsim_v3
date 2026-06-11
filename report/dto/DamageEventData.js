// ==================================================
// report/dto/DamageEventData.js
// ==================================================

class DamageEventData {

    constructor({

        damageEventId,

        sourceRuntimeUnitId,
        sourceUnitTypeId,
        sourceUnitName,

        targetRuntimeUnitId,
        targetUnitTypeId,
        targetUnitName,

        baseDamage,

        damageMultiplier,

        finalDamage,

        appliedDamage,

        overflowDamage,

        targetDestroyed,

        targetRemainingHp

    } = {}) {

        this.damageEventId =
            damageEventId;

        this.sourceRuntimeUnitId =
            sourceRuntimeUnitId;

        this.sourceUnitTypeId =
            sourceUnitTypeId;

        this.sourceUnitName =
            sourceUnitName;

        this.targetRuntimeUnitId =
            targetRuntimeUnitId;

        this.targetUnitTypeId =
            targetUnitTypeId;

        this.targetUnitName =
            targetUnitName;

        this.baseDamage =
            baseDamage;

        this.damageMultiplier =
            damageMultiplier;

        this.finalDamage =
            finalDamage;

        this.appliedDamage =
            appliedDamage;

        this.overflowDamage =
            overflowDamage;

        this.targetDestroyed =
            targetDestroyed;

        this.targetRemainingHp =
            targetRemainingHp;
    }
}

export default
    DamageEventData;
