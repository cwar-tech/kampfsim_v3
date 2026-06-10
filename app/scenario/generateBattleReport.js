// ==================================================
// app\app\scenario\generateBattleReport.js
// ==================================================
function generateBattleReport({
    scenario,
    result
}) {

    return {

        scenarioId:
            scenario.scenarioId,

        description:
            scenario.description,

        combatFinished:
            result.combatFinished,

        rounds:
            result.rounds?.length || 0,

        attackerDefeated:
            result.attackerDefeated,

        defenderDefeated:
            result.defenderDefeated,

        attackerRemainingUnits:

            result
                ?.attackerFleet
                ?.totalUnits || 0,

        defenderRemainingUnits:

            result
                ?.defenderFleet
                ?.totalUnits || 0,

        damageEvents:

            result.rounds
                ?.reduce(

                    (
                        total,
                        round
                    ) =>

                        total +

                        (
                            round.damageEvents
                                ?.length || 0
                        ),

                    0
                ) || 0,

        overflowEvents:

            result.rounds
                ?.reduce(

                    (
                        total,
                        round
                    ) =>

                        total +

                        (
                            round.overflowEvents
                                ?.length || 0
                        ),

                    0
                ) || 0
    };
}

export default
    generateBattleReport;