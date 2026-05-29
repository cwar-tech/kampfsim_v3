const selectTarget = require("./selectTarget");

const applyDamage = require("./applyDamage");

const resolveOverflow = require("./resolveOverflow");

const aggregateDamage = require("./aggregateDamage");

const calculateLosses = require("./calculateLosses");

const DamageEvent = require("../runtime/DamageEvent");

function resolveRound({
    combatRuntime,
    roundRuntime
}) {
    const attackerUnits =
        combatRuntime.attackerFleet.units.filter(
            (unit) => unit.remainingUnits > 0
        );

    const defenderUnits =
        combatRuntime.defenderFleet.units.filter(
            (unit) => unit.remainingUnits > 0
        );

    for (const attackerUnit of attackerUnits) {
        const target = selectTarget({
            sourceUnit: attackerUnit,
            enemyUnits: defenderUnits
        });

        if (!target) {
            continue;
        }

        const multiplierEntry =
            attackerUnit.damageMultipliers?.find(
                (entry) => entry.targetType === target.unitTypeId
            );

        const multiplier =
            multiplierEntry?.multiplier || 1;

        const baseDamage =
            attackerUnit.damage *
            attackerUnit.remainingUnits;

        const appliedDamage =
            baseDamage * multiplier;

        const damageEvent = new DamageEvent({
            sourceRuntimeUnitId:
                attackerUnit.runtimeUnitId,

            targetRuntimeUnitId:
                target.runtimeUnitId,

            sourceUnitTypeId:
                attackerUnit.unitTypeId,

            targetUnitTypeId:
                target.unitTypeId,

            baseDamage,

            multiplier,

            appliedDamage,

            overflowDamage: 0
        });

        roundRuntime.damageEvents.push(
            damageEvent
        );
    }

    for (const defenderUnit of defenderUnits) {
        const target = selectTarget({
            sourceUnit: defenderUnit,
            enemyUnits: attackerUnits
        });

        if (!target) {
            continue;
        }

        const multiplierEntry =
            defenderUnit.damageMultipliers?.find(
                (entry) => entry.targetType === target.unitTypeId
            );

        const multiplier =
            multiplierEntry?.multiplier || 1;

        const baseDamage =
            defenderUnit.damage *
            defenderUnit.remainingUnits;

        const appliedDamage =
            baseDamage * multiplier;

        const damageEvent = new DamageEvent({
            sourceRuntimeUnitId:
                defenderUnit.runtimeUnitId,

            targetRuntimeUnitId:
                target.runtimeUnitId,

            sourceUnitTypeId:
                defenderUnit.unitTypeId,

            targetUnitTypeId:
                target.unitTypeId,

            baseDamage,

            multiplier,

            appliedDamage,

            overflowDamage: 0
        });

        roundRuntime.damageEvents.push(
            damageEvent
        );
    }

    for (const damageEvent of roundRuntime.damageEvents) {
        applyDamage({
            combatRuntime,
            roundRuntime,
            damageEvent
        });

        resolveOverflow({
            combatRuntime,
            roundRuntime,
            damageEvent
        });
    }

    aggregateDamage({
        combatRuntime,
        roundRuntime
    });

    calculateLosses({
        combatRuntime,
        roundRuntime
    });
}

module.exports = resolveRound;