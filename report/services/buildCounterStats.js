// ==================================================
// report/services/buildCounterStats.js
// ==================================================

import CounterStatData
    from "../dto/CounterStatData.js";

import getReportShipData
    from "./getReportShipData.js";

function buildCounterStats(
    combatResult
) {

    const stats =
        [];

    const seen =
        new Set();

    for (
        const round
        of combatResult.rounds
    ) {

        for (
            const event
            of round.damageEvents
        ) {

            if (
                event.damageMultiplier <= 1
            ) {

                continue;
            }

            const sourceUnit =
                findUnitByRuntimeId(

                    combatResult,

                    event.sourceRuntimeUnitId
                );

            const targetUnit =
                findUnitByRuntimeId(

                    combatResult,

                    event.targetRuntimeUnitId
                );

            if (
                !sourceUnit ||
                !targetUnit
            ) {

                continue;
            }

            const key =
                `${sourceUnit.unitTypeId}_${targetUnit.unitTypeId}`;

            if (
                seen.has(
                    key
                )
            ) {

                continue;
            }

            seen.add(
                key
            );

            const sourceShip =
                getReportShipData(
                    sourceUnit.unitTypeId
                );

            const targetShip =
                getReportShipData(
                    targetUnit.unitTypeId
                );

            stats.push(

                new CounterStatData({

                    sourceUnitTypeId:
                        sourceUnit.unitTypeId,

                    sourceUnitName:
                        sourceShip.name,

                    targetUnitTypeId:
                        targetUnit.unitTypeId,

                    targetUnitName:
                        targetShip.name,

                    multiplier:
                        event.damageMultiplier
                })
            );
        }
    }

    return stats;
}

function findUnitByRuntimeId(
    combatResult,
    runtimeUnitId
) {

    const units = [

        ...combatResult.attackerFleet.units,

        ...combatResult.defenderFleet.units
    ];

    return units.find(

        unit =>

            unit.runtimeUnitId ===
            runtimeUnitId
    );
}

export default
    buildCounterStats;