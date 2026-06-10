// ==================================================
// report/dto/CounterStatData.js
// ==================================================

class CounterStatData {

    constructor({

        sourceUnitTypeId,

        sourceUnitName,

        targetUnitTypeId,

        targetUnitName,

        multiplier

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
    }
}

export default
    CounterStatData;