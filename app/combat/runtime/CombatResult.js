class CombatResult {
    constructor({
        combatId,

        winnerSide,

        totalRounds,

        attackerFleetDestroyed,
        defenderFleetDestroyed,

        attackerRemainingUnits,
        defenderRemainingUnits,

        attackerLostUnits,
        defenderLostUnits,

        rounds
    }) {
        this.combatId = combatId;

        this.winnerSide = winnerSide;

        this.totalRounds = totalRounds;

        this.attackerFleetDestroyed = attackerFleetDestroyed;
        this.defenderFleetDestroyed = defenderFleetDestroyed;

        this.attackerRemainingUnits = attackerRemainingUnits;
        this.defenderRemainingUnits = defenderRemainingUnits;

        this.attackerLostUnits = attackerLostUnits;
        this.defenderLostUnits = defenderLostUnits;

        this.rounds = rounds;
    }
}

module.exports = CombatResult;