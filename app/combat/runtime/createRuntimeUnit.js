import buildUnitRuntime
    from "../../app/combat/runtime/buildUnitRuntime.js";

function createRuntimeUnit({

    runtimeUnitId =
    "unit_1",

    shipTemplateId =
    "fighter",

    unitCount = 10,

    modifiers = [],

    receivedDamage = 0
} = {}) {

    const runtime =
        buildUnitRuntime({

            runtimeUnitId,

            shipTemplateId,

            unitCount,

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