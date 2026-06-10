// ==================================================
// report/services/buildAdvantagesData.js
// ==================================================

import AdvantageData
    from "../dto/AdvantageData.js";

import AdvantageCategoryData
    from "../dto/AdvantageCategoryData.js";

import buildCounterStats
    from "./buildCounterStats.js";

function buildAdvantagesData(
    combatResult
) {

    if (
        !combatResult
    ) {

        throw new Error(

            "[REPORT-020] combatResult missing"
        );
    }

    const counters =
        buildCounterStats(
            combatResult
        );

    return new AdvantageData({

        attacker: {

            research:
                createMockCategory(),

            vip:
                createMockCategory(),

            energon:
                createMockCategory(),

            booster:
                createMockCategory(),

            guild:
                createMockCategory(),

            counters
        },

        defender: {

            research:
                createMockCategory(),

            vip:
                createMockCategory(),

            energon:
                createMockCategory(),

            booster:
                createMockCategory(),

            guild:
                createMockCategory(),

            counters: []
        }
    });
}

function createMockCategory() {

    return new AdvantageCategoryData({

        damage: 1,

        armor: 1,

        penetration: 1,

        hp: 1
    });
}

export default
    buildAdvantagesData;