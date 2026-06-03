import buildUnitRuntime
    from "../../app/combat/runtime/buildUnitRuntime.js";

function createRuntimeUnit({

    runtimeUnitId =
    "unit_1",

    shipTemplateId =
    "fighter",

    unitCount = 10,

    hp = 500,

    damage = 100,

    armorMultiplier = 0.25,

    penetrationMultiplier = 1.0,

    speed = 100,

    modifiers = [],

    receivedDamage = 0
} = {}) {

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

            speed,

            modifiers
        });

    if (
        !runtime
    ) {
        return null;
    }

    // ==========================================
    // LEGACY COMPATIBILITY
    // ==========================================

    runtime.hp =
        runtime.hpPerUnit;

    runtime.damage =
        runtime.dmgPerUnit;

    runtime.receivedDamage =
        receivedDamage;

    return runtime;
}

export default
    createRuntimeUnit;