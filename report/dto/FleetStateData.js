// ==================================================
// report/dto/FleetStateData.js
// ==================================================

class FleetStateData {

    constructor({

        attacker,

        defender

    } = {}) {

        this.attacker =
            attacker;

        this.defender =
            defender;
    }
}

export default
    FleetStateData;