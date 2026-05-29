import applyDamage
    from "./applyDamage.js";

function resolveOverflow(
    fleet,
    overflowDamage
) {

    if (
        !Array.isArray(fleet)
    ) {
        return null;
    }

    if (
        typeof overflowDamage !==
        "number" ||
        overflowDamage < 0
    ) {
        return null;
    }

    const targets =
        JSON.parse(
            JSON.stringify(fleet)
        );

    if (
        overflowDamage === 0
    ) {
        return {
            targets,
            remainingOverflow: 0
        };
    }

    let remainingOverflow =
        overflowDamage;

    for (
        const target
        of targets
    ) {

        if (
            remainingOverflow <= 0
        ) {
            break;
        }

        if (
            target.remainingUnits <= 0
        ) {
            continue;
        }

        const result =
            applyDamage(
                target,
                remainingOverflow
            );

        if (
            !result
        ) {
            continue;
        }

        target.remainingUnits =
            result.target.remainingUnits;

        target.hpLastUnit =
            result.target.hpLastUnit;

        remainingOverflow =
            result.overflowDamage;
    }

    return {
        targets,
        remainingOverflow
    };
}

export default
    resolveOverflow;