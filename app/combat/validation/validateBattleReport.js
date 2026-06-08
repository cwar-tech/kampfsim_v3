// ==================================================
// app/combat/validation/validateBattleReport.js
// ==================================================

import validateBattleReportHeader
    from "./validateBattleReportHeader.js";

import validateBattleReportRound
    from "./validateBattleReportRound.js";

import validateBattleReportStatistics
    from "./validateBattleReportStatistics.js";

function validateBattleReport(
    report
) {

    const errors = [];

    if (
        !report
    ) {

        return {

            valid: false,

            errors: [
                "[REPORT-001] report missing"
            ]
        };
    }

    errors.push(

        ...validateBattleReportHeader(
            report.header
        ).errors
    );

    errors.push(

        ...validateBattleReportStatistics(
            report.statistics
        ).errors
    );

    if (
        !Array.isArray(
            report.rounds
        )
    ) {

        errors.push(
            "[REPORT-002] rounds missing"
        );
    }

    else {

        for (
            const round
            of report.rounds
        ) {

            errors.push(

                ...validateBattleReportRound(
                    round
                ).errors
            );
        }
    }

    return {

        valid:
            errors.length === 0,

        errors
    };
}

export default
    validateBattleReport;