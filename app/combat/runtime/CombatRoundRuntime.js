class CombatRoundRuntime {
    constructor({
        roundNumber,

        damageEvents,

        overflowEvents,

        attackerDamageDealt,
        defenderDamageDealt,

        attackerDamageReceived,
        defenderDamageReceived,

        attackerDestroyedUnits,
        defenderDestroyedUnits
    }) {
        this.roundNumber = roundNumber;

        this.damageEvents = damageEvents;

        this.overflowEvents = overflowEvents;

        this.attackerDamageDealt = attackerDamageDealt;
        this.defenderDamageDealt = defenderDamageDealt;

        this.attackerDamageReceived = attackerDamageReceived;
        this.defenderDamageReceived = defenderDamageReceived;

        this.attackerDestroyedUnits = attackerDestroyedUnits;
        this.defenderDestroyedUnits = defenderDestroyedUnits;
    }
}

module.exports = CombatRoundRuntime;