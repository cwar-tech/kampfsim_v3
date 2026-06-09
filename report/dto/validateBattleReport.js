// ==================================================
// report/validation/validateBattleReport.js
// ==================================================

function validateBattleReport(
    report
) {

    if (
        !report ||
        typeof report !==
        "object"
    ) {

        throw new Error(

            "[REPORT-001] BattleReport missing"
        );
    }

    if (
        !report.overview
    ) {

        throw new Error(

            "[REPORT-002] overview missing"
        );
    }

    if (
        !report.fleetState
    ) {

        throw new Error(

            "[REPORT-003] fleetState missing"
        );
    }

    if (
        !report.advantages
    ) {

        throw new Error(

            "[REPORT-004] advantages missing"
        );
    }

    if (
        !report.analysis
    ) {

        throw new Error(

            "[REPORT-005] analysis missing"
        );
    }

    if (
        !report.combatLog
    ) {

        throw new Error(

            "[REPORT-006] combatLog missing"
        );
    }

    if (
        !report.technical
    ) {

        throw new Error(

            "[REPORT-007] technical missing"
        );
    }

    return true;
}

export default
    validateBattleReport;