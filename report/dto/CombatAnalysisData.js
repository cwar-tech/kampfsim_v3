// ==================================================
// report/dto/CombatAnalysisData.js
// ==================================================

class CombatAnalysisData {

    constructor({

        outcomeFactors = [],

        counterStats = [],

        milestones = [],

        highlights = []

    } = {}) {

        this.outcomeFactors =
            outcomeFactors;

        this.counterStats =
            counterStats;

        this.milestones =
            milestones;

        this.highlights =
            highlights;
    }
}

export default
    CombatAnalysisData;