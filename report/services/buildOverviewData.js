// ==================================================
// report/builders/buildOverviewData.js
// ==================================================

import OverviewData
    from "../dto/OverviewData.js";

function buildOverviewData(
    combatResult
) {

    if (
        !combatResult
    ) {

        throw new Error(

            "[REPORT-004] combatResult missing"
        );
    }

    const attackerStartVolume =
        combatResult.attackerFleet
            .totalVolume;

    const attackerActiveVolume =
        combatResult.attackerFleet.units
            .reduce(

                (
                    sum,
                    unit
                ) =>

                    sum +
                    unit.remainingVolume,

                0
            );

    const defenderStartVolume =
        combatResult.defenderFleet
            .totalVolume;

    const defenderActiveVolume =
        combatResult.defenderFleet.units
            .reduce(

                (
                    sum,
                    unit
                ) =>

                    sum +
                    unit.remainingVolume,

                0
            );

    return new OverviewData({

        combatId:
            combatResult.combatId,

        winner:
            combatResult.combatResult,

        attackerStartVolume,

        attackerActiveVolume,

        attackerLossVolume:
            attackerStartVolume -
            attackerActiveVolume,

        defenderStartVolume,

        defenderActiveVolume,

        defenderLossVolume:
            defenderStartVolume -
            defenderActiveVolume
    });
}

export default
    buildOverviewData;