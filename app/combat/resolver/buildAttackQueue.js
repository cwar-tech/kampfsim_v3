// ==================================================
// app/combat/resolver/buildAttackQueue.js
// ==================================================

import findBestTarget
    from "./findBestTarget.js";

function buildAttackQueue(
    attackerFleet,
    defenderFleet
) {

    if (
        !attackerFleet ||
        !defenderFleet
    ) {

        throw new Error(

            "[QUEUE-000] Fleet missing"
        );
    }

    const queue = [];

    const attackerUnits =
        attackerFleet.units || [];

    const defenderUnits =
        defenderFleet.units || [];



    // ==========================================
    // BUILD QUEUE
    // ==========================================

    for (
        const attacker
        of attackerUnits
    ) {

        if (
            !attacker
        ) {
            continue;
        }

        if (
            attacker.remainingHp <= 0
        ) {
            continue;
        }

        if (
            typeof attacker.totalDamage !==
            "number"
        ) {

            throw new Error(

                `[QUEUE-001] totalDamage missing for ${attacker.unitTypeId}`
            );
        }

        if (
            attacker.totalDamage <= 0
        ) {
            continue;
        }



        // ==========================================
        // TARGET SELECTION
        // ==========================================

        const targetData =
            findBestTarget(

                attacker,

                defenderUnits
            );

        if (
            !targetData
        ) {
            continue;
        }



        // ==========================================
        // QUEUE ENTRY
        // ==========================================

        queue.push({

            attacker,

            target:
                targetData.target,

            availableTargets:
                defenderUnits,

            counterPercent:
                targetData.counterPercent,

            projectedDamage:
                targetData.projectedDamage,

            targetVolume:
                targetData.targetVolume
        });
    }



    // ==========================================
    // FINAL VALIDATION
    // ==========================================

    if (
        attackerUnits.length > 0 &&
        defenderUnits.length > 0 &&
        queue.length === 0
    ) {

        throw new Error(

            "[QUEUE-002] Queue generation failed"
        );
    }

    return queue;
}

export default
    buildAttackQueue;