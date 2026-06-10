// ==================================================
// report/builders/BattleReportBuilder.js
// ==================================================

import buildCombatLogData
    from "../services/buildCombatLogData.js";

import BattleReport
    from "../dto/BattleReport.js";

import buildAdvantagesData
    from "../services/buildAdvantagesData.js";

import AdvantageData
    from "../dto/AdvantageData.js";

import CombatLogData
    from "../dto/CombatLogData.js";

import TechnicalData
    from "../dto/TechnicalData.js";

import buildOverviewData
    from "../services/buildOverviewData.js";

import buildFleetStateData
    from "../services/buildFleetStateData.js";

import buildCombatAnalysisData
    from "../services/buildCombatAnalysisData.js";

function buildBattleReport(
    combatResult
) {

    if (
        !combatResult
    ) {

        throw new Error(

            "[REPORT-001] combatResult missing"
        );
    }

    const overview =
        buildOverviewData(
            combatResult
        );

    const fleetState =
        buildFleetStateData(
            combatResult
        );

    const analysis =
        buildCombatAnalysisData(
            combatResult
        );
    const advantages =
        buildAdvantagesData(
            combatResult
        );
    const combatLog =
        buildCombatLogData(
            combatResult
        );
    return new BattleReport({

        reportVersion:
            "1.0.0",

        combatId:
            combatResult.combatId,

        createdAt:
            Date.now(),

        overview,

        fleetState,

        advantages,

        analysis,

        combatLog,

        technical:
            new TechnicalData({

                damageEvents: [],

                overflowEvents: [],

                resolverData: [],

                exports: []
            })
    });
}

export default
    buildBattleReport;