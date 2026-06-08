// ==================================================
// app/combat/runtime/CombatRoundRuntime.js
// ==================================================
class CombatRoundRuntime {

    constructor({

        roundNumber = 1,

        damageEvents = [],

        overflowEvents = [],

        milestones = [],

        attackerDamageDealt = 0,
        defenderDamageDealt = 0,

        attackerDamageReceived = 0,
        defenderDamageReceived = 0,

        attackerDestroyedUnits = [],
        defenderDestroyedUnits = []

    } = {}) {

        // ==========================================
        // ROUND
        // ==========================================

        this.roundNumber =
            typeof roundNumber ===
                "number"
                ? roundNumber
                : 1;



        // ==========================================
        // EVENTS
        // ==========================================

        this.damageEvents =
            Array.isArray(
                damageEvents
            )
                ? damageEvents
                : [];

        this.overflowEvents =
            Array.isArray(
                overflowEvents
            )
                ? overflowEvents
                : [];

        this.milestones =
            Array.isArray(
                milestones
            )
                ? milestones
                : [];



        // ==========================================
        // DAMAGE STATS
        // ==========================================

        this.attackerDamageDealt =
            typeof attackerDamageDealt ===
                "number"
                ? attackerDamageDealt
                : 0;

        this.defenderDamageDealt =
            typeof defenderDamageDealt ===
                "number"
                ? defenderDamageDealt
                : 0;

        this.attackerDamageReceived =
            typeof attackerDamageReceived ===
                "number"
                ? attackerDamageReceived
                : 0;

        this.defenderDamageReceived =
            typeof defenderDamageReceived ===
                "number"
                ? defenderDamageReceived
                : 0;



        // ==========================================
        // LOSSES
        // ==========================================

        this.attackerDestroyedUnits =
            Array.isArray(
                attackerDestroyedUnits
            )
                ? attackerDestroyedUnits
                : [];

        this.defenderDestroyedUnits =
            Array.isArray(
                defenderDestroyedUnits
            )
                ? defenderDestroyedUnits
                : [];
    }
}

export default
    CombatRoundRuntime;