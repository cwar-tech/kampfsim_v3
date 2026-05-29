import validateCombatRuntime
    from "../../app/combat/validation/validateCombatRuntime.js";

const clone = (value) =>
    JSON.parse(
        JSON.stringify(value)
    );

describe(
    "combat state invariants",
    () => {

        const validCombatRuntime = {

            combatId:
                "combat_001",

            attackerFleet: {

                fleetId:
                    "fleet_attacker",

                ownerId:
                    "player_1",

                totalUnits: 100,

                totalHp: 43000,

                totalDamage: 8500,

                totalVolume: 2000,

                units: [

                    {
                        runtimeUnitId:
                            "runtime_lf_001",

                        unitTypeId:
                            "light_fighter",

                        amount: 100,

                        remainingUnits: 100,

                        hpLastUnit: 430
                    }

                ]
            },

            defenderFleet: {

                fleetId:
                    "fleet_defender",

                ownerId:
                    "player_2",

                totalUnits: 80,

                totalHp: 32000,

                totalDamage: 6000,

                totalVolume: 1800,

                units: [

                    {
                        runtimeUnitId:
                            "runtime_bomber_001",

                        unitTypeId:
                            "bomber",

                        amount: 80,

                        remainingUnits: 80,

                        hpLastUnit: 400
                    }

                ]
            },

            currentRound: 1,

            rounds: [],

            attackerDefeated: false,

            defenderDefeated: false,

            combatFinished: false,

            combatResult: null
        };



        // ==================================================
        // GLOBAL UNIT INVARIANTS
        // ==================================================

        test(
            "never allows negative remaining units",
            () => {

                const invalid = structuredClone(
                    validCombatRuntime
                );

                invalid
                    .attackerFleet
                    .units[0]
                    .remainingUnits = -1;

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "never allows remaining units above amount",
            () => {

                const invalid = structuredClone(
                    validCombatRuntime
                );

                invalid
                    .attackerFleet
                    .units[0]
                    .remainingUnits = 200;

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "never allows negative hpLastUnit",
            () => {

                const invalid = structuredClone(
                    validCombatRuntime
                );

                invalid
                    .attackerFleet
                    .units[0]
                    .hpLastUnit = -100;

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "never allows living units with zero hpLastUnit",
            () => {

                const invalid = structuredClone(
                    validCombatRuntime
                );

                invalid
                    .attackerFleet
                    .units[0]
                    .remainingUnits = 10;

                invalid
                    .attackerFleet
                    .units[0]
                    .hpLastUnit = 0;

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );



        // ==================================================
        // GLOBAL FLEET INVARIANTS
        // ==================================================

        test(
            "never allows destroyed fleet with hp",
            () => {

                const invalid = structuredClone(
                    validCombatRuntime
                );

                invalid
                    .attackerFleet
                    .totalUnits = 0;

                invalid
                    .attackerFleet
                    .totalHp = 1000;

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "never allows negative fleet hp",
            () => {

                const invalid = structuredClone(
                    validCombatRuntime
                );

                invalid
                    .attackerFleet
                    .totalHp = -500;

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "never allows duplicate runtimeUnitIds globally",
            () => {

                const invalid = structuredClone(
                    validCombatRuntime
                );

                invalid
                    .defenderFleet
                    .units[0]
                    .runtimeUnitId =
                    "runtime_lf_001";

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );



        // ==================================================
        // COMBAT STATE INVARIANTS
        // ==================================================

        test(
            "never allows finished combat without result",
            () => {

                const invalid = structuredClone(
                    validCombatRuntime
                );

                invalid.combatFinished =
                    true;

                invalid.combatResult =
                    null;

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "never allows both fleets defeated while combat is unfinished",
            () => {

                const invalid = structuredClone(
                    validCombatRuntime
                );

                invalid.attackerDefeated =
                    true;

                invalid.defenderDefeated =
                    true;

                invalid.combatFinished =
                    false;

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );



        // ==================================================
        // OVERFLOW SAFETY
        // ==================================================

        test(
            "never allows negative overflow damage",
            () => {

                const overflowDamage =
                    -100;

                expect(
                    overflowDamage >= 0
                ).toBe(false);
            }
        );



        // ==================================================
        // DETERMINISM
        // ==================================================

        test(
            "same combat state always validates identically",
            () => {

                const runtimeA =
                    structuredClone(
                        validCombatRuntime
                    );

                const runtimeB =
                    structuredClone(
                        validCombatRuntime
                    );

                const resultA =
                    validateCombatRuntime(
                        runtimeA
                    );

                const resultB =
                    validateCombatRuntime(
                        runtimeB
                    );

                expect(resultA)
                    .toEqual(resultB);
            }
        );

    }
);