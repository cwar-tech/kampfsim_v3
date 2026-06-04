function validateExpectedOutcome({

    report,
    expected
}) {

    const errors =
        [];



    if (

        expected.winner ===
        "attacker" &&

        !report.defenderDefeated
    ) {

        errors.push(
            "attacker expected to win"
        );
    }



    if (

        expected.winner ===
        "defender" &&

        !report.attackerDefeated
    ) {

        errors.push(
            "defender expected to win"
        );
    }



    if (

        typeof expected.maxRounds ===
        "number" &&

        report.rounds >
        expected.maxRounds
    ) {

        errors.push(
            `round limit exceeded (${report.rounds})`
        );
    }



    if (

        typeof expected.minAttackerRemainingUnits ===
        "number" &&

        report.attackerRemainingUnits <
        expected.minAttackerRemainingUnits
    ) {

        errors.push(
            "attacker remaining units below expectation"
        );
    }



    if (

        typeof expected.minDefenderRemainingUnits ===
        "number" &&

        report.defenderRemainingUnits <
        expected.minDefenderRemainingUnits
    ) {

        errors.push(
            "defender remaining units below expectation"
        );
    }



    return {

        valid:
            errors.length === 0,

        errors
    };
}

export default
    validateExpectedOutcome;