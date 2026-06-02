import buildUnitRuntime
    from "../../../app/combat/runtime/buildUnitRuntime.js";

describe(
    "buildUnitRuntime",
    () => {

        // ==================================================
        // BASIC RUNTIME
        // ==================================================

        test(
            "builds runtime correctly from template",
            () => {

                const runtime =
                    buildUnitRuntime({

                        runtimeUnitId:
                            "unit_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 10,

                        modifiers: []
                    });

                expect(
                    runtime.runtimeUnitId
                ).toBe("unit_1");

                expect(
                    runtime.shipTemplateId
                ).toBe("fighter");

                expect(
                    runtime.unitTypeId
                ).toBe("fighter");

                expect(
                    runtime.unitCount
                ).toBe(10);

                expect(
                    runtime.remainingUnits
                ).toBe(10);

                expect(
                    runtime.hpPerUnit
                ).toBe(500);

                expect(
                    runtime.dmgPerUnit
                ).toBe(300);

                expect(
                    runtime.armorPerUnit
                ).toBe(50);

                expect(
                    runtime.speedPerUnit
                ).toBe(120);

                expect(
                    runtime.penetrationPerUnit
                ).toBe(20);

                expect(
                    runtime.totalHp
                ).toBe(5000);

                expect(
                    runtime.remainingHp
                ).toBe(5000);

                expect(
                    runtime.totalDamage
                ).toBe(3000);

                expect(
                    runtime.destroyed
                ).toBe(false);
            }
        );

        // ==================================================
        // MASS BATTLE
        // ==================================================

        test(
            "handles massive unit counts correctly",
            () => {

                const runtime =
                    buildUnitRuntime({

                        runtimeUnitId:
                            "mass_unit",

                        shipTemplateId:
                            "fighter",

                        unitCount:
                            100000,

                        modifiers: []
                    });

                expect(
                    runtime.totalHp
                ).toBe(
                    50000000
                );

                expect(
                    runtime.totalDamage
                ).toBe(
                    30000000
                );

                expect(
                    runtime.remainingUnits
                ).toBe(
                    100000
                );
            }
        );



        // ==================================================
        // SPAWN INVARIANTS
        // ==================================================

        test(
            "remainingHp equals totalHp on spawn",
            () => {

                const runtime =
                    buildUnitRuntime({

                        runtimeUnitId:
                            "unit_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 10,

                        modifiers: []
                    });

                expect(
                    runtime.remainingHp
                ).toBe(
                    runtime.totalHp
                );
            }
        );


        test(
            "remainingUnits equals unitCount on spawn",
            () => {

                const runtime =
                    buildUnitRuntime({

                        runtimeUnitId:
                            "unit_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 10,

                        modifiers: []
                    });

                expect(
                    runtime.remainingUnits
                ).toBe(
                    runtime.unitCount
                );
            }
        );


        test(
            "spawned units are never destroyed",
            () => {

                const runtime =
                    buildUnitRuntime({

                        runtimeUnitId:
                            "unit_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 10,

                        modifiers: []
                    });

                expect(
                    runtime.destroyed
                ).toBe(false);
            }
        );



        // ==================================================
        // NaN / INFINITY SAFETY
        // ==================================================

        test(
            "never creates NaN values",
            () => {

                const runtime =
                    buildUnitRuntime({

                        runtimeUnitId:
                            "unit_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 10,

                        modifiers: []
                    });

                for (
                    const value
                    of Object.values(
                        runtime
                    )
                ) {

                    if (
                        typeof value ===
                        "number"
                    ) {

                        expect(
                            Number.isNaN(
                                value
                            )
                        ).toBe(false);
                    }
                }
            }
        );


        test(
            "never creates Infinity values",
            () => {

                const runtime =
                    buildUnitRuntime({

                        runtimeUnitId:
                            "unit_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 10,

                        modifiers: []
                    });

                for (
                    const value
                    of Object.values(
                        runtime
                    )
                ) {

                    if (
                        typeof value ===
                        "number"
                    ) {

                        expect(
                            Number.isFinite(
                                value
                            )
                        ).toBe(true);
                    }
                }
            }
        );



        // ==================================================
        // IMMUTABILITY
        // ==================================================

        test(
            "damageMultipliers are deeply cloned",
            () => {

                const runtimeA =
                    buildUnitRuntime({

                        runtimeUnitId:
                            "unit_a",

                        shipTemplateId:
                            "fighter",

                        unitCount: 10,

                        modifiers: []
                    });

                const runtimeB =
                    buildUnitRuntime({

                        runtimeUnitId:
                            "unit_b",

                        shipTemplateId:
                            "fighter",

                        unitCount: 10,

                        modifiers: []
                    });

                runtimeA
                    .damageMultipliers
                    .push({

                        type:
                            "laser",

                        multiplier:
                            999
                    });

                expect(
                    runtimeB
                        .damageMultipliers
                        .length
                ).toBe(0);
            }
        );



        // ==================================================
        // MODIFIER SAFETY
        // ==================================================

        test(
            "handles malformed modifiers safely",
            () => {

                const runtime =
                    buildUnitRuntime({

                        runtimeUnitId:
                            "unit_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 10,

                        modifiers: [

                            null,
                            undefined,
                            {},
                            "invalid"
                        ]
                    });

                expect(runtime)
                    .toBeDefined();
            }
        );

        // ==================================================
        // MODIFIERS
        // ==================================================

        test(
            "applies modifiers correctly",
            () => {

                const runtime =
                    buildUnitRuntime({

                        runtimeUnitId:
                            "unit_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 10,

                        modifiers: [

                            {
                                stat: "hp",
                                multiplier: 1.2
                            },

                            {
                                stat: "damage",
                                multiplier: 1.5
                            }
                        ]
                    });

                expect(
                    runtime.hpPerUnit
                ).toBe(600);

                expect(
                    runtime.dmgPerUnit
                ).toBe(450);

                expect(
                    runtime.totalHp
                ).toBe(6000);

                expect(
                    runtime.totalDamage
                ).toBe(4500);
            }
        );



        // ==================================================
        // TEMPLATE FIELDS
        // ==================================================

        test(
            "copies template metadata correctly",
            () => {

                const runtime =
                    buildUnitRuntime({

                        runtimeUnitId:
                            "unit_1",

                        shipTemplateId:
                            "destroyer",

                        unitCount: 5,

                        modifiers: []
                    });

                expect(
                    runtime.type
                ).toBe("ship");

                expect(
                    runtime.volumePerUnit
                ).toBe(25);

                expect(
                    runtime.repairDuration
                ).toBe(300);

                expect(
                    runtime.damageMultipliers
                ).toEqual([]);
            }
        );



        // ==================================================
        // VALIDATION
        // ==================================================

        test(
            "returns null for invalid runtimeUnitId",
            () => {

                const runtime =
                    buildUnitRuntime({

                        runtimeUnitId:
                            null,

                        shipTemplateId:
                            "fighter",

                        unitCount: 10,

                        modifiers: []
                    });

                expect(runtime)
                    .toBeNull();
            }
        );


        test(
            "returns null for invalid shipTemplateId",
            () => {

                const runtime =
                    buildUnitRuntime({

                        runtimeUnitId:
                            "unit_1",

                        shipTemplateId:
                            null,

                        unitCount: 10,

                        modifiers: []
                    });

                expect(runtime)
                    .toBeNull();
            }
        );


        test(
            "returns null for unknown template",
            () => {

                const runtime =
                    buildUnitRuntime({

                        runtimeUnitId:
                            "unit_1",

                        shipTemplateId:
                            "unknown_template",

                        unitCount: 10,

                        modifiers: []
                    });

                expect(runtime)
                    .toBeNull();
            }
        );


        test(
            "returns null for invalid unitCount",
            () => {

                const runtime =
                    buildUnitRuntime({

                        runtimeUnitId:
                            "unit_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 0,

                        modifiers: []
                    });

                expect(runtime)
                    .toBeNull();
            }
        );



        // ==================================================
        // DETERMINISM
        // ==================================================

        test(
            "same input always produces same runtime",
            () => {

                const input = {

                    runtimeUnitId:
                        "unit_1",

                    shipTemplateId:
                        "fighter",

                    unitCount: 10,

                    modifiers: [

                        {
                            stat: "hp",
                            multiplier: 1.2
                        }
                    ]
                };

                const runtimeA =
                    buildUnitRuntime(
                        input
                    );

                const runtimeB =
                    buildUnitRuntime(
                        input
                    );

                expect(
                    runtimeA
                ).toEqual(
                    runtimeB
                );
            }
        );

    }
);