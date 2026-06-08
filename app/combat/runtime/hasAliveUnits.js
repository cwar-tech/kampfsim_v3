// ==================================================
// app/combat/runtime/hasAliveUnits.js
// ==================================================

function hasAliveUnits(
    fleet
) {

    return (
        fleet?.units || []
    ).some(

        unit =>

            unit &&
            unit.remainingHp > 0
    );
}

export default
    hasAliveUnits;