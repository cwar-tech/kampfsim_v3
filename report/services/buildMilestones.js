// ==================================================
// report/services/buildMilestones.js
// ==================================================

function buildMilestones(
    combatResult
) {

    if (
        !combatResult
    ) {

        throw new Error(

            "[REPORT-005] combatResult missing"
        );
    }

    return [];
}
class MilestoneData {

    constructor({

        round,

        side,

        unitTypeId

    } = {}) {

        this.round =
            round;

        this.side =
            side;

        this.unitTypeId =
            unitTypeId;
    }
}
export default
    buildMilestones;