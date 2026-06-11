class ResolverData {

class ResolverData {

    constructor({

        combatRounds,

        damageEvents,

        overflowEvents,

        attackerDestroyed,

        defenderDestroyed,

        combatFinished,

        combatResult,

        attackQueueSize

    } = {}) {

        this.combatRounds =
            combatRounds;

        this.damageEvents =
            damageEvents;

        this.overflowEvents =
            overflowEvents;

        this.attackerDestroyed =
            attackerDestroyed;

        this.defenderDestroyed =
            defenderDestroyed;

        this.combatFinished =
            combatFinished;

        this.combatResult =
            combatResult;

        this.attackQueueSize =
            attackQueueSize;
    }
}

export default
    ResolverData;
