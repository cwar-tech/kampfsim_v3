// ==================================================
// app/schema/validateCombatResult.js
// ==================================================

import { combatResultSchema }
  from "./combatResultSchema.js";



export function validateCombatResult(
  combatResult
) {

  validateObject(
    combatResult,
    combatResultSchema,
    "combatResult"
  );

  return true;
}



function validateObject(
  object,
  schema,
  path
) {

  for (
    const key in schema
  ) {

    const expected =
      schema[key];

    const value =
      object[key];



    // ==================================================
    // FIELD EXISTS
    // ==================================================

    if (
      value === undefined
    ) {

      throw new Error(
        `Missing field: ${path}.${key}`
      );
    }



    // ==================================================
    // ARRAY
    // ==================================================

    if (
      expected === "array"
    ) {

      if (
        !Array.isArray(value)
      ) {

        throw new Error(
          `Invalid array: ${path}.${key}`
        );
      }

      continue;
    }



    // ==================================================
    // PRIMITIVE TYPES
    // ==================================================

    if (
      typeof expected === "string"
    ) {

      if (
        typeof value !== expected
      ) {

        throw new Error(
          `Invalid type: ${path}.${key}`
        );
      }

      continue;
    }



    // ==================================================
    // OBJECT
    // ==================================================

    validateObject(
      value,
      expected,
      `${path}.${key}`
    );
  }
}