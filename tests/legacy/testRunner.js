// ==================================================
// tests/helpers/testRunner.js
// ==================================================

const testResults = [];



// ==================================================
// RUN TEST
// ==================================================

export function runTest({

  level,
  module,
  name,
  context = {},
  test

}) {

  console.log("================================");
  console.log("TEST START");
  console.log("================================");

  console.log(`LEVEL: ${level}`);
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

    console.error("STATUS: FAILED");

    console.error("\n");


    // ==================================================
    // ERROR MESSAGE
    // ==================================================

    console.error(
      "ERROR MESSAGE:"
    );

    console.error(
      error.message
    );

    console.error("\n");


    // ==================================================
    // STACK TRACE
    // ==================================================

    console.error(
      "STACK TRACE:"
    );

    console.error(
      error.stack
    );

    console.error("\n");


    // ==================================================
    // CONTEXT
    // ==================================================

    console.error(
      "TEST CONTEXT:"
    );

    console.error(

      JSON.stringify(
        context,
        null,
        2
      )
    );

    console.error("\n");


    testResults.push({

      level,
      module,
      name,

      status:
        "FAILED",

      error:
        error.message,

      stack:
        error.stack,

      context
    });
  }


  console.log("================================");
  console.log("TEST END");
  console.log("================================");

  console.log("\n");
}



// ==================================================
// ASSERT EQUAL
// ==================================================

export function assertEqual({

  actual,
  expected,
  field,
  message

}) {

  if (
    actual !== expected
  ) {

    throw new Error(

`${message}

FIELD:
${field}

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

export function assertExists({

  value,
  field,
  message

}) {

  if (

    value === undefined ||
    value === null

  ) {

    throw new Error(

`${message}

FIELD:
${field}

ACTUAL:
${value}`
    );
  }
}



// ==================================================
// ASSERT TYPE
// ==================================================

export function assertType({

  value,
  expectedType,
  field,
  message

}) {

  const actualType =
    typeof value;

  if (
    actualType !==
    expectedType
  ) {

    throw new Error(

`${message}

FIELD:
${field}

EXPECTED TYPE:
${expectedType}

ACTUAL TYPE:
${actualType}`
    );
  }
}



// ==================================================
// ASSERT ARRAY
// ==================================================

export function assertArray({

  value,
  field,
  message

}) {

  if (
    !Array.isArray(value)
  ) {

    throw new Error(

`${message}

FIELD:
${field}

ACTUAL:
${typeof value}`
    );
  }
}



// ==================================================
// ASSERT GREATER THAN
// ==================================================

export function assertGreaterThan({

  actual,
  minimum,
  field,
  message

}) {

  if (
    actual <= minimum
  ) {

    throw new Error(

`${message}

FIELD:
${field}

EXPECTED >:
${minimum}

ACTUAL:
${actual}`
    );
  }
}



// ==================================================
// PRINT SUMMARY
// ==================================================

export function printSummary() {

  console.log("================================");
  console.log("GLOBAL TEST SUMMARY");
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
    `SUCCESSFUL TESTS: ${successCount}`
  );

  console.log(
    `FAILED TESTS: ${failedCount}`
  );

  console.log("\n");


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
      "Global test run failed"
    );
  }

  console.log(
    "GLOBAL TEST RUN: SUCCESS"
  );
}