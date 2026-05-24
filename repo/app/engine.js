// ==================================================
// app/engine.js
// ==================================================


// ==================================================
// IMPORTS
// ==================================================

import { resolveFleet }
  from "./combat/resolveFleet.js";

import { calculateRound }
  from "./combat/calculateRound.js";



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
    await fetch("./ships.json");

  const shipsData =
    await shipsResponse.json();

  console.log("Ships data loaded");



  // ==================================================
  // LOAD COMBAT INPUT
  // ==================================================

  const inputResponse =
    await fetch(
      "../DATA/COMBAT/API/TESTDATA/COMBAT-INPUT-001.json"
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

  console.log(roundResult);



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