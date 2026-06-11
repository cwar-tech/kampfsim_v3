// ==================================================
// report/dto/OverflowEventData.js
// ==================================================

class OverflowEventData {

    constructor({

        sourceRuntimeUnitId,
        sourceUnitTypeId,
        sourceUnitName,

        targetRuntimeUnitId,
        targetUnitTypeId,
        targetUnitName,

        overflowDamage,

        basisOverflowDamage,

        overflowAfterLoss

    } = {}) {

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

        this.overflowDamage =
            overflowDamage;

        this.basisOverflowDamage =
            basisOverflowDamage;

        this.overflowAfterLoss =
            overflowAfterLoss;
    }
}

export default
    OverflowEventData;
