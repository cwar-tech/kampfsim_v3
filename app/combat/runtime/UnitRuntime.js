class UnitRuntime {
    constructor({
        runtimeUnitId,
        unitTypeId,
        amount,
        remainingUnits,
        hpLastUnit
    }) {
        this.runtimeUnitId = runtimeUnitId;
        this.unitTypeId = unitTypeId;

        this.amount = amount;

        this.remainingUnits = remainingUnits;
        this.hpLastUnit = hpLastUnit;
    }
}

module.exports = UnitRuntime;
