const selectTarget = require("./selectTarget");

const OverflowEvent = require("../runtime/OverflowEvent");

const DamageEvent = require("../runtime/DamageEvent");

function resolveOverflow({
    combatRuntime,
    roundRuntime,
    damageEvent
}) {
    if (
        !damageEvent.overflowDamage ||
        damageEvent.overflowDamage <= 0
    ) {
        return;
    }

    const allUnits = [
        ...combatRuntime.attackerFleet.units,
        ...combatRuntime.defenderFleet.units
    ];

    const previousTarget =
        allUnits.find(
            (unit) =>
                unit.runtimeUnitId ===
                damageEvent.targetRuntimeUnitId
        );

    if (!previousTarget) {
        return;
    }

    const sourceUnit =
        allUnits.find(
            (unit) =>
                unit.runtimeUnitId ===
                damageEvent.sourceRuntimeUnitId
        );

    if (!sourceUnit) {
        return;
    }

    const enemyUnits =
        combatRuntime.attackerFleet.units.includes(sourceUnit)
            ? combatRuntime.defenderFleet.units
            : combatRuntime.attackerFleet.units;

    const availableTargets =
        enemyUnits.filter(
            (unit) =>
                unit.runtimeUnitId !==
                previousTarget.runtimeUnitId &&
                unit.remainingUnits > 0
        );

    if (availableTargets.length === 0) {
        return;
    }

    const normalizedOverflowDamage =
        damageEvent.overflowDamage * 0.95;

    const newTarget = selectTarget({
        sourceUnit,
        enemyUnits: availableTargets
    });

    if (!newTarget) {
        return;
    }

    const multiplierEntry =
        sourceUnit.damageMultipliers?.find(
            (entry) =>
                entry.targetType ===
                newTarget.unitTypeId
        );

    const newMultiplier =
        multiplierEntry?.multiplier || 1;

    const newAppliedDamage =
        normalizedOverflowDamage *
        newMultiplier;

    const overflowEvent =
        new OverflowEvent({
            sourceDamageEventId:
                damageEvent.sourceRuntimeUnitId,

            previousTargetRuntimeUnitId:
                previousTarget.runtimeUnitId,

            newTargetRuntimeUnitId:
                newTarget.runtimeUnitId,

            originalOverflowDamage:
                damageEvent.overflowDamage,

            overflowLoss:
                damageEvent.overflowDamage * 0.05,

            normalizedOverflowDamage,

            previousMultiplierRemoved:
                damageEvent.multiplier,

            newMultiplierApplied:
                newMultiplier
        });

    roundRuntime.overflowEvents.push(
        overflowEvent
    );

    const overflowDamageEvent =
        new DamageEvent({
            sourceRuntimeUnitId:
                sourceUnit.runtimeUnitId,

            targetRuntimeUnitId:
                newTarget.runtimeUnitId,

            sourceUnitTypeId:
                sourceUnit.unitTypeId,

            targetUnitTypeId:
                newTarget.unitTypeId,

            baseDamage:
                normalizedOverflowDamage,

            multiplier:
                newMultiplier,

            appliedDamage:
                newAppliedDamage,

            overflowDamage: 0
        });

    roundRuntime.damageEvents.push(
        overflowDamageEvent
    );
}

module.exports = resolveOverflow;