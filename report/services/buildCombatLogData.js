// ==================================================
// report/services/buildCombatLogData.js
// ==================================================

import getReportShipData
    from "./getReportShipData.js";

import CombatLogData
    from "../dto/CombatLogData.js";

import CombatRoundData
    from "../dto/CombatRoundData.js";

import CombatAttackerData
    from "../dto/CombatAttackerData.js";

import CombatDamageEventData
    from "../dto/CombatDamageEventData.js";

function buildCombatLogData(
    combatResult
) {

    const rounds = [];

    for (
        const round
        of combatResult.rounds
    ) {

        const attackerMap =
            new Map();

        for (
            const event
            of round.damageEvents
        ) {

            const key =
                event.sourceRuntimeUnitId;

            const sourceShip =
                getReportShipData(
                    event.sourceUnitTypeId
                );

            const targetShip =
                getReportShipData(
                    event.targetUnitTypeId
                );

            if (
                !attackerMap.has(key)
            ) {

                attackerMap.set(

                    key,

                    new CombatAttackerData({

                        sourceRuntimeUnitId:
                            event.sourceRuntimeUnitId,

                        sourceUnitTypeId:
                            event.sourceUnitTypeId,

                        sourceUnitName:
                            sourceShip.name,

                        attacks: []
                    })
                );
            }

            attackerMap
                .get(key)
                .attacks
                .push(

                    new CombatDamageEventData({

                        sourceRuntimeUnitId:
                            event.sourceRuntimeUnitId,

                        sourceFleet:
                            event.sourceFleet,

                        sourceUnitTypeId:
                            event.sourceUnitTypeId,

                        sourceUnitName:
                            sourceShip.name,

                        targetRuntimeUnitId:
                            event.targetRuntimeUnitId,

                        targetFleet:
                            event.targetFleet,

                        targetUnitTypeId:
                            event.targetUnitTypeId,

                        targetUnitName:
                            targetShip.name,

                        attackChainStep:
                            event.attackChainStep,

                        targetPriority:
                            event.targetPriority,

                        targetHpBefore:
                            event.targetHpBefore,

                        targetRemainingHp:
                            event.targetRemainingHp,

                        hpDamage:

                            (event.targetHpBefore ?? 0) -

                            (event.targetRemainingHp ?? 0),

                        baseDamage:
                            event.baseDamage,

                        damageMultiplier:
                            event.damageMultiplier,

                        finalDamage:
                            event.finalDamage,

                        appliedDamage:
                            event.appliedDamage,

                        overflowDamage:
                            event.overflowDamage,

                        targetDestroyed:
                            event.targetDestroyed,

                        damageExplain:
                            event.damageExplain
                    })
                );
        }

        rounds.push(

            new CombatRoundData({

                roundNumber:
                    round.roundNumber,

                summary: {

                    attackerDamageDealt:
                        round.attackerDamageDealt,

                    defenderDamageDealt:
                        round.defenderDamageDealt,

                    attackerDestroyedUnits:

                        round
                            .attackerDestroyedUnits
                            ?.length || 0,

                    defenderDestroyedUnits:

                        round
                            .defenderDestroyedUnits
                            ?.length || 0
                },

                attackers:

                    Array.from(
                        attackerMap.values()
                    ),

                overflowEvents:
                    round.overflowEvents
            })
        );
    }

    return new CombatLogData({

        rounds
    });
}

export default
    buildCombatLogData;