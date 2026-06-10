// ==================================================
// report/services/buildCombatAnalysisData.js
// ==================================================

import CombatAnalysisData
    from "../dto/CombatAnalysisData.js";

import buildMilestones
    from "./buildMilestones.js";

import buildCounterStats
    from "./buildCounterStats.js";
function buildCombatAnalysisData(
    combatResult
) {

    if (
        !combatResult
    ) {

        throw new Error(

            "[REPORT-006] combatResult missing"
        );
    }

    return new CombatAnalysisData({

        milestones: [],

        outcomeFactors: [],

        counterStats:
            buildCounterStats(
                combatResult
            ),

        highlights: []
    });
}

export default
    buildCombatAnalysisData;