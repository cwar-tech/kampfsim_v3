import calculateDamage
    from "../../../app/combat/resolver/calculateDamage.js";

describe(
    "calculateDamage",
    () => {

        const createAttacker =
            ({
                totalDamage = 3000,

                penetrationMultiplier = 1,

                remainingHp = 5000,

                remainingUnits = 10
            } = {}) => ({

                runtimeUnitId:
                    "attacker_1",

                totalDamage,

                penetrationMultiplier,

                remainingHp,

                remainingUnits
            });



        const createTarget =
            ({
                armorMultiplier = 0.25,

                remainingUnits = 10,

                remainingHp = 5000
            } = {}) => ({

                runtimeUnitId:
                    "target_1",

                armorMultiplier,

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
                    result.damageAfterPenetration
                ).toBe(3000);

                expect(
                    result.finalDamage
                ).toBe(750);
            }
        );



        // ==================================================
        // ARMOR MULTIPLIER
        // ==================================================

        test(
            "armorMultiplier reduces final damage",
            () => {

                const attacker =
                    createAttacker({

                        totalDamage:
                            1000
                    });

                const target =
                    createTarget({

                        armorMultiplier:
                            0.10
                    });

                const result =
                    calculateDamage({

                        attacker,

                        target
                    });

                expect(
                    result.baseDamage
                ).toBe(1000);

                expect(
                    result.finalDamage
                ).toBe(100);
            }
        );



        // ==================================================
        // PENETRATION
        // ==================================================

        test(
            "penetration increases damage",
            () => {

                const attacker =
                    createAttacker({

                        totalDamage:
                            1000,

                        penetrationMultiplier:
                            2
                    });

                const target =
                    createTarget({

                        armorMultiplier:
                            0.50
                    });

                const result =
                    calculateDamage({

                        attacker,

                        target
                    });

                expect(
                    result.damageAfterPenetration
                ).toBe(2000);

                expect(
                    result.finalDamage
                ).toBe(1000);
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

                        armorMultiplier:
                            0
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

                        penetrationMultiplier:
                            1.5,

                        remainingUnits:
                            100000,

                        remainingHp:
                            50000000
                    });

                const target =
                    createTarget({

                        armorMultiplier:
                            0.25,

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
                    11250000
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

                        armorMultiplier:
                            0
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