// ==================================================
// engine.js
// ==================================================


// ==================================================
// IMPORTS
// ==================================================

import { resolveFleet }
  from "./app/combat/resolveFleet.js";

import { calculateRound }
  from "./app/combat/calculateRound.js";



// ==================================================
// START COMBAT ENGINE
// ==================================================

async function startCombat() {

  // ==================================================
  // COMBAT INITIALIZATION
  // ==================================================

  console.log("================================");
  console.log("COMBAT INITIALIZATION");
  console.log("================================");


  // ==================================================
  // LOAD SHIPS DATA
  // ==================================================

  const shipsResponse =
    await fetch("./app/ships.json");

  const shipsData =
    await shipsResponse.json();

  console.log("Ships data loaded");



  // ==================================================
  // LOAD COMBAT INPUT
  // ==================================================

  const inputResponse =
    await fetch(
      "./data/COMBAT-INPUT-001.json"
    );

  const combatInput =
    await inputResponse.json();

  console.log("Combat input loaded");



  // ==================================================
  // LOAD ATTACKER INPUT
  // ==================================================

  const attackerInput =
    combatInput.attacker;

  console.log("Attacker input loaded");



  // ==================================================
  // LOAD DEFENDER INPUT
  // ==================================================

  const defenderInput =
    combatInput.defender;

  console.log("Defender input loaded");



  // ==================================================
  // RESOLVE RUNTIME FLEETS
  // ==================================================

  console.log("================================");
  console.log("RESOLVE RUNTIME FLEETS");
  console.log("================================");


  const attackerFleet = resolveFleet(
    attackerInput,
    shipsData
  );

  const defenderFleet = resolveFleet(
    defenderInput,
    shipsData
  );



  // ==================================================
  // ATTACKER FLEET OUTPUT
  // ==================================================

  console.log("================================");
  console.log("ATTACKER FLEET");
  console.log("================================");

  console.log(attackerFleet);



  // ==================================================
  // DEFENDER FLEET OUTPUT
  // ==================================================

  console.log("================================");
  console.log("DEFENDER FLEET");
  console.log("================================");

  console.log(defenderFleet);



  // ==================================================
  // ROUND 1
  // ==================================================

  console.log("================================");
  console.log("ROUND 1");
  console.log("================================");



  // ==================================================
  // CALCULATE ROUND
  // ==================================================

  const roundResult = calculateRound(
    attackerFleet,
    defenderFleet
  );



  // ==================================================
  // ROUND RESULT OUTPUT
  // ==================================================

  console.log("================================");
  console.log("ROUND RESULT");
  console.log("================================");

  console.log(
    JSON.stringify(roundResult, null, 2)
  );



  // ==================================================
  // COMBAT END
  // ==================================================

  console.log("================================");
  console.log("COMBAT END");
  console.log("================================");
}



// ==================================================
// RUN COMBAT ENGINE
// ==================================================

startCombat();