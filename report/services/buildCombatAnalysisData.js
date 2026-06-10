// ==================================================
// report/services/buildCombatAnalysisData.js
// ==================================================

import CombatAnalysisData
    from "../dto/CombatAnalysisData.js";

import buildMilestones
    from "./buildMilestones.js";

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

        milestones:
            buildMilestones(
                combatResult
            ),

        outcomeFactors: [],

        counterStats: [],

        highlights: []
    });
}

export default
    buildCombatAnalysisData;