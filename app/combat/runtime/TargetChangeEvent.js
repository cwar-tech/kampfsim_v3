// ==================================================
// app/combat/runtime/OverflowEvent.js
// ==================================================

class OverflowEvent {

    constructor({

        sourceRuntimeUnitId,

        previousTargetRuntimeUnitId,

        newTargetRuntimeUnitId,

        attackChainStep,

        oldBaseDamage,

        newBaseDamage,

        damageLossPercent = 5

    }) {

        this.sourceRuntimeUnitId =
            sourceRuntimeUnitId;

        this.previousTargetRuntimeUnitId =
            previousTargetRuntimeUnitId;

        this.newTargetRuntimeUnitId =
            newTargetRuntimeUnitId;



        // ==========================================
        // ATTACK CHAIN
        // ==========================================

        this.attackChainStep =
            attackChainStep;



        // ==========================================
        // DAMAGE REDUCTION
        // ==========================================

        this.oldBaseDamage =
            oldBaseDamage;

        this.newBaseDamage =
            newBaseDamage;

        this.damageLossPercent =
            damageLossPercent;
    }
}

export default
    OverflowEvent;