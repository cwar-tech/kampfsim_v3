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
        // PRE COMBAT VALIDATION
        // ==========================================

        const attackerAlive =
            (
                combatRuntime
                    ?.attackerFleet
                    ?.units || []
            ).some(

                unit =>

                    unit &&
                    unit.remainingHp > 0
            );

        const defenderAlive =
            (
                combatRuntime
                    ?.defenderFleet
                    ?.units || []
            ).some(

                unit =>

                    unit &&
                    unit.remainingHp > 0
            );

        if (
            !attackerAlive &&
            !defenderAlive
        ) {

            combatRuntime.attackerDefeated =
                true;

            combatRuntime.defenderDefeated =
                true;

            combatRuntime.combatFinished =
                true;

            combatRuntime.combatResult =
                "draw";

            return combatRuntime;
        }

        if (
            !attackerAlive
        ) {

            combatRuntime.attackerDefeated =
                true;

            combatRuntime.combatFinished =
                true;

            combatRuntime.combatResult =
                "defenderVictory";

            return combatRuntime;
        }

        if (
            !defenderAlive
        ) {

            combatRuntime.defenderDefeated =
                true;

            combatRuntime.combatFinished =
                true;

            combatRuntime.combatResult =
                "attackerVictory";

            return combatRuntime;
        }



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
            // DAMAGE STATS
            // ==========================================

            const attackerRuntimeIds =
                (
                    combatRuntime
                        ?.attackerFleet
                        ?.units || []
                ).map(

                    unit =>
                        unit.runtimeUnitId
                );

            for (
                const event
                of result.damageEvents
            ) {

                if (
                    !event ||
                    typeof event !==
                    "object"
                ) {

                    throw new Error(

                        "[COMBAT-001] Invalid damage event"

                    );
                }

                if (
                    !event.sourceRuntimeUnitId
                ) {

                    throw new Error(

                        "[COMBAT-002] sourceRuntimeUnitId missing"

                    );
                }

                if (
                    typeof event.appliedDamage !==
                    "number"
                ) {

                    throw new Error(

                        `[COMBAT-003] appliedDamage invalid for ${event.sourceRuntimeUnitId}`

                    );
                }

                if (
                    event.appliedDamage < 0
                ) {

                    throw new Error(

                        `[COMBAT-004] appliedDamage below zero for ${event.sourceRuntimeUnitId}`

                    );
                }

                const isAttackerSource =
                    attackerRuntimeIds.includes(

                        event.sourceRuntimeUnitId
                    );

                if (
                    isAttackerSource
                ) {

                    roundRuntime.attackerDamageDealt +=
                        event.appliedDamage;

                    roundRuntime.defenderDamageReceived +=
                        event.appliedDamage;
                }
                else {

                    roundRuntime.defenderDamageDealt +=
                        event.appliedDamage;

                    roundRuntime.attackerDamageReceived +=
                        event.appliedDamage;
                }
            }



            // ==========================================
            // VALIDATE STATS
            // ==========================================

            const stats = [

                roundRuntime.attackerDamageDealt,
                roundRuntime.defenderDamageDealt,
                roundRuntime.attackerDamageReceived,
                roundRuntime.defenderDamageReceived

            ];

            for (
                const value
                of stats
            ) {

                if (
                    !Number.isFinite(
                        value
                    )
                ) {

                    throw new Error(

                        "[COMBAT-005] Invalid combat statistic"

                    );
                }

                if (
                    value < 0
                ) {

                    throw new Error(

                        "[COMBAT-006] Negative combat statistic"

                    );
                }
            }



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

            const attackerAliveAfterRound =
                (
                    combatRuntime
                        ?.attackerFleet
                        ?.units || []
                ).some(

                    unit =>

                        unit &&
                        unit.remainingHp > 0
                );

            const defenderAliveAfterRound =
                (
                    combatRuntime
                        ?.defenderFleet
                        ?.units || []
                ).some(

                    unit =>

                        unit &&
                        unit.remainingHp > 0
                );



            // ==========================================
            // COMBAT STATE
            // ==========================================

            combatRuntime.attackerDefeated =
                !attackerAliveAfterRound;

            combatRuntime.defenderDefeated =
                !defenderAliveAfterRound;



            // ==========================================
            // END CONDITIONS
            // ==========================================

            if (
                !attackerAliveAfterRound ||
                !defenderAliveAfterRound
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



        // ==========================================
        // COMBAT RESULT
        // ==========================================

        if (
            combatRuntime.attackerDefeated &&
            combatRuntime.defenderDefeated
        ) {

            combatRuntime.combatResult =
                "draw";
        }
        else if (
            combatRuntime.defenderDefeated
        ) {

            combatRuntime.combatResult =
                "attackerVictory";
        }
        else if (
            combatRuntime.attackerDefeated
        ) {

            combatRuntime.combatResult =
                "defenderVictory";
        }
        else {

            combatRuntime.combatResult =
                "timeout";
        }

        return combatRuntime;
    }
}

export default
    CombatResolver;