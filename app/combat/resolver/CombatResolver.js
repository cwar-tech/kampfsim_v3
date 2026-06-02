import CombatRoundRuntime
    from "../runtime/CombatRoundRuntime.js";

import resolveRound
    from "./resolveRound.js";

class CombatResolver {

    constructor({

        maxRounds = 250

    } = {}) {

        this.maxRounds =
            maxRounds;
    }



    // ==========================================
    // MAIN COMBAT LOOP
    // ==========================================

    resolveCombat(
        combatRuntime
    ) {

        if (
            !combatRuntime ||
            typeof combatRuntime !==
            "object"
        ) {
            return null;
        }

        combatRuntime.rounds =
            Array.isArray(
                combatRuntime.rounds
            )
                ? combatRuntime.rounds
                : [];

        combatRuntime.currentRound =
            typeof combatRuntime.currentRound ===
                "number"
                ? combatRuntime.currentRound
                : 0;

        combatRuntime.combatFinished =
            Boolean(
                combatRuntime
                    .combatFinished
            );

        combatRuntime.attackerDefeated =
            Boolean(
                combatRuntime
                    .attackerDefeated
            );

        combatRuntime.defenderDefeated =
            Boolean(
                combatRuntime
                    .defenderDefeated
            );



        // ==========================================
        // COMBAT LOOP
        // ==========================================

        while (

            !combatRuntime
                .combatFinished &&

            combatRuntime.currentRound <
            this.maxRounds
        ) {

            // ==========================================
            // ROUND RUNTIME
            // ==========================================

            const roundRuntime =
                new CombatRoundRuntime({

                    roundNumber:
                        combatRuntime
                            .currentRound + 1,

                    damageEvents:
                        [],

                    overflowEvents:
                        [],

                    attackerDamageDealt:
                        0,

                    defenderDamageDealt:
                        0,

                    attackerDamageReceived:
                        0,

                    defenderDamageReceived:
                        0,

                    attackerDestroyedUnits:
                        [],

                    defenderDestroyedUnits:
                        []
                });



            // ==========================================
            // RESOLVE ROUND
            // ==========================================

            const result =
                resolveRound(
                    combatRuntime
                );

            if (
                !result
            ) {
                break;
            }



            // ==========================================
            // APPLY ROUND RESULT
            // ==========================================

            combatRuntime =
                result
                    .combatRuntime;

            roundRuntime.damageEvents =
                result.damageEvents;

            roundRuntime.overflowEvents =
                result.overflowEvents;

            roundRuntime.attackerDestroyedUnits =
                result
                    .roundRuntime
                    .attackerDestroyedUnits;

            roundRuntime.defenderDestroyedUnits =
                result
                    .roundRuntime
                    .defenderDestroyedUnits;



            // ==========================================
            // STORE ROUND
            // ==========================================

            combatRuntime.rounds
                .push(
                    roundRuntime
                );



            // ==========================================
            // SINGLE SOURCE OF TRUTH
            // ==========================================

            const attackerAlive =
                (
                    combatRuntime
                        ?.attackerFleet
                        ?.units || []
                ).some(

                    (unit) =>

                        unit &&
                        unit.remainingHp > 0
                );

            const defenderAlive =
                (
                    combatRuntime
                        ?.defenderFleet
                        ?.units || []
                ).some(

                    (unit) =>

                        unit &&
                        unit.remainingHp > 0
                );



            // ==========================================
            // COMBAT STATE
            // ==========================================

            combatRuntime.attackerDefeated =
                !attackerAlive;

            combatRuntime.defenderDefeated =
                !defenderAlive;



            // ==========================================
            // END CONDITIONS
            // ==========================================

            if (
                !attackerAlive ||
                !defenderAlive
            ) {

                combatRuntime
                    .combatFinished =
                    true;
            }



            // ==========================================
            // NEXT ROUND
            // ==========================================

            combatRuntime.currentRound += 1;
        }



        // ==========================================
        // MAX ROUND SAFETY
        // ==========================================

        if (
            combatRuntime.currentRound >=
            this.maxRounds
        ) {

            combatRuntime.combatFinished =
                true;
        }

        return combatRuntime;
    }
}

export default
    CombatResolver;