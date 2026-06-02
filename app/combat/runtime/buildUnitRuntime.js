import buildFinalCombatStats
    from "../stats/buildFinalCombatStats.js";

import getShipTemplate
    from "../templates/getShipTemplate.js";

function buildUnitRuntime({

    runtimeUnitId,
    shipTemplateId,
    unitCount,
    modifiers
}) {

    if (
        typeof runtimeUnitId !==
        "string"
    ) {
        return null;
    }

    if (
        typeof shipTemplateId !==
        "string"
    ) {
        return null;
    }

    if (
        typeof unitCount !==
        "number" ||
        unitCount <= 0
    ) {
        return null;
    }

    const shipTemplate =
        getShipTemplate(
            shipTemplateId
        );

    if (
        !shipTemplate
    ) {
        return null;
    }

    const finalStats =
        buildFinalCombatStats({

            baseStats:
                shipTemplate,

            modifiers
        });

    if (
        !finalStats
    ) {
        return null;
    }

    const totalHp =
        finalStats.hpPerUnit *
        unitCount;

    const totalDamage =
        finalStats.dmgPerUnit *
        unitCount;

    return {

        runtimeUnitId,

        shipTemplateId,

        unitTypeId:
            shipTemplate
                .unitTypeId,

        type:
            shipTemplate.type,

        unitCount,

        remainingUnits:
            unitCount,

        hpPerUnit:
            finalStats.hpPerUnit,

        dmgPerUnit:
            finalStats.dmgPerUnit,

        armorPerUnit:
            finalStats.armorPerUnit,

        speedPerUnit:
            finalStats.speedPerUnit,

        penetrationPerUnit:
            shipTemplate
                .penetration,

        volumePerUnit:
            shipTemplate
                .volume,

        repairDuration:
            shipTemplate
                .repairDuration,

        damageMultipliers:
            Array.isArray(
                shipTemplate
                    .damageMultipliers
            )
                ? JSON.parse(
                    JSON.stringify(
                        shipTemplate
                            .damageMultipliers
                    )
                )
                : [],

        totalHp,

        remainingHp:
            totalHp,

        totalDamage,

        receivedDamage: 0,

        destroyed: false
    };
}

export default
    buildUnitRuntime;