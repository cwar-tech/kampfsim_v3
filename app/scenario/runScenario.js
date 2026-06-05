import fs from "fs";

import executeScenario
    from "./executeScenario.js";

const scenarioName =
    process.argv[2];

if (
    !scenarioName
) {

    console.error(
        "Scenario name missing"
    );

    process.exit(1);
}

const scenario =
    JSON.parse(

        fs.readFileSync(

            `./scenario/${scenarioName}.json`,

            "utf8"
        )
    );

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