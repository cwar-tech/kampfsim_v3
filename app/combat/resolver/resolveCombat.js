import resolveRound
    from "./resolveRound.js";

function resolveCombat(
    combatRuntime
) {

    if (
        !combatRuntime ||
        typeof combatRuntime !==
        "object"
    ) {
        return null;
    }

    const runtime =
        JSON.parse(
            JSON.stringify(
                combatRuntime
            )
        );

    runtime.rounds =
        Array.isArray(
            runtime.rounds
        )
            ? runtime.rounds
            : [];

    runtime.currentRound =
        typeof runtime.currentRound ===
            "number"
            ? runtime.currentRound
            : 1;

    runtime.maxRounds =
        typeof runtime.maxRounds ===
            "number"
            ? runtime.maxRounds
            : 10;

    runtime.combatFinished =
        false;

    runtime.attackerDefeated =
        false;

    runtime.defenderDefeated =
        false;

    let latestDamageEvents =
        [];



    // ==========================================
    // MAIN COMBAT LOOP
    // ==========================================

    while (

        !runtime.combatFinished &&

        runtime.currentRound <=
        runtime.maxRounds
    ) {

        const roundResult =
            resolveRound(
                runtime
            );

        if (
            !roundResult
        ) {
            break;
        }

        runtime.rounds.push({

            round:
                runtime.currentRound,

            roundRuntime:
                roundResult.roundRuntime,

            damageEvents:
                roundResult.damageEvents,

            overflowEvents:
                roundResult.overflowEvents
        });

        runtime.attackerFleet =
            roundResult
                .combatRuntime
                .attackerFleet;

        runtime.defenderFleet =
            roundResult
                .combatRuntime
                .defenderFleet;

        latestDamageEvents =
            roundResult.damageEvents;



        // ==========================================
        // WIN CONDITIONS
        // ==========================================

        const attackerAlive =
            (
                runtime
                    ?.attackerFleet
                    ?.units || []
            ).some(
                (unit) =>

                    unit &&

                    typeof unit.remainingHp ===
                    "number" &&

                    unit.remainingHp > 0
            );

        const defenderAlive =
            (
                runtime
                    ?.defenderFleet
                    ?.units || []
            ).some(
                (unit) =>

                    unit &&

                    typeof unit.remainingHp ===
                    "number" &&

                    unit.remainingHp > 0
            );



        // ==========================================
        // COMBAT RESULT STATES
        // ==========================================

        if (
            !attackerAlive &&
            !defenderAlive
        ) {

            runtime.attackerDefeated =
                true;

            runtime.defenderDefeated =
                true;

            runtime.combatFinished =
                true;
        }
        else if (
            !attackerAlive
        ) {

            runtime.attackerDefeated =
                true;

            runtime.combatFinished =
                true;
        }
        else if (
            !defenderAlive
        ) {

            runtime.defenderDefeated =
                true;

            runtime.combatFinished =
                true;
        }



        // ==========================================
        // MAX ROUND LIMIT
        // ==========================================

        if (
            runtime.currentRound >=
            runtime.maxRounds
        ) {

            runtime.combatFinished =
                true;
        }



        // ==========================================
        // NEXT ROUND
        // ==========================================

        if (
            !runtime.combatFinished
        ) {

            runtime.currentRound += 1;
        }
    }

    return {

        ...runtime,

        damageEvents:
            latestDamageEvents
    };
}

export default
    resolveCombat;