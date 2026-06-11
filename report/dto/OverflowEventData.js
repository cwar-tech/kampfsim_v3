// ==================================================
// report/dto/OverflowEventData.js
// ==================================================

class OverflowEventData {

    constructor({

        sourceRuntimeUnitId,

        targetRuntimeUnitId,

        overflowDamage,

        basisOverflowDamage,

        overflowAfterLoss

    } = {}) {

        this.sourceRuntimeUnitId =
            sourceRuntimeUnitId;

        this.targetRuntimeUnitId =
            targetRuntimeUnitId;

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