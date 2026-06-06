function buildFinalCombatStats({

    baseStats,
    modifiers
}) {

    if (
        !baseStats ||
        typeof baseStats !==
        "object"
    ) {
        return null;
    }

    const safeModifiers =
        Array.isArray(
            modifiers
        )
            ? modifiers
            : [];

    const finalStats = {

        hpPerUnit:
            Number(
                baseStats.hp
            ) || 0,

        dmgPerUnit:
            Number(
                baseStats.damage
            ) || 0,

        armorPerUnit:
            Number(
                baseStats.armor
            ) || 0,

    };

    for (
        const modifier
        of safeModifiers
    ) {

        if (
            !modifier ||
            typeof modifier !==
            "object"
        ) {
            continue;
        }

        const {

            stat,
            multiplier
        } = modifier;

        if (
            typeof stat !==
            "string"
        ) {
            continue;
        }

        if (
            typeof multiplier !==
            "number"
        ) {
            continue;
        }

        switch (stat) {

            case "hp":

                finalStats
                    .hpPerUnit *=
                    multiplier;

                break;

            case "damage":

                finalStats
                    .dmgPerUnit *=
                    multiplier;

                break;

            case "armor":

                finalStats
                    .armorPerUnit *=
                    multiplier;

                break;

        }
    }

    finalStats.hpPerUnit =
        Math.round(
            finalStats.hpPerUnit
        );

    finalStats.dmgPerUnit =
        Math.round(
            finalStats.dmgPerUnit
        );

    finalStats.armorPerUnit =
        Math.round(
            finalStats.armorPerUnit
        );

    return finalStats;
}

export default
    buildFinalCombatStats;