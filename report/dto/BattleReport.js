// ==================================================
// report/dto/BattleReport.js
// ==================================================

class BattleReport {

    constructor({

        overview,

        fleetState,

        advantages,

        analysis,

        combatLog,

        technical

    } = {}) {

        this.overview =
            overview;

        this.fleetState =
            fleetState;

        this.advantages =
            advantages;

        this.analysis =
            analysis;

        this.combatLog =
            combatLog;

        this.technical =
            technical;
    }
}

export default
    BattleReport;