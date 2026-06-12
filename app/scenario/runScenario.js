// ==================================================
// app/scenario/runScenario.js
// ==================================================

import fs from "fs";

import executeScenario
    from "./executeScenario.js";

import buildBattleReport
    from "../../report/builders/BattleReportBuilder.js";

const domain =
    process.argv[2];

const scenarioId =
    process.argv[3];

if (
    !domain ||
    !scenarioId
) {

    console.error(

        "Usage: npm run scenario -- <domain> <scenarioId>"
    );

    process.exit(1);
}

const fileData =
    JSON.parse(

        fs.readFileSync(

            `./scenario/${domain}.json`,

            "utf8"
        )
    );

const scenario =
    fileData.tests.find(

        test =>

            test.id ===
            scenarioId
    );

if (
    !scenario
) {

    console.error(

        `Scenario not found: ${scenarioId}`
    );

    process.exit(1);
}

const result =
    executeScenario(
        scenario
    );

const battleReport =
    buildBattleReport(
        result
    );

// ==========================================
// LOG DIRECTORY
// ==========================================

const outputDirectory =
    `./log/${domain}`;

fs.mkdirSync(

    outputDirectory,

    {
        recursive: true
    }
);

// ==========================================
// TIMESTAMP
// ==========================================

const timestamp =
    new Date()
        .toISOString()
        .replace(/:/g, "-")
        .replace(/\./g, "-");

// ==========================================
// SAVE REPORT
// ==========================================

const reportFile =

    `${outputDirectory}/${scenarioId}_${timestamp}.json`;

fs.writeFileSync(

    reportFile,

    JSON.stringify(

        battleReport,

        null,

        2
    )
);

// ==========================================
// FINISHED
// ==========================================

console.log();

console.log(
    "BattleReport gespeichert:"
);

console.log(
    reportFile
);

console.log();