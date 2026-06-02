import selectTarget
    from "../../../app/combat/resolver/selectTarget.js";

describe(
    "selectTarget",
    () => {

        const createTarget =
            ({
                runtimeUnitId,
                remainingHp
            }) => ({

                runtimeUnitId,

                remainingHp
            });



        // ==================================================
        // BASIC TARGETING
        // ==================================================

        test(
            "selects first valid target",
            () => {

                const attacker = {

                    runtimeUnitId:
                        "attacker_1"
                };

                const targets = [

                    createTarget({

                        runtimeUnitId:
                            "target_1",

                        remainingHp:
                            500
                    }),

                    createTarget({

                        runtimeUnitId:
                            "target_2",

                        remainingHp:
                            500
                    })
                ];

                const result =
                    selectTarget(
                        attacker,
                        targets
                    );

                expect(
                    result.runtimeUnitId
                ).toBe(
                    "target_1"
                );
            }
        );



        // ==================================================
        // SELF TARGETING
        // ==================================================

        test(
            "never targets self",
            () => {

                const attacker = {

                    runtimeUnitId:
                        "unit_1"
                };

                const targets = [

                    createTarget({

                        runtimeUnitId:
                            "unit_1",

                        remainingHp:
                            500
                    })
                ];

                const result =
                    selectTarget(
                        attacker,
                        targets
                    );

                expect(result)
                    .toBeNull();
            }
        );



        // ==================================================
        // DESTROYED TARGETS
        // ==================================================

        test(
            "ignores destroyed targets",
            () => {

                const attacker = {

                    runtimeUnitId:
                        "attacker_1"
                };

                const targets = [

                    createTarget({

                        runtimeUnitId:
                            "destroyed_target",

                        remainingHp:
                            0
                    }),

                    createTarget({

                        runtimeUnitId:
                            "alive_target",

                        remainingHp:
                            500
                    })
                ];

                const result =
                    selectTarget(
                        attacker,
                        targets
                    );

                expect(
                    result.runtimeUnitId
                ).toBe(
                    "alive_target"
                );
            }
        );



        // ==================================================
        // DETERMINISM
        // ==================================================

        test(
            "same input always produces same target",
            () => {

                const attacker = {

                    runtimeUnitId:
                        "attacker_1"
                };

                const targets = [

                    createTarget({

                        runtimeUnitId:
                            "target_1",

                        remainingHp:
                            500
                    }),

                    createTarget({

                        runtimeUnitId:
                            "target_2",

                        remainingHp:
                            500
                    })
                ];

                const resultA =
                    selectTarget(
                        attacker,
                        targets
                    );

                const resultB =
                    selectTarget(
                        attacker,
                        targets
                    );

                expect(
                    resultA
                ).toEqual(
                    resultB
                );
            }
        );



        // ==================================================
        // MASS BATTLE
        // ==================================================

        test(
            "handles massive target lists",
            () => {

                const attacker = {

                    runtimeUnitId:
                        "attacker_1"
                };

                const targets = [];

                for (
                    let i = 0;
                    i < 100000;
                    i++
                ) {

                    targets.push({

                        runtimeUnitId:
                            `target_${i}`,

                        remainingHp:
                            500
                    });
                }

                const result =
                    selectTarget(
                        attacker,
                        targets
                    );

                expect(result)
                    .toBeDefined();

                expect(
                    result.runtimeUnitId
                ).toBe(
                    "target_0"
                );
            }
        );



        // ==================================================
        // VALIDATION
        // ==================================================

        test(
            "returns null for invalid attacker",
            () => {

                const result =
                    selectTarget(
                        null,
                        []
                    );

                expect(result)
                    .toBeNull();
            }
        );


        test(
            "returns null for invalid targets",
            () => {

                const attacker = {

                    runtimeUnitId:
                        "attacker_1"
                };

                const result =
                    selectTarget(
                        attacker,
                        null
                    );

                expect(result)
                    .toBeNull();
            }
        );



        // ==================================================
        // FUTURE TARGETING SAFETY
        // ==================================================

        test(
            "returns null when no valid targets exist",
            () => {

                const attacker = {

                    runtimeUnitId:
                        "attacker_1"
                };

                const targets = [

                    createTarget({

                        runtimeUnitId:
                            "destroyed_1",

                        remainingHp:
                            0
                    }),

                    createTarget({

                        runtimeUnitId:
                            "destroyed_2",

                        remainingHp:
                            0
                    })
                ];

                const result =
                    selectTarget(
                        attacker,
                        targets
                    );

                expect(result)
                    .toBeNull();
            }
        );

    }
);