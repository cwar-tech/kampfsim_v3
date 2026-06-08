import buildUnitRuntime
    from "../../app/combat/runtime/buildUnitRuntime.js";

function createRuntimeUnit({

    runtimeUnitId =
    "unit_1",

    shipTemplateId =
    "fighter_mk1",

    unitCount = 10,

    hp = 500,

    damage = 100,

    armorMultiplier = 1,

    penetrationMultiplier = 1,

    modifiers = [],

    receivedDamage = 0
} = {}) {

    // ==========================================
    // BUILD PURE RUNTIME
    // ==========================================

    const runtime =
        buildUnitRuntime({

            runtimeUnitId,

            shipTemplateId,

            unitCount,

            hpPerUnit:
                hp,

            dmgPerUnit:
                damage,

            armorMultiplier,

            penetrationMultiplier,

            modifiers
        });

    if (
        !runtime
    ) {
        return null;
    }



    // ==========================================
    // LEGACY COMPATIBILITY
    // TODO REMOVE AFTER FULL MIGRATION
    // ==========================================

    runtime.hp =
        runtime.hpPerUnit;

    runtime.damage =
        runtime.dmgPerUnit;



    // ==========================================
    // RUNTIME STATE
    // ==========================================

    runtime.receivedDamage =
        receivedDamage;



    // ==========================================
    // FINAL RUNTIME RECALCULATION
    // ==========================================

    runtime.totalHp =
        runtime.hpPerUnit *
        runtime.unitCount;

    runtime.totalDamage =
        runtime.dmgPerUnit *
        runtime.remainingUnits;



    return runtime;
}

export default
    createRuntimeUnit;