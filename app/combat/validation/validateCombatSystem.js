// ==================================================
// app/combat/validation/validateCombatSystem.js
// ==================================================

import validateCombatSetup
    from "./validateCombatSetup.js";

import validateCombatRuntime
    from "./validateCombatRuntime.js";

import validateCombatResult
    from "./validateCombatResult.js";

import validateCombatAnalysis
    from "./validateCombatAnalysis.js";

import validateBattleReport
    from "./validateBattleReport.js";

function validateCombatSystem({

    setup,

    runtime,

    result,

    analysis,

    report

}) {

    const errors = [];

    if (
        setup
    ) {

        errors.push(

            ...validateCombatSetup(
                setup
            ).errors
        );
    }

    if (
        runtime
    ) {

        errors.push(

            ...validateCombatRuntime(
                runtime
            ).errors
        );
    }

    if (
        result
    ) {

        errors.push(

            ...validateCombatResult(
                result
            ).errors
        );
    }

    if (
        analysis
    ) {

        errors.push(

            ...validateCombatAnalysis(
                analysis
            ).errors
        );
    }

    if (
        report
    ) {

        errors.push(

            ...validateBattleReport(
                report
            ).errors
        );
    }

    return {

        valid:
            errors.length === 0,

        errors,

        warnings: []
    };
}

export default
    validateCombatSystem;