import calculateDamage
    from "../../../app/combat/resolver/calculateDamage.js";

describe(
    "calculateDamage",
    () => {

        const createAttacker =
            ({
                totalDamage = 3000,
                remainingHp = 5000,
                remainingUnits = 10
            } = {}) => ({

                runtimeUnitId:
                    "attacker_1",

                totalDamage,

                remainingHp,

                remainingUnits
            });



        const createTarget =
            ({
                armorPerUnit = 50,
                remainingUnits = 10,
                remainingHp = 5000
            } = {}) => ({

                runtimeUnitId:
                    "target_1",

                armorPerUnit,

                remainingUnits,

                remainingHp
            });



        // ==================================================
        // BASIC DAMAGE
        // ==================================================

        test(
            "calculates basic damage correctly",
            () => {

                const attacker =
                    createAttacker();

                const target =
                    createTarget();

                const result =
                    calculateDamage({

                        attacker,

                        target
                    });

                expect(
                    result.baseDamage
                ).toBe(3000);

                expect(
                    result.totalArmor
                ).toBe(500);

                expect(
                    result.finalDamage
                ).toBe(2500);
            }
        );



        // ==================================================
        // ARMOR
        // ==================================================

        test(
            "reduces damage through armor",
            () => {

                const attacker =
                    createAttacker({

                        totalDamage:
                            1000
                    });

                const target =
                    createTarget({

                        armorPerUnit:
                            100,

                        remainingUnits:
                            10
                    });

                const result =
                    calculateDamage({

                        attacker,

                        target
                    });

                expect(
                    result.finalDamage
                ).toBe(1);
            }
        );



        // ==================================================
        // CHIP DAMAGE
        // ==================================================

        test(
            "creates minimum chip damage",
            () => {

                const attacker =
                    createAttacker({

                        totalDamage:
                            1
                    });

                const target =
                    createTarget({

                        armorPerUnit:
                            999999
                    });

                const result =
                    calculateDamage({

                        attacker,

                        target
                    });

                expect(
                    result.finalDamage
                ).toBe(1);
            }
        );



        // ==================================================
        // DESTROYED ATTACKER
        // ==================================================

        test(
            "destroyed attacker deals no damage",
            () => {

                const attacker =
                    createAttacker({

                        remainingHp:
                            0
                    });

                const target =
                    createTarget();

                const result =
                    calculateDamage({

                        attacker,

                        target
                    });

                expect(
                    result.finalDamage
                ).toBe(0);
            }
        );



        // ==================================================
        // DESTROYED TARGET
        // ==================================================

        test(
            "destroyed target receives no damage",
            () => {

                const attacker =
                    createAttacker();

                const target =
                    createTarget({

                        remainingHp:
                            0
                    });

                const result =
                    calculateDamage({

                        attacker,

                        target
                    });

                expect(
                    result.finalDamage
                ).toBe(0);
            }
        );



        // ==================================================
        // MASS BATTLE
        // ==================================================

        test(
            "handles massive stack battles correctly",
            () => {

                const attacker =
                    createAttacker({

                        totalDamage:
                            30000000,

                        remainingUnits:
                            100000,

                        remainingHp:
                            50000000
                    });

                const target =
                    createTarget({

                        armorPerUnit:
                            50,

                        remainingUnits:
                            100000,

                        remainingHp:
                            50000000
                    });

                const result =
                    calculateDamage({

                        attacker,

                        target
                    });

                expect(
                    result.finalDamage
                ).toBe(
                    25000000
                );
            }
        );



        // ==================================================
        // SAFETY
        // ==================================================

        test(
            "never creates negative damage",
            () => {

                const attacker =
                    createAttacker({

                        totalDamage:
                            0
                    });

                const target =
                    createTarget({

                        armorPerUnit:
                            999999
                    });

                const result =
                    calculateDamage({

                        attacker,

                        target
                    });

                expect(
                    result.finalDamage
                ).toBeGreaterThanOrEqual(
                    0
                );
            }
        );



        // ==================================================
        // VALIDATION
        // ==================================================

        test(
            "returns null for invalid attacker",
            () => {

                const target =
                    createTarget();

                const result =
                    calculateDamage({

                        attacker: null,

                        target
                    });

                expect(result)
                    .toBeNull();
            }
        );


        test(
            "returns null for invalid target",
            () => {

                const attacker =
                    createAttacker();

                const result =
                    calculateDamage({

                        attacker,

                        target: null
                    });

                expect(result)
                    .toBeNull();
            }
        );



        // ==================================================
        // DETERMINISM
        // ==================================================

        test(
            "same input always produces same result",
            () => {

                const attacker =
                    createAttacker();

                const target =
                    createTarget();

                const resultA =
                    calculateDamage({

                        attacker,

                        target
                    });

                const resultB =
                    calculateDamage({

                        attacker,

                        target
                    });

                expect(
                    resultA
                ).toEqual(
                    resultB
                );
            }
        );

    }
);