function buildUnitRuntime({

    runtimeUnitId,

    shipTemplateId,

    unitCount,

    hpPerUnit,

    dmgPerUnit,

    armorMultiplier,

    penetrationMultiplier,

    modifiers = []
}) {

    if (
        !runtimeUnitId ||
        typeof runtimeUnitId !==
        "string"
    ) {
        return null;
    }

    if (
        !shipTemplateId ||
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

    // ==========================================
    // RUNTIME VALUES
    // ==========================================

    hpPerUnit =
        typeof hpPerUnit ===
            "number"
            ? hpPerUnit
            : 0;

    dmgPerUnit =
        typeof dmgPerUnit ===
            "number"
            ? dmgPerUnit
            : 0;

    armorMultiplier =
        typeof armorMultiplier ===
            "number"
            ? armorMultiplier
            : 1;

    penetrationMultiplier =
        typeof penetrationMultiplier ===
            "number"
            ? penetrationMultiplier
            : 1;



    // ==========================================
    // TOTAL VALUES
    // ==========================================

    const totalHp =
        hpPerUnit *
        unitCount;

    const totalDamage =
        dmgPerUnit *
        unitCount;



    // ==========================================
    // RUNTIME
    // ==========================================

    const runtime = {

        runtimeUnitId,

        shipTemplateId,

        unitCount,



        // ======================================
        // FINAL RUNTIME VALUES
        // ======================================

        hpPerUnit,

        dmgPerUnit,

        armorMultiplier,

        penetrationMultiplier,



        // ======================================
        // TOTAL VALUES
        // ======================================

        totalHp,

        totalDamage,



        // ======================================
        // RUNTIME STATE
        // ======================================

        remainingHp:
            totalHp,

        remainingUnits:
            unitCount,

        destroyed:
            false,

        hpLastUnit:
            hpPerUnit,

        receivedDamage:
            0,



        // ======================================
        // MODIFIERS
        // ======================================

        modifiers:
            Array.isArray(
                modifiers
            )
                ? modifiers
                : []
    };

    return runtime;
}

export default
    buildUnitRuntime;