// ==================================================
// report/services/buildCombatLogData.js
// ==================================================

import CombatLogData
    from "../dto/CombatLogData.js";

import CombatRoundData
    from "../dto/CombatRoundData.js";

import CombatDamageEventData
    from "../dto/CombatDamageEventData.js";

import getReportShipData
    from "./getReportShipData.js";

function buildCombatLogData(
    combatResult
) {

    const rounds =
        combatResult.rounds.map(

            round =>

                new CombatRoundData({

                    roundNumber:
                        round.roundNumber,

                    damageEvents:
                        buildDamageEvents(
                            combatResult,
                            round
                        )
                })
        );

    return new CombatLogData({

        rounds
    });
}

function buildDamageEvents(
    combatResult,
    round
) {

    return round.damageEvents.map(

        event => {

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

            return new CombatDamageEventData({

                sourceUnitTypeId:
                    sourceUnit.unitTypeId,

                sourceUnitName:
                    sourceShip.name,

                targetUnitTypeId:
                    targetUnit.unitTypeId,

                targetUnitName:
                    targetShip.name,

                multiplier:
                    event.damageMultiplier,

                appliedDamage:
                    event.appliedDamage,

                targetDestroyed:
                    event.targetDestroyed
            });
        }
    );
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
    buildCombatLogData;