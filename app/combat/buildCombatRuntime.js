// ==================================================
// app/combat/buildCombatRuntime.js
// ==================================================

import CombatRuntime
    from "./runtime/CombatRuntime.js";

function buildCombatRuntime({

    attackerFleet,

    defenderFleet

} = {}) {

    if (
        !attackerFleet
    ) {

        throw new Error(

            "[COMBAT-001] attackerFleet missing"

        );
    }

    if (
        !defenderFleet
    ) {

        throw new Error(

            "[COMBAT-002] defenderFleet missing"

        );
    }

    return new CombatRuntime({

        combatId:
            crypto.randomUUID(),

        attackerFleet,

        defenderFleet,

        currentRound:
            0,

        rounds:
            [],

        attackerDefeated:
            false,

        defenderDefeated:
            false,

        combatFinished:
            false,

        combatResult:
            null
    });
}

export default
    buildCombatRuntime;