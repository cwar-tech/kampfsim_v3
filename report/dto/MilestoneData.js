// ==================================================
// report/dto/MilestoneData.js
// ==================================================

class MilestoneData {

    constructor({

        round,

        side,

        unitTypeId,

        unitName,

        destroyedCount

    } = {}) {

        this.round =
            round;

        this.side =
            side;

        this.unitTypeId =
            unitTypeId;

        this.unitName =
            unitName;

        this.destroyedCount =
            destroyedCount;
    }
}

export default
    MilestoneData;