// ==================================================
// app/combat/resolver/resolveRound.js
// ==================================================

import ResolverMetrics
    from "./dto/ResolverMetrics.js";

import buildAttackQueue
    from "./buildAttackQueue.js";

import resolveAttackChain
    from "./resolveAttackChain.js";

import calculateLosses
    from "./calculateLosses.js";

import recalculateRuntimeState
    from "../runtime/recalculateRuntimeState.js";

import CombatRoundRuntime
    from "../runtime/CombatRoundRuntime.js";

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

    const roundRuntime =
        new CombatRoundRuntime({

            roundNumber:
                combatRuntime.currentRound + 1,

            damageEvents: [],

            overflowEvents: [],

            attackerDamageDealt: 0,

            defenderDamageDealt: 0,

            attackerDamageReceived: 0,

            defenderDamageReceived: 0,

            attackerDestroyedUnits: [],

            defenderDestroyedUnits: [],

            milestones: []
        });

    const attackerUnits =
        runtime
            ?.attackerFleet
            ?.units || [];

    const defenderUnits =
        runtime
            ?.defenderFleet
            ?.units || [];



    // ==========================================
    // RESET ROUND DAMAGE
    // ==========================================

    for (
        const unit
        of [
            ...attackerUnits,
            ...defenderUnits
        ]
    ) {

        if (
            !unit ||
            typeof unit !==
            "object"
        ) {
            continue;
        }

        unit.receivedDamage = 0;
    }



    // ==========================================
    // BUILD ATTACK QUEUES
    // ==========================================

    const attackerQueue =
        buildAttackQueue(

            runtime.attackerFleet,

            runtime.defenderFleet
        );

    const defenderQueue =
        buildAttackQueue(

            runtime.defenderFleet,

            runtime.attackerFleet
        );



    // ==========================================
    // GLOBAL ATTACK QUEUE
    // ==========================================

    const attackQueue = [

        ...attackerQueue,

        ...defenderQueue
    ];

    if (
        attackQueue.length === 0
    ) {

        throw new Error(

            "[ROUND-001] Attack queue is empty"
        );
    }



    // ==========================================
    // EXECUTE ATTACKS
    // ==========================================

    for (
        const attack
        of attackQueue
    ) {

        if (
            !attack
        ) {

            throw new Error(

                "[ROUND-002] Attack entry missing"
            );
        }

        if (
            !attack.attacker
        ) {

            throw new Error(

                "[ROUND-003] Attacker missing"
            );
        }

        if (
            !attack.target
        ) {

            throw new Error(

                "[ROUND-004] Target missing"
            );
        }

        resolveAttackChain({

            attacker:
                attack.attacker,

            initialTarget:
                attack.target,

            availableTargets:
                attack.availableTargets,

            damageEvents,

            overflowEvents
        });
    }



    // ==========================================
    // APPLY ROUND DAMAGE EVENTS
    // ==========================================

    const allUnits = [

        ...attackerUnits,
        ...defenderUnits
    ];

    for (
        const event
        of damageEvents
    ) {

        if (
            !event ||
            typeof event !==
            "object"
        ) {

            throw new Error(

                "[ROUND-005] Invalid damage event"
            );
        }

        const target =

            allUnits.find(

                unit =>

                    unit.runtimeUnitId ===
                    event.targetRuntimeUnitId
            );

        if (
            !target
        ) {

            throw new Error(

                `[ROUND-006] Target not found: ${event.targetRuntimeUnitId}`
            );
        }

        if (
            typeof event.finalDamage !==
            "number"
        ) {

            throw new Error(

                `[ROUND-007] Invalid finalDamage for target ${target.unitTypeId}`
            );
        }

        if (
            typeof target.remainingHp !==
            "number"
        ) {

            throw new Error(

                `[ROUND-008] Invalid remainingHp for ${target.unitTypeId}`
            );
        }

        // ==========================================
        // EVENT VALIDATION
        // ==========================================

        if (
            typeof event.appliedDamage !==
            "number"
        ) {

            throw new Error(

                `[ROUND-009] Missing appliedDamage for ${event.targetRuntimeUnitId}`
            );
        }

        if (
            typeof event.targetRemainingHp !==
            "number"
        ) {

            throw new Error(

                `[ROUND-010] Missing targetRemainingHp for ${event.targetRuntimeUnitId}`
            );
        }

        // ==========================================
        // APPLY EVENT RESULT
        // ==========================================

        target.remainingHp =
            event.targetRemainingHp;

        target.receivedDamage =

            (
                target.receivedDamage || 0
            )

            +

            event.appliedDamage;
    }



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



    // ==========================================
    // LOSS CALCULATION
    // ==========================================

    calculateLosses(

        runtime,

        roundRuntime
    );

    const resolverMetrics =

        new ResolverMetrics({

            attackerQueueSize:
                attackerQueue.length,

            defenderQueueSize:
                defenderQueue.length,

            attackQueueSize:
                attackQueue.length,

            executedAttacks:
                damageEvents.length,

            attackerDestroyed:
                roundRuntime
                    .attackerDestroyedUnits
                    .length,

            defenderDestroyed:
                roundRuntime
                    .defenderDestroyedUnits
                    .length
        });



    // ==========================================
    // RETURN
    // ==========================================

    return {

        combatRuntime:
            runtime,

        roundRuntime,

        damageEvents,

        overflowEvents,

        resolverMetrics
    };
}

export default
    resolveRound;