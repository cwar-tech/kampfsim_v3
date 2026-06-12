// ==================================================
// report/dto/CombatDamageEventData.js
// ==================================================

class CombatDamageEventData {

    constructor({

        hpDamage,

        sourceRuntimeUnitId,

        sourceFleet,

        sourceUnitTypeId,

        sourceUnitName,

        targetRuntimeUnitId,

        targetFleet,

        targetUnitTypeId,

        targetUnitName,

        attackChainStep,

        targetPriority,

        targetHpBefore,

        targetRemainingHp,

        baseDamage,

        damageMultiplier,

        finalDamage,

        appliedDamage,

        overflowDamage,

        targetDestroyed,

        damageExplain

    } = {}) {

        this.hpDamage =
            hpDamage;

        this.sourceRuntimeUnitId =
            sourceRuntimeUnitId;

        this.sourceFleet =
            sourceFleet;

        this.sourceUnitTypeId =
            sourceUnitTypeId;

        this.sourceUnitName =
            sourceUnitName;

        this.targetRuntimeUnitId =
            targetRuntimeUnitId;

        this.targetFleet =
            targetFleet;

        this.targetUnitTypeId =
            targetUnitTypeId;

        this.targetUnitName =
            targetUnitName;

        this.attackChainStep =
            attackChainStep;

        this.targetPriority =
            targetPriority;

        this.targetHpBefore =
            targetHpBefore;

        this.targetRemainingHp =
            targetRemainingHp;

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

        this.damageExplain =
            damageExplain;
    }
}

export default
    CombatDamageEventData;