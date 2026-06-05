import fs from "fs";

import {
    buildFleetRuntime
} from "../combat/buildFleetRuntime.js";

import buildCombatRuntime
    from "../combat/buildCombatRuntime.js";

import CombatResolver
    from "../combat/resolver/CombatResolver.js";

function executeScenario(
    scenario
) {

    const shipsData =
        JSON.parse(

            fs.readFileSync(
                "./app/ships.json",
                "utf8"
            )
        );

    const attackerFleet =
        buildFleetRuntime(
            scenario.attacker,
            shipsData
        );

    const defenderFleet =
        buildFleetRuntime(
            scenario.defender,
            shipsData
        );

    const combatRuntime =
        buildCombatRuntime({

            attackerFleet,

            defenderFleet
        });

    const resolver =
        new CombatResolver();

    return resolver.resolveCombat(
        combatRuntime
    );
}

export default
    executeScenario;