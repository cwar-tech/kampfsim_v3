import selectTarget
    from "./selectTarget.js";

import applyDamage
    from "./applyDamage.js";

import resolveOverflow
    from "./resolveOverflow.js";

import calculateLosses
    from "./calculateLosses.js";

function resolveRound(
    combatRuntime
) {

    if (
        !combatRuntime ||
        typeof combatRuntime !==
        "object"
    ) {
        return null;
    }

    const runtime =
        JSON.parse(
            JSON.stringify(
                combatRuntime
            )
        );

    const damageEvents = [];

    const overflowEvents = [];

    const roundRuntime = {

        attackerDestroyedUnits:
            [],

        defenderDestroyedUnits:
            []
    };

    const attackerUnits =
        runtime
            ?.attackerFleet
            ?.units || [];

    const defenderUnits =
        runtime
            ?.defenderFleet
            ?.units || [];

    // ==========================================
    // ATTACKER TURN
    // ==========================================

    for (
        const attacker
        of attackerUnits
    ) {

        if (!attacker) {
            continue;
        }

        if (
            attacker.remainingUnits <= 0
        ) {
            continue;
        }

        const target =
            selectTarget(
                attacker,
                defenderUnits
            );

        if (
            !target
        ) {
            continue;
        }

        const result =
            applyDamage(
                target,
                attacker.damage
            );

        if (
            !result
        ) {
            continue;
        }

        target.remainingUnits =
            result.target
                .remainingUnits;

        target.hpLastUnit =
            result.target
                .hpLastUnit;

        target.receivedDamage =
            (
                target.receivedDamage ||
                0
            ) + attacker.damage;

        damageEvents.push({

            sourceRuntimeUnitId:
                attacker.runtimeUnitId,

            targetRuntimeUnitId:
                target.runtimeUnitId,

            appliedDamage:
                attacker.damage,

            overflowDamage:
                result.overflowDamage
        });

        if (
            result.overflowDamage > 0
        ) {

            const overflowResult =
                resolveOverflow(
                    defenderUnits,
                    result.overflowDamage
                );

            overflowEvents.push({

                sourceRuntimeUnitId:
                    attacker.runtimeUnitId,

                targetRuntimeUnitId:
                    target.runtimeUnitId,

                overflowDamage:
                    result.overflowDamage
            });

            for (
                let i = 0;
                i < defenderUnits.length;
                i++
            ) {

                defenderUnits[i] =
                    overflowResult
                        .targets[i];
            }
        }
    }

    // ==========================================
    // DEFENDER TURN
    // ==========================================

    for (
        const defender
        of defenderUnits
    ) {

        if (!defender) {
            continue;
        }

        if (
            defender.remainingUnits <= 0
        ) {
            continue;
        }

        const target =
            selectTarget(
                defender,
                attackerUnits
            );

        if (
            !target
        ) {
            continue;
        }

        const result =
            applyDamage(
                target,
                defender.damage
            );

        if (
            !result
        ) {
            continue;
        }

        target.remainingUnits =
            result.target
                .remainingUnits;

        target.hpLastUnit =
            result.target
                .hpLastUnit;

        target.receivedDamage =
            (
                target.receivedDamage ||
                0
            ) + defender.damage;

        damageEvents.push({

            sourceRuntimeUnitId:
                defender.runtimeUnitId,

            targetRuntimeUnitId:
                target.runtimeUnitId,

            appliedDamage:
                defender.damage,

            overflowDamage:
                result.overflowDamage
        });

        if (
            result.overflowDamage > 0
        ) {

            const overflowResult =
                resolveOverflow(
                    attackerUnits,
                    result.overflowDamage
                );

            overflowEvents.push({

                sourceRuntimeUnitId:
                    defender.runtimeUnitId,

                targetRuntimeUnitId:
                    target.runtimeUnitId,

                overflowDamage:
                    result.overflowDamage
            });

            for (
                let i = 0;
                i < attackerUnits.length;
                i++
            ) {

                attackerUnits[i] =
                    overflowResult
                        .targets[i];
            }
        }
    }

    calculateLosses(
        runtime,
        roundRuntime
    );

    return {

        combatRuntime:
            runtime,

        roundRuntime,

        damageEvents,

        overflowEvents
    };
}

export default
    resolveRound;