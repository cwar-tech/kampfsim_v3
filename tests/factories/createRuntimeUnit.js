
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

    armor = 0,

    speed = 100,

    modifiers = [],

    receivedDamage = 0
} = {}) {

    const runtime =
        buildUnitRuntime({

            runtimeUnitId,

            shipTemplateId,

            unitCount,

            baseStats: {

                hp,
                damage,
                armor,
                speed
            },

            modifiers
        });

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