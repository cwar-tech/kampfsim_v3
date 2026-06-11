class ResolverData {

    constructor({

        combatRounds,

        damageEvents,

        overflowEvents,

        attackerDestroyed,

        defenderDestroyed,

        combatFinished,

        combatResult

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
    }
}

export default
    ResolverData;
