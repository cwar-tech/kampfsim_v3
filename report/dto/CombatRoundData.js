// ==================================================
// report/dto/CombatRoundData.js
// ==================================================

class CombatRoundData {

    constructor({

        roundNumber,

        damageEvents

    } = {}) {

        this.roundNumber =
            roundNumber;

        this.damageEvents =
            damageEvents;
    }
}

export default
    CombatRoundData;