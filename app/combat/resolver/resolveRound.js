import selectTarget
    from "./selectTarget.js";

import applyDamage
    from "./applyDamage.js";

import resolveOverflow
    from "./resolveOverflow.js";

import calculateLosses
    from "./calculateLosses.js";

import calculateDamage
    from "./calculateDamage.js";

import recalculateRuntimeState
    from "../runtime/recalculateRuntimeState.js";

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

        if (
            !attacker ||
            typeof attacker !==
            "object"
        ) {
            continue;
        }

        // ==========================================
        // SINGLE SOURCE OF TRUTH
        // ==========================================

        if (
            attacker.remainingHp <= 0
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



        // ==========================================
        // DAMAGE CALCULATION
        // ==========================================

        const damageResult =
            calculateDamage({

                attacker,

                target
            });

        if (
            !damageResult
        ) {
            continue;
        }



        // ==========================================
        // DAMAGE APPLICATION
        // ==========================================

        const result =
            applyDamage(
                target,
                damageResult
                    .finalDamage
            );

        if (
            !result ||
            !result.target
        ) {
            continue;
        }

        // ==========================================
        // SINGLE SOURCE OF TRUTH
        // ==========================================

        target.remainingHp =
            result.target
                .remainingHp;

        // ==========================================
        // DERIVED STATE
        // ==========================================

        recalculateRuntimeState(
            target
        );

        target.receivedDamage =
            (
                target.receivedDamage ||
                0
            ) + result.appliedDamage;



        // ==========================================
        // DAMAGE EVENTS
        // ==========================================

        damageEvents.push({

            sourceRuntimeUnitId:
                attacker.runtimeUnitId,

            targetRuntimeUnitId:
                target.runtimeUnitId,

            appliedDamage:
                result.appliedDamage,

            baseDamage:
                damageResult.baseDamage,

            totalArmor:
                damageResult.totalArmor,

            overflowDamage:
                result.overflowDamage
        });



        // ==========================================
        // OVERFLOW
        // ==========================================

        if (
            result.overflowDamage > 0
        ) {

            const overflowResult =
                resolveOverflow(
                    defenderUnits,
                    result.overflowDamage
                );

            if (
                overflowResult
            ) {

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
    }



    // ==========================================
    // DEFENDER TURN
    // ==========================================

    for (
        const defender
        of defenderUnits
    ) {

        if (
            !defender ||
            typeof defender !==
            "object"
        ) {
            continue;
        }

        // ==========================================
        // SINGLE SOURCE OF TRUTH
        // ==========================================

        if (
            defender.remainingHp <= 0
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



        // ==========================================
        // DAMAGE CALCULATION
        // ==========================================

        const damageResult =
            calculateDamage({

                attacker:
                    defender,

                target
            });

        if (
            !damageResult
        ) {
            continue;
        }



        // ==========================================
        // DAMAGE APPLICATION
        // ==========================================

        const result =
            applyDamage(
                target,
                damageResult
                    .finalDamage
            );

        if (
            !result ||
            !result.target
        ) {
            continue;
        }

        // ==========================================
        // SINGLE SOURCE OF TRUTH
        // ==========================================

        target.remainingHp =
            result.target
                .remainingHp;

        // ==========================================
        // DERIVED STATE
        // ==========================================

        recalculateRuntimeState(
            target
        );

        target.receivedDamage =
            (
                target.receivedDamage ||
                0
            ) + result.appliedDamage;



        // ==========================================
        // DAMAGE EVENTS
        // ==========================================

        damageEvents.push({

            sourceRuntimeUnitId:
                defender.runtimeUnitId,

            targetRuntimeUnitId:
                target.runtimeUnitId,

            appliedDamage:
                result.appliedDamage,

            baseDamage:
                damageResult.baseDamage,

            totalArmor:
                damageResult.totalArmor,

            overflowDamage:
                result.overflowDamage
        });



        // ==========================================
        // OVERFLOW
        // ==========================================

        if (
            result.overflowDamage > 0
        ) {

            const overflowResult =
                resolveOverflow(
                    attackerUnits,
                    result.overflowDamage
                );

            if (
                overflowResult
            ) {

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
    }



    // ==========================================
    // LOSS CALCULATION
    // ==========================================

    calculateLosses(
        runtime,
        roundRuntime
    );



    // ==========================================
    // FINAL STATE RECALCULATION
    // ==========================================

    for (
        const unit
        of attackerUnits
    ) {

        if (
            !unit
        ) {
            continue;
        }

        recalculateRuntimeState(
            unit
        );
    }

    for (
        const unit
        of defenderUnits
    ) {

        if (
            !unit
        ) {
            continue;
        }

        recalculateRuntimeState(
            unit
        );
    }



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