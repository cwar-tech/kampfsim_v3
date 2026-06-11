// ==================================================
// combat/dto/ResolverMetrics.js
// ==================================================

class ResolverMetrics {

    constructor({

        attackerQueueSize,

        defenderQueueSize,

        attackQueueSize,

        executedAttacks,

        attackerDestroyed,

        defenderDestroyed

    } = {}) {

        this.attackerQueueSize =
            attackerQueueSize;

        this.defenderQueueSize =
            defenderQueueSize;

        this.attackQueueSize =
            attackQueueSize;

        this.executedAttacks =
            executedAttacks;

        this.attackerDestroyed =
            attackerDestroyed;

        this.defenderDestroyed =
            defenderDestroyed;
    }
}

export default
    ResolverMetrics;
