class UnitRuntime {

    constructor({

        runtimeUnitId,

        shipTemplateId,

        unitTypeId,

        unitCount,

        remainingUnits,

        hpPerUnit,

        dmgPerUnit,

        armorPerUnit,

        speedPerUnit,

        penetrationPerUnit,

        volumePerUnit,

        repairDuration,

        totalHp,

        remainingHp,

        totalDamage,

        receivedDamage = 0,

        destroyed = false,

        damageMultipliers = []

    } = {}) {

        // ==========================================
        // IDENTIFIERS
        // ==========================================

        this.runtimeUnitId =
            typeof runtimeUnitId ===
                "string"
                ? runtimeUnitId
                : null;

        this.shipTemplateId =
            typeof shipTemplateId ===
                "string"
                ? shipTemplateId
                : null;

        this.unitTypeId =
            typeof unitTypeId ===
                "string"
                ? unitTypeId
                : null;



        // ==========================================
        // STACK
        // ==========================================

        this.unitCount =
            typeof unitCount ===
                "number"
                ? unitCount
                : 0;

        this.remainingUnits =
            typeof remainingUnits ===
                "number"
                ? remainingUnits
                : 0;



        // ==========================================
        // COMBAT STATS
        // ==========================================

        this.hpPerUnit =
            typeof hpPerUnit ===
                "number"
                ? hpPerUnit
                : 0;

        this.dmgPerUnit =
            typeof dmgPerUnit ===
                "number"
                ? dmgPerUnit
                : 0;

        this.armorPerUnit =
            typeof armorPerUnit ===
                "number"
                ? armorPerUnit
                : 0;

        this.speedPerUnit =
            typeof speedPerUnit ===
                "number"
                ? speedPerUnit
                : 0;

        this.penetrationPerUnit =
            typeof penetrationPerUnit ===
                "number"
                ? penetrationPerUnit
                : 0;

        this.volumePerUnit =
            typeof volumePerUnit ===
                "number"
                ? volumePerUnit
                : 0;

        this.repairDuration =
            typeof repairDuration ===
                "number"
                ? repairDuration
                : 0;



        // ==========================================
        // SINGLE SOURCE OF TRUTH
        // ==========================================

        this.totalHp =
            typeof totalHp ===
                "number"
                ? totalHp
                : 0;

        this.remainingHp =
            typeof remainingHp ===
                "number"
                ? remainingHp
                : 0;



        // ==========================================
        // DAMAGE
        // ==========================================

        this.totalDamage =
            typeof totalDamage ===
                "number"
                ? totalDamage
                : 0;

        this.receivedDamage =
            typeof receivedDamage ===
                "number"
                ? receivedDamage
                : 0;



        // ==========================================
        // STATE
        // ==========================================

        this.destroyed =
            Boolean(
                destroyed
            );



        // ==========================================
        // MODIFIERS
        // ==========================================

        this.damageMultipliers =
            Array.isArray(
                damageMultipliers
            )
                ? damageMultipliers
                : [];
    }
}

export default
    UnitRuntime;