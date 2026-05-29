import validateCombatResult
    from "../../app/combat/validation/validateCombatResult.js";

describe(
    "validateCombatResult",
    () => {

        const validCombatResult = {

            winner:
                "attacker",

            roundsPlayed: 5,

            attackerLosses: 20,

            defenderLosses: 80,

            attackerDestroyed: false,

            defenderDestroyed: true,

            draw: false
        };



        // ==================================================
        // VALID RESULT
        // ==================================================

        test(
            "accepts valid combat result",
            () => {

                const result =
                    validateCombatResult(
                        validCombatResult
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
            "rejects missing winner",
            () => {

                const invalid = {
                    ...validCombatResult
                };

                delete invalid.winner;

                const result =
                    validateCombatResult(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing roundsPlayed",
            () => {

                const invalid = {
                    ...validCombatResult
                };

                delete invalid.roundsPlayed;

                const result =
                    validateCombatResult(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing attackerLosses",
            () => {

                const invalid = {
                    ...validCombatResult
                };

                delete invalid.attackerLosses;

                const result =
                    validateCombatResult(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects missing defenderLosses",
            () => {

                const invalid = {
                    ...validCombatResult
                };

                delete invalid.defenderLosses;

                const result =
                    validateCombatResult(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );



        // ==================================================
        // ENUM VALIDATION
        // ==================================================

        test(
            "rejects invalid winner enum",
            () => {

                const invalid = {

                    ...validCombatResult,

                    winner: "nobody"
                };

                const result =
                    validateCombatResult(
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
            "rejects string roundsPlayed",
            () => {

                const invalid = {

                    ...validCombatResult,

                    roundsPlayed: "5"
                };

                const result =
                    validateCombatResult(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects string attackerLosses",
            () => {

                const invalid = {

                    ...validCombatResult,

                    attackerLosses: "20"
                };

                const result =
                    validateCombatResult(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects array defenderLosses",
            () => {

                const invalid = {

                    ...validCombatResult,

                    defenderLosses: []
                };

                const result =
                    validateCombatResult(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects string draw",
            () => {

                const invalid = {

                    ...validCombatResult,

                    draw: "false"
                };

                const result =
                    validateCombatResult(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );



        // ==================================================
        // VALUE VALIDATION
        // ==================================================

        test(
            "rejects negative roundsPlayed",
            () => {

                const invalid = {

                    ...validCombatResult,

                    roundsPlayed: -1
                };

                const result =
                    validateCombatResult(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects negative attackerLosses",
            () => {

                const invalid = {

                    ...validCombatResult,

                    attackerLosses: -10
                };

                const result =
                    validateCombatResult(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects negative defenderLosses",
            () => {

                const invalid = {

                    ...validCombatResult,

                    defenderLosses: -5
                };

                const result =
                    validateCombatResult(
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
            "rejects attacker winner with attackerDestroyed",
            () => {

                const invalid = {

                    ...validCombatResult,

                    winner: "attacker",

                    attackerDestroyed: true
                };

                const result =
                    validateCombatResult(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects defender winner with defenderDestroyed",
            () => {

                const invalid = {

                    ...validCombatResult,

                    winner: "defender",

                    defenderDestroyed: true
                };

                const result =
                    validateCombatResult(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "rejects draw without draw flag",
            () => {

                const invalid = {

                    ...validCombatResult,

                    winner: "draw",

                    draw: false
                };

                const result =
                    validateCombatResult(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );


        test(
            "accepts valid draw result",
            () => {

                const validDraw = {

                    ...validCombatResult,

                    winner: "draw",

                    draw: true
                };

                const result =
                    validateCombatResult(
                        validDraw
                    );

                expect(result.valid)
                    .toBe(true);
            }
        );



        // ==================================================
        // EDGE CASES
        // ==================================================

        test(
            "accepts zero losses",
            () => {

                const valid = {

                    ...validCombatResult,

                    attackerLosses: 0
                };

                const result =
                    validateCombatResult(
                        valid
                    );

                expect(result.valid)
                    .toBe(true);
            }
        );


        test(
            "rejects decimal roundsPlayed",
            () => {

                const invalid = {

                    ...validCombatResult,

                    roundsPlayed: 2.5
                };

                const result =
                    validateCombatResult(
                        invalid
                    );

                expect(result.valid)
                    .toBe(false);
            }
        );

    }
);