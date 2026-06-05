// ==================================================
// engine.js
// ==================================================


// ==================================================
// BUILD VERSION
// ==================================================

const BUILD_VERSION =
  "2026-06-05 Runtime Migration #001";


// ==================================================
// IMPORTS
// ==================================================

import { buildFleetRuntime }
  from "./app/combat/buildFleetRuntime.js";

import buildCombatRuntime
  from "./app/combat/buildCombatRuntime.js";

import CombatResolver
  from "./app/combat/resolver/CombatResolver.js";


// ==================================================
// DEBUG OUTPUT
// ==================================================

function addDebugOutput(
  title,
  data
) {

  const debugContainer =
    document.getElementById("debug");

  debugContainer.innerHTML += `

    <h2>${title}</h2>

    <pre>
${JSON.stringify(data, null, 2)}
    </pre>

  `;
}


// ==================================================
// START COMBAT ENGINE
// ==================================================

async function startCombat() {

  // ==================================================
  // BUILD VERSION OUTPUT
  // ==================================================

  console.log(
    "BUILD VERSION:",
    BUILD_VERSION
  );

  addDebugOutput(
    "BUILD VERSION",
    {
      version:
        BUILD_VERSION
    }
  );


  // ==================================================
  // COMBAT INITIALIZATION
  // ==================================================

  console.log("================================");
  console.log("COMBAT INITIALIZATION");
  console.log("================================");

  addDebugOutput(
    "COMBAT INITIALIZATION",
    {
      status:
        "started"
    }
  );


  // ==================================================
  // LOAD SHIPS DATA
  // ==================================================

  const shipsResponse =
    await fetch(
      "./app/ships.json"
    );

  const shipsData =
    await shipsResponse.json();

  console.log(
    "Ships data loaded"
  );

  addDebugOutput(
    "SHIPS DATA",
    shipsData
  );


  // ==================================================
  // LOAD COMBAT INPUT
  // ==================================================

  const inputResponse =
    await fetch(
      ".\scenario\test_001.json"
    );

  const combatInput =
    await inputResponse.json();

  console.log(
    "Combat input loaded"
  );

  addDebugOutput(
    "COMBAT INPUT",
    combatInput
  );


  // ==================================================
  // LOAD FLEET INPUT
  // ==================================================

  const attackerInput =
    combatInput.attacker;

  const defenderInput =
    combatInput.defender;


  // ==================================================
  // BUILD FLEET RUNTIMES
  // ==================================================

  console.log("================================");
  console.log("BUILD FLEET RUNTIMES");
  console.log("================================");

  const attackerFleet =
    buildFleetRuntime(
      attackerInput,
      shipsData
    );

  const defenderFleet =
    buildFleetRuntime(
      defenderInput,
      shipsData
    );

  addDebugOutput(
    "ATTACKER FLEET",
    attackerFleet
  );

  addDebugOutput(
    "DEFENDER FLEET",
    defenderFleet
  );


  // ==================================================
  // BUILD COMBAT RUNTIME
  // ==================================================

  console.log("================================");
  console.log("BUILD COMBAT RUNTIME");
  console.log("================================");

  const combatRuntime =
    buildCombatRuntime({

      attackerFleet,

      defenderFleet
    });

  addDebugOutput(
    "COMBAT RUNTIME",
    combatRuntime
  );


  // ==================================================
  // RUN COMBAT RESOLVER
  // ==================================================

  console.log("================================");
  console.log("RUN COMBAT RESOLVER");
  console.log("================================");

  const resolver =
    new CombatResolver();

  const combatResult =
    resolver.resolveCombat(
      combatRuntime
    );


  // ==================================================
  // COMBAT RESULT
  // ==================================================

  console.log("================================");
  console.log("COMBAT RESULT");
  console.log("================================");

  console.log(
    JSON.stringify(
      combatResult,
      null,
      2
    )
  );

  addDebugOutput(
    "COMBAT RESULT",
    combatResult
  );


  // ==================================================
  // COMBAT END
  // ==================================================

  console.log("================================");
  console.log("COMBAT END");
  console.log("================================");

  addDebugOutput(
    "COMBAT END",
    {
      status:
        "finished"
    }
  );
}


// ==================================================
// RUN COMBAT ENGINE
// ==================================================

startCombat();