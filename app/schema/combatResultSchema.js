// ==================================================
// app/schema/combatResultSchema.js
// ==================================================

export const combatResultSchema = {

  winner: "string",

  combatState: "string",


  attackerFleet: {

    totalUnits: "number",

    remainingUnits: "number",

    destroyedUnits: "number",

    totalHp: "number",

    remainingHp: "number",

    totalDamage: "number",

    receivedDamage: "number"
  },


  defenderFleet: {

    totalUnits: "number",

    remainingUnits: "number",

    destroyedUnits: "number",

    totalHp: "number",

    remainingHp: "number",

    totalDamage: "number",

    receivedDamage: "number"
  },


  roundEvents: "array",


  attackerDestroyedVolume:
    "number",

  defenderDestroyedVolume:
    "number"
};