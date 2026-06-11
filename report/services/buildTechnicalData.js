// ==================================================
// report/services/buildTechnicalData.js
// ==================================================

import TechnicalData
    from "../dto/TechnicalData.js";

import DamageEventData
    from "../dto/DamageEventData.js";

import OverflowEventData
    from "../dto/OverflowEventData.js";

import ResolverData
    from "../dto/ResolverData.js";

function buildTechnicalData(
    combatResult
) {

    const damageEvents =
        [];

    const overflowEvents =
        [];

    for (
        const round
        of combatResult.rounds
    ) {

        for (
            const event
            of round.damageEvents
        ) {

            damageEvents.push(

                new DamageEventData(
                    event
                )
            );
        }

        for (
            const event
            of round.overflowEvents
        ) {

            overflowEvents.push(

                new OverflowEventData(
                    event
                )
            );
        }
    }

    return new TechnicalData({

        damageEvents,

        overflowEvents,

        resolverData:

            new ResolverData({

                combatRounds:
                    combatResult.currentRound
            }),

        exports: []
    });
}

export default
    buildTechnicalData;