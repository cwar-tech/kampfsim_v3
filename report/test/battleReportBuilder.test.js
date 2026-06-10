import fs from "fs";

import executeScenario
    from "../../app/scenario/executeScenario.js";

import buildBattleReport
    from "../builders/BattleReportBuilder.js";

const fileData =
    JSON.parse(

        fs.readFileSync(

            "./scenario/overflow.json",

            "utf8"
        )
    );

const scenario =
    fileData.tests.find(

        test =>
            test.id === "of_007"
    );

const combatResult =
    executeScenario(
        scenario
    );

const battleReport =
    buildBattleReport(
        combatResult
    );

console.log(

    JSON.stringify(
        battleReport,
        null,
        2
    )
);