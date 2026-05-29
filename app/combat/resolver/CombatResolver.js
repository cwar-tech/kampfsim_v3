const CombatRoundRuntime = require("../runtime/CombatRoundRuntime");

const resolveRound = require("./resolveRound");

class CombatResolver {
    constructor({
        maxRounds = 250
    } = {}) {
        this.maxRounds = maxRounds;
    }

    resolveCombat(combatRuntime) {
        while (
            !combatRuntime.combatFinished &&
            combatRuntime.currentRound < this.maxRounds
        ) {
            const roundRuntime = new CombatRoundRuntime({
                roundNumber: combatRuntime.currentRound + 1,

                damageEvents: [],
                overflowEvents: [],

                attackerDamageDealt: 0,
                defenderDamageDealt: 0,

                attackerDamageReceived: 0,
                defenderDamageReceived: 0,

                attackerDestroyedUnits: [],
                defenderDestroyedUnits: []
            });

            resolveRound({
                combatRuntime,
                roundRuntime
            });

            combatRuntime.rounds.push(roundRuntime);

            combatRuntime.currentRound += 1;

            const attackerAlive =
                combatRuntime.attackerFleet.units.some(
                    (unit) => unit.remainingUnits > 0
                );

            const defenderAlive =
                combatRuntime.defenderFleet.units.some(
                    (unit) => unit.remainingUnits > 0
                );

            combatRuntime.attackerDefeated = !attackerAlive;
            combatRuntime.defenderDefeated = !defenderAlive;

            if (!attackerAlive || !defenderAlive) {
                combatRuntime.combatFinished = true;
            }
        }

        return combatRuntime;
    }
}

module.exports = CombatResolver;