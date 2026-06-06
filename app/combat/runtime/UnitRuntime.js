// ==================================================
// app/combat/runtime/UnitRuntime.js
// ==================================================

class UnitRuntime {

    constructor({

        // ==========================================
        // IDENTIFIERS
        // ==========================================

        runtimeUnitId,

        shipTemplateId,

        unitTypeId,

        unitCategory,



        // ==========================================
        // COUNTERS
        // ==========================================

        counters = {},



        // ==========================================
        // STACK
        // ==========================================

        unitCount,

        remainingUnits,



        // ==========================================
        // BASE STATS
        // ==========================================

        hpPerUnit,

        dmgPerUnit,

        armorPerUnit,

        penetrationPerUnit,

        volumePerUnit,

        repairDuration,



        // ==========================================
        // SINGLE SOURCE OF TRUTH
        // ==========================================

        totalHp,

        remainingHp,



        // ==========================================
        // DERIVED STATE
        // ==========================================

        totalDamage,

        totalVolume,

        remainingVolume,



        // ==========================================
        // COMBAT STATE
        // ==========================================

        receivedDamage = 0,

        destroyed = false,



        // ==========================================
        // MODIFIERS
        // ==========================================

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

        this.unitCategory =
            typeof unitCategory ===
                "string"
                ? unitCategory
                : "ship";



        // ==========================================
        // COUNTERS
        // ==========================================

        this.counters =
            typeof counters ===
                "object"
                && counters !== null
                ? counters
                : {};



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
        // DERIVED STATE
        // ==========================================

        this.totalDamage =
            typeof totalDamage ===
                "number"
                ? totalDamage
                : (
                    this.unitCount *
                    this.dmgPerUnit
                );

        this.totalVolume =
            typeof totalVolume ===
                "number"
                ? totalVolume
                : (
                    this.unitCount *
                    this.volumePerUnit
                );

        this.remainingVolume =
            typeof remainingVolume ===
                "number"
                ? remainingVolume
                : (
                    this.remainingUnits *
                    this.volumePerUnit
                );



        // ==========================================
        // DAMAGE
        // ==========================================

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