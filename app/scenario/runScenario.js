import fs from "fs";

import runScenario
    from "/runScenario.js";

import generateBattleReport
    from "/generateBattleReport.js";

import validateExpectedOutcome
    from "/validateExpectedOutcome.js";



const scenarioName =
    process.argv[2];



if (!scenarioName) {

    console.error(
        "Scenario name missing"
    );

    process.exit(1);
}



const scenario =
    JSON.parse(

        fs.readFileSync(

            `./scenarios/${scenarioName}.json`,

            "utf8"
        )
    );



const execution =
    runScenario(
        scenario
    );



const report =
    generateBattleReport(
        execution
    );



const validation =
    validateExpectedOutcome({

        report,

        expected:
            scenario.expected
    });



console.log(
    JSON.stringify({

        report,

        validation

    }, null, 2)
);