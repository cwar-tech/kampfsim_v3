// ==================================================
// report/dto/OverviewData.js
// ==================================================

class OverviewData {

    constructor({

        combatId,

        winner,

        attackerStartVolume,

        attackerActiveVolume,

        attackerLossVolume,

        defenderStartVolume,

        defenderActiveVolume,

        defenderLossVolume

    } = {}) {

        this.combatId =
            combatId;

        this.winner =
            winner;

        this.attackerStartVolume =
            attackerStartVolume;

        this.attackerActiveVolume =
            attackerActiveVolume;

        this.attackerLossVolume =
            attackerLossVolume;

        this.defenderStartVolume =
            defenderStartVolume;

        this.defenderActiveVolume =
            defenderActiveVolume;

        this.defenderLossVolume =
            defenderLossVolume;
    }
}

export default
    OverviewData;