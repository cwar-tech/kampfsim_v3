// ==================================================
// report/dto/FleetSideData.js
// ==================================================

class FleetSideData {

    constructor({

        startVolume,

        activeVolume,

        recoveryVolume,

        permanentLossVolume,

        units

    } = {}) {

        this.startVolume =
            startVolume;

        this.activeVolume =
            activeVolume;

        this.recoveryVolume =
            recoveryVolume;

        this.permanentLossVolume =
            permanentLossVolume;

        this.units =
            units;
    }
}

export default
    FleetSideData;