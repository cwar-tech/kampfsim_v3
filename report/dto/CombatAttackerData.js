class CombatAttackerData {

    constructor({

        sourceRuntimeUnitId,

        sourceUnitTypeId,

        sourceUnitName,

        attacks = []

    }) {

        this.sourceRuntimeUnitId =
            sourceRuntimeUnitId;

        this.sourceUnitTypeId =
            sourceUnitTypeId;

        this.sourceUnitName =
            sourceUnitName;

        this.attacks =
            attacks;
    }
}

export default
    CombatAttackerData;