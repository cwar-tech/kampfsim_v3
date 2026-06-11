// ==================================================
// report/services/buildTechnicalData.js
// ==================================================

import TechnicalData
    from "../dto/TechnicalData.js";

import DamageEventData
    from "../dto/DamageEventData.js";

import OverflowEventData
    from "../dto/OverflowEventData.js";

import ResolverData
    from "../dto/ResolverData.js";

import getReportShipData
    from "./getReportShipData.js";

function buildTechnicalData(
    combatResult
) {

    const damageEvents =
        [];

    const overflowEvents =
        [];

    let attackerDestroyed =
        0;

    let defenderDestroyed =
        0;

    for (
        const round
        of combatResult.rounds
    ) {

        attackerDestroyed +=
            round.attackerDestroyedUnits?.length ?? 0;

        defenderDestroyed +=
            round.defenderDestroyedUnits?.length ?? 0;

        for (
            const event
            of round.damageEvents
        ) {

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

            const sourceShip =
                getReportShipData(
                    sourceUnit.unitTypeId
                );

            const targetShip =
                getReportShipData(
                    targetUnit.unitTypeId
                );

            damageEvents.push(

                new DamageEventData({

                    ...event,

                    sourceUnitTypeId:
                        sourceUnit.unitTypeId,

                    sourceUnitName:
                        sourceShip.name,

                    targetUnitTypeId:
                        targetUnit.unitTypeId,

                    targetUnitName:
                        targetShip.name
                })
            );
        }

        for (
            const event
            of round.overflowEvents
        ) {

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

            const sourceShip =
                getReportShipData(
                    sourceUnit.unitTypeId
                );

            const targetShip =
                getReportShipData(
                    targetUnit.unitTypeId
                );

            overflowEvents.push(

                new OverflowEventData({

                    ...event,

                    sourceUnitTypeId:
                        sourceUnit.unitTypeId,

                    sourceUnitName:
                        sourceShip.name,

                    targetUnitTypeId:
                        targetUnit.unitTypeId,

                    targetUnitName:
                        targetShip.name
                })
            );
        }
    }

    return new TechnicalData({

        damageEvents,

        overflowEvents,

        resolverData:

            new ResolverData({

                combatRounds:
                    combatResult.rounds.length,

                damageEvents:
                    damageEvents.length,

                overflowEvents:
                    overflowEvents.length,

                attackerDestroyed,

                defenderDestroyed,

                combatFinished:
                    combatResult.combatFinished,

                combatResult:
                    combatResult.combatResult
            }),

        exports: []
    });
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
    buildTechnicalData;
