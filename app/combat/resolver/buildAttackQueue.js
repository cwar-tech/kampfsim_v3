// ==================================================
// app/combat/resolver/buildAttackQueue.js
// ==================================================

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

    const attackerUnits =
        attackerFleet.units || [];

    const defenderUnits =
        defenderFleet.units || [];

    const queue = [];



    // ==========================================
    // VALIDATE DEFENDER UNITS
    // ==========================================

    for (
        const unit
        of defenderUnits
    ) {

        if (
            !unit
        ) {
            continue;
        }

        if (
            typeof unit.unitCategory !==
            "string"
        ) {

            throw new Error(

                `[QUEUE-001] unitCategory missing for ${unit.unitTypeId}`
            );
        }
    }



    // ==========================================
    // DEFENSE PRIORITY
    // ==========================================

    const aliveDefenses =
        defenderUnits.filter(

            unit =>

                unit &&
                unit.remainingHp > 0 &&
                unit.unitCategory ===
                "defense"
        );

    const aliveShips =
        defenderUnits.filter(

            unit =>

                unit &&
                unit.remainingHp > 0 &&
                unit.unitCategory ===
                "ship"
        );

    const candidateTargets =

        aliveDefenses.length > 0

            ? aliveDefenses

            : aliveShips;



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



        // ==========================================
        // VALIDATE ATTACKER
        // ==========================================

        if (
            typeof attacker.totalDamage !==
            "number"
        ) {

            throw new Error(

                `[QUEUE-002] totalDamage missing for ${attacker.unitTypeId}`
            );
        }

        if (
            attacker.totalDamage <= 0
        ) {

            throw new Error(

                `[QUEUE-003] totalDamage must be > 0 for ${attacker.unitTypeId}`
            );
        }



        if (
            candidateTargets.length === 0
        ) {
            continue;
        }



        // ==========================================
        // BIGGEST TARGET
        // ==========================================

        const sortedTargets =

            [...candidateTargets]

                .sort(

                    (a, b) => {

                        const volumeA =
                            a.remainingVolume || 0;

                        const volumeB =
                            b.remainingVolume || 0;

                        return (
                            volumeB -
                            volumeA
                        );
                    }
                );

        const target =
            sortedTargets[0];



        // ==========================================
        // BASE DAMAGE
        // ==========================================

        const counterPercent =
            100;

        const baseDamage =
            attacker.totalDamage;

        const projectedDamage =

            baseDamage *

            (
                counterPercent /
                100
            );



        queue.push({

            attackerRuntimeUnitId:
                attacker.runtimeUnitId,

            targetRuntimeUnitId:
                target.runtimeUnitId,

            attacker,

            target,

            availableTargets:
                candidateTargets,

            counterPercent,

            baseDamage,

            projectedDamage,

            targetVolume:
                target.remainingVolume || 0
        });
    }



    // ==========================================
    // GLOBAL PRIORITY
    // ==========================================

    queue.sort(

        (a, b) => {

            if (
                b.counterPercent !==
                a.counterPercent
            ) {

                return (

                    b.counterPercent -

                    a.counterPercent
                );
            }

            if (
                b.baseDamage !==
                a.baseDamage
            ) {

                return (

                    b.baseDamage -

                    a.baseDamage
                );
            }

            if (
                b.targetVolume !==
                a.targetVolume
            ) {

                return (

                    b.targetVolume -

                    a.targetVolume
                );
            }

            return String(
                a.attackerRuntimeUnitId
            ).localeCompare(

                String(
                    b.attackerRuntimeUnitId
                )
            );
        }
    );



    // ==========================================
    // FINAL VALIDATION
    // ==========================================

    if (
        attackerUnits.length > 0 &&
        defenderUnits.length > 0 &&
        queue.length === 0
    ) {

        throw new Error(

            "[QUEUE-004] Queue generation failed"
        );
    }



    return queue;
}

export default
    buildAttackQueue;