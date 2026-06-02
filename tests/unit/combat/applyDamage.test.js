import applyDamage
    from "../../../app/combat/resolver/applyDamage.js";

describe(
    "applyDamage",
    () => {

        const createTarget =
            ({
                remainingHp = 5000,
                remainingUnits = 10,
                hpPerUnit = 500
            } = {}) => ({

                runtimeUnitId:
                    "target_1",

                unitCount:
                    remainingUnits,

                remainingUnits,

                hpPerUnit,

                totalHp:
                    hpPerUnit *
                    remainingUnits,

                remainingHp,

                receivedDamage: 0,

                destroyed: false
            });



        // ==================================================
        // BASIC DAMAGE
        // ==================================================

        test(
            "applies damage correctly",
            () => {

                const target =
                    createTarget();

                const result =
                    applyDamage(
                        target,
                        1000
                    );

                expect(
                    result.target
                        .remainingHp
                ).toBe(4000);
            }
        );



        // ==================================================
        // OVERFLOW
        // ==================================================

        test(
            "creates overflow correctly",
            () => {

                const target =
                    createTarget({

                        remainingHp:
                            500
                    });

                const result =
                    applyDamage(
                        target,
                        1000
                    );

                expect(
                    result.overflowDamage
                ).toBe(500);
            }
        );



        // ==================================================
        // APPLIED DAMAGE
        // ==================================================

        test(
            "tracks real applied damage correctly",
            () => {

                const target =
                    createTarget({

                        remainingHp:
                            500
                    });

                const result =
                    applyDamage(
                        target,
                        1000
                    );

                expect(
                    result.appliedDamage
                ).toBe(500);
            }
        );



        // ==================================================
        // MASS BATTLE
        // ==================================================

        test(
            "handles massive stack battles correctly",
            () => {

                const target = {

                    runtimeUnitId:
                        "mass_target",

                    unitCount:
                        100000,

                    remainingUnits:
                        100000,

                    hpPerUnit:
                        500,

                    totalHp:
                        50000000,

                    remainingHp:
                        50000000,

                    receivedDamage: 0,

                    destroyed:
                        false
                };

                const result =
                    applyDamage(
                        target,
                        12000000
                    );

                expect(
                    result.target
                        .remainingHp
                ).toBe(
                    38000000
                );

                expect(
                    result.target
                        .remainingUnits
                ).toBe(
                    76000
                );

                expect(
                    result.target
                        .destroyed
                ).toBe(false);
            }
        );



        // ==================================================
        // HP SAFETY
        // ==================================================

        test(
            "never creates negative hp",
            () => {

                const target =
                    createTarget();

                const result =
                    applyDamage(
                        target,
                        999999999
                    );

                expect(
                    result.target
                        .remainingHp
                ).toBe(0);
            }
        );


        test(
            "never exceeds totalHp",
            () => {

                const target =
                    createTarget();

                const result =
                    applyDamage(
                        target,
                        0
                    );

                expect(
                    result.target
                        .remainingHp
                ).toBeLessThanOrEqual(
                    result.target
                        .totalHp
                );
            }
        );



        // ==================================================
        // DERIVED STATE
        // ==================================================

        test(
            "destroyed is derived from remainingHp",
            () => {

                const target =
                    createTarget();

                const result =
                    applyDamage(
                        target,
                        999999
                    );

                expect(
                    result.target
                        .destroyed
                ).toBe(true);
            }
        );


        test(
            "remainingUnits are derived from remainingHp",
            () => {

                const target =
                    createTarget();

                const result =
                    applyDamage(
                        target,
                        700
                    );

                expect(
                    result.target
                        .remainingUnits
                ).toBe(9);
            }
        );



        // ==================================================
        // VALIDATION
        // ==================================================

        test(
            "returns null for invalid target",
            () => {

                const result =
                    applyDamage(
                        null,
                        100
                    );

                expect(result)
                    .toBeNull();
            }
        );


        test(
            "returns null for invalid damage",
            () => {

                const target =
                    createTarget();

                const result =
                    applyDamage(
                        target,
                        -100
                    );

                expect(result)
                    .toBeNull();
            }
        );

    }
);