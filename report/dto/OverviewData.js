// ==================================================
// report/dto/OverviewData.js
// ==================================================

class OverviewData {

    constructor({

        combatId,

        winner,

        attacker,

        defender,

        highlights = []

    } = {}) {

        this.combatId =
            combatId;

        this.winner =
            winner;

        this.attacker =
            attacker;

        this.defender =
            defender;

        this.highlights =
            highlights;
    }
}

export default
    OverviewData;