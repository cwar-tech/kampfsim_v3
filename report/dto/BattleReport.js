// ==================================================
// report/dto/BattleReport.js
// ==================================================

class BattleReport {

    constructor({

        reportVersion,

        combatId,

        createdAt,

        overview,

        fleetState,

        advantages,

        analysis,

        combatLog,

        technical

    } = {}) {

        this.reportVersion =
            reportVersion;

        this.combatId =
            combatId;

        this.createdAt =
            createdAt;

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