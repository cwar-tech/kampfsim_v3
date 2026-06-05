// ==================================================
// app/combat/runtime/CombatRuntime.js
// ==================================================

class CombatRuntime {

    constructor({

        combatId,

        attackerFleet,
        defenderFleet,

        currentRound = 0,

        rounds = [],

        attackerDefeated = false,
        defenderDefeated = false,

        combatFinished = false,

        combatResult = null

    } = {}) {

        this.combatId =
            combatId;

        this.attackerFleet =
            attackerFleet;

        this.defenderFleet =
            defenderFleet;

        this.currentRound =
            currentRound;

        this.rounds =
            rounds;

        this.attackerDefeated =
            attackerDefeated;

        this.defenderDefeated =
            defenderDefeated;

        this.combatFinished =
            combatFinished;

        this.combatResult =
            combatResult;
    }
}

export default
    CombatRuntime;