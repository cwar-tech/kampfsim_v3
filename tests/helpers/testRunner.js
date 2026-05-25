// ==================================================
// tests/helpers/testRunner.js
// ==================================================

const testResults = [];



// ==================================================
// START TEST
// ==================================================

export function runTest({

  level,
  module,
  name,
  test

}) {

  console.log("================================");
  console.log(`TEST LEVEL: ${level}`);
  console.log(`MODULE: ${module}`);
  console.log(`TEST: ${name}`);
  console.log("================================");

  try {

    test();

    console.log("STATUS: SUCCESS");

    testResults.push({

      level,
      module,
      name,

      status:
        "SUCCESS"
    });

  } catch (error) {

    console.error(
      "STATUS: FAILED"
    );

    console.error(
      error.message
    );

    testResults.push({

      level,
      module,
      name,

      status:
        "FAILED",

      error:
        error.message
    });
  }

  console.log("\n");
}



// ==================================================
// ASSERT EQUAL
// ==================================================

export function assertEqual(

  actual,
  expected,
  message

) {

  if (
    actual !== expected
  ) {

    throw new Error(

      `${message}

EXPECTED:
${expected}

ACTUAL:
${actual}`
    );
  }
}



// ==================================================
// ASSERT EXISTS
// ==================================================

export function assertExists(

  value,
  message

) {

  if (

    value === undefined ||
    value === null

  ) {

    throw new Error(
      message
    );
  }
}



// ==================================================
// ASSERT TYPE
// ==================================================

export function assertType(

  value,
  expectedType,
  message

) {

  if (

    typeof value !==
    expectedType

  ) {

    throw new Error(

      `${message}

EXPECTED TYPE:
${expectedType}

ACTUAL TYPE:
${typeof value}`
    );
  }
}



// ==================================================
// PRINT SUMMARY
// ==================================================

export function printSummary() {

  console.log("================================");
  console.log("TEST SUMMARY");
  console.log("================================");

  let successCount = 0;
  let failedCount = 0;


  for (
    const result
    of testResults
  ) {

    console.log(

      `[${result.status}] ` +

      `[${result.level}] ` +

      `[${result.module}] ` +

      `${result.name}`
    );

    if (
      result.status ===
      "SUCCESS"
    ) {

      successCount++;
    }

    if (
      result.status ===
      "FAILED"
    ) {

      failedCount++;
    }
  }


  console.log("\n");

  console.log(
    `SUCCESS: ${successCount}`
  );

  console.log(
    `FAILED: ${failedCount}`
  );


  // ==================================================
  // GLOBAL RESULT
  // ==================================================

  if (
    failedCount > 0
  ) {

    console.error(
      "GLOBAL TEST RUN: FAILED"
    );

    throw new Error(
      "Test run failed"
    );
  }

  console.log(
    "GLOBAL TEST RUN: SUCCESS"
  );
}