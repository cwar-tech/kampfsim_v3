import validateCombatRuntime
    from "../../app/combat/validation/validateCombatRuntime.js";

describe(
    "validateCombatRuntime",
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
        // VALID RUNTIME
        // ==================================================

        test(
            "accepts valid combat runtime",
            () => {

                const result =
                    validateCombatRuntime(
                        validCombatRuntime
                    );

                expect(result.valid)
                    .toBe(true);

                expect(result.errors)
                    .toEqual([]);
            }
        );



        // ==================================================
        // REQUIRED FIELDS
        // ==================================================

        test(
            "rejects missing combatId",
            () => {

                const invalid = {
                    ...validCombatRuntime
                };

                delete invalid.combatId;

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing attackerFleet",
            () => {

                const invalid = {
                    ...validCombatRuntime
                };

                delete invalid.attackerFleet;

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing defenderFleet",
            () => {

                const invalid = {
                    ...validCombatRuntime
                };

                delete invalid.defenderFleet;

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing currentRound",
            () => {

                const invalid = {
                    ...validCombatRuntime
                };

                delete invalid.currentRound;

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );



        // ==================================================
        // TYPE VALIDATION
        // ==================================================

        test(
            "rejects string currentRound",
            () => {

                const invalid = {

                    ...validCombatRuntime,

                    currentRound: "1"
                };

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects negative currentRound",
            () => {

                const invalid = {

                    ...validCombatRuntime,

                    currentRound: -1
                };

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects string combatFinished",
            () => {

                const invalid = {

                    ...validCombatRuntime,

                    combatFinished: "false"
                };

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects non-array rounds",
            () => {

                const invalid = {

                    ...validCombatRuntime,

                    rounds: {}
                };

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );



        // ==================================================
        // FLEET VALIDATION
        // ==================================================

        test(
            "rejects invalid attacker fleet",
            () => {

                const invalid = {

                    ...validCombatRuntime,

                    attackerFleet: {
                        totalHp: -100
                    }
                };

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects invalid defender fleet",
            () => {

                const invalid = {

                    ...validCombatRuntime,

                    defenderFleet: {
                        totalUnits: -1
                    }
                };

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );



        // ==================================================
        // CROSS VALIDATION
        // ==================================================

        test(
            "rejects combat where both fleets are defeated but combat is unfinished",
            () => {

                const invalid = {

                    ...validCombatRuntime,

                    attackerDefeated: true,

                    defenderDefeated: true,

                    combatFinished: false
                };

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects combatFinished without combatResult",
            () => {

                const invalid = {

                    ...validCombatRuntime,

                    combatFinished: true,

                    combatResult: null
                };

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "accepts finished combat with combatResult",
            () => {

                const validFinished = {

                    ...validCombatRuntime,

                    combatFinished: true,

                    combatResult: {

                        winner:
                            "attacker"
                    }
                };

                const result =
                    validateCombatRuntime(
                        validFinished
                    );

                expect(result.valid)
                    .toBe(true);
            }
        );



        // ==================================================
        // EDGE CASES
        // ==================================================

        test(
            "accepts empty rounds array",
            () => {

                const result =
                    validateCombatRuntime(
                        validCombatRuntime
                    );

                expect(result.valid)
                    .toBe(true);
            }
        );


        test(
            "rejects decimal currentRound",
            () => {

                const invalid = {

                    ...validCombatRuntime,

                    currentRound: 1.5
                };

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects empty combatId",
            () => {

                const invalid = {

                    ...validCombatRuntime,

                    combatId: ""
                };

                const result =
                    validateCombatRuntime(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );

    }
);