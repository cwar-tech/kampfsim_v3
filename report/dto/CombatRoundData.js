// ==================================================
// report/dto/CombatRoundData.js
// ==================================================

class CombatRoundData {

    constructor({

        roundNumber,

        summary,

        attackers = [],

        overflowEvents = []

    }) {

        this.roundNumber =
            roundNumber;

        this.summary =
            summary;

        this.attackers =
            attackers;

        this.overflowEvents =
            overflowEvents;
    }
}

export default
    CombatRoundData;