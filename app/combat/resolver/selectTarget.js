function selectTarget({
    sourceUnit,
    enemyUnits
}) {
    const aliveEnemyUnits =
        enemyUnits.filter(
            (unit) => unit.remainingUnits > 0
        );

    if (aliveEnemyUnits.length === 0) {
        return null;
    }

    const sortedTargets =
        [...aliveEnemyUnits].sort((a, b) => {
            const aMultiplier =
                sourceUnit.damageMultipliers?.find(
                    (entry) =>
                        entry.targetType === a.unitTypeId
                )?.multiplier || 1;

            const bMultiplier =
                sourceUnit.damageMultipliers?.find(
                    (entry) =>
                        entry.targetType === b.unitTypeId
                )?.multiplier || 1;

            if (bMultiplier !== aMultiplier) {
                return bMultiplier - aMultiplier;
            }

            return a.runtimeUnitId.localeCompare(
                b.runtimeUnitId
            );
        });

    return sortedTargets[0];
}

module.exports = selectTarget;