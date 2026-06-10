// ==================================================
// report/dto/FleetUnitStateData.js
// ==================================================

class FleetUnitStateData {

    constructor({

        unitTypeId,

        name,

        image,

        volumePerUnit,

        hpPerUnit,

        dmgPerUnit,

        startCount,

        activeCount,

        recoveryCount,

        permanentLossCount

    } = {}) {

        this.unitTypeId =
            unitTypeId;

        this.name =
            name;

        this.image =
            image;

        this.volumePerUnit =
            volumePerUnit;

        this.hpPerUnit =
            hpPerUnit;

        this.dmgPerUnit =
            dmgPerUnit;

        this.startCount =
            startCount;

        this.activeCount =
            activeCount;

        this.recoveryCount =
            recoveryCount;

        this.permanentLossCount =
            permanentLossCount;
    }
}

export default
    FleetUnitStateData;