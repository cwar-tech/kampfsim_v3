// ==================================================
// app/combat/runtime/DamageEvent.js
// ==================================================

class DamageEvent {

    constructor({

        eventId,

        roundNumber,

        sourceRuntimeUnitId,
        targetRuntimeUnitId,

        sourceUnitTypeId,
        targetUnitTypeId,

        baseDamage,

        counterPercent = 100,

        finalDamage,

        appliedDamage,

        targetDestroyed = false,

        attackChainStep = 0

    }) {

        // ==========================================
        // EVENT
        // ==========================================

        this.eventId =
            eventId;

        this.roundNumber =
            roundNumber;



        // ==========================================
        // SOURCE
        // ==========================================

        this.sourceRuntimeUnitId =
            sourceRuntimeUnitId;

        this.targetRuntimeUnitId =
            targetRuntimeUnitId;

        this.sourceUnitTypeId =
            sourceUnitTypeId;

        this.targetUnitTypeId =
            targetUnitTypeId;



        // ==========================================
        // DAMAGE
        // ==========================================

        this.baseDamage =
            baseDamage;

        this.counterPercent =
            counterPercent;

        this.finalDamage =
            finalDamage;

        this.appliedDamage =
            appliedDamage;



        // ==========================================
        // ATTACK CHAIN
        // ==========================================

        this.attackChainStep =
            attackChainStep;

        this.targetDestroyed =
            Boolean(
                targetDestroyed
            );
    }
}

export default
    DamageEvent;