import fs from "fs";

import executeScenario
    from "./executeScenario.js";

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

console.log(

    JSON.stringify(

        result,

        null,

        2
    )
);