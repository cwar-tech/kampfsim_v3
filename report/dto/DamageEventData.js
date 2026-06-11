// ==================================================
// report/dto/DamageEventData.js
// ==================================================

class DamageEventData {

    constructor({

        damageEventId,

        sourceRuntimeUnitId,

        targetRuntimeUnitId,

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

        this.targetRuntimeUnitId =
            targetRuntimeUnitId;

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