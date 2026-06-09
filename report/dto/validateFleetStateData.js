// ==================================================
// report/validation/validateFleetStateData.js
// ==================================================

function validateFleetStateData(
    data
) {

    if (
        !data ||
        typeof data !==
        "object"
    ) {

        throw new Error(

            "[FLEETSTATE-001] FleetStateData missing"
        );
    }

    if (
        !data.attacker
    ) {

        throw new Error(

            "[FLEETSTATE-002] attacker missing"
        );
    }

    if (
        !data.defender
    ) {

        throw new Error(

            "[FLEETSTATE-003] defender missing"
        );
    }

    if (
        !Array.isArray(
            data.attacker.units
        )
    ) {

        throw new Error(

            "[FLEETSTATE-004] attacker.units must be array"
        );
    }

    if (
        !Array.isArray(
            data.defender.units
        )
    ) {

        throw new Error(

            "[FLEETSTATE-005] defender.units must be array"
        );
    }

    return true;
}

export default
    validateFleetStateData;