// ==================================================
// report/dto/CombatDamageEventData.js
// ==================================================

class CombatDamageEventData {

    constructor({

        sourceUnitTypeId,

        sourceUnitName,

        targetUnitTypeId,

        targetUnitName,

        multiplier,

        appliedDamage,

        targetDestroyed

    } = {}) {

        this.sourceUnitTypeId =
            sourceUnitTypeId;

        this.sourceUnitName =
            sourceUnitName;

        this.targetUnitTypeId =
            targetUnitTypeId;

        this.targetUnitName =
            targetUnitName;

        this.multiplier =
            multiplier;

        this.appliedDamage =
            appliedDamage;

        this.targetDestroyed =
            targetDestroyed;
    }
}

export default
    CombatDamageEventData;