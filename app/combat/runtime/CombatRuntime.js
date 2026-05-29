class CombatRuntime {
    constructor({
        combatId,

        attackerFleet,
        defenderFleet,

        currentRound,

        rounds,

        attackerDefeated,
        defenderDefeated,

        combatFinished,

        combatResult
    }) {
        this.combatId = combatId;

        this.attackerFleet = attackerFleet;
        this.defenderFleet = defenderFleet;

        this.currentRound = currentRound;

        this.rounds = rounds;

        this.attackerDefeated = attackerDefeated;
        this.defenderDefeated = defenderDefeated;

        this.combatFinished = combatFinished;

        this.combatResult = combatResult;
    }
}

module.exports = CombatRuntime;