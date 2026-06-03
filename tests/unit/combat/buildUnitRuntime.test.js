import buildUnitRuntime
    from "../../../app/combat/runtime/buildUnitRuntime.js";

describe(
    "buildUnitRuntime",
    () => {

        // ==================================================
        // BASIC RUNTIME
        // ==================================================

        test(
            "builds runtime correctly",
            () => {

                const runtime =
                    buildUnitRuntime({

                        runtimeUnitId:
                            "unit_1",

                        shipTemplateId:
                            "fighter_mk1",

                        unitCount: 10,

                        hpPerUnit:
                            500,

                        dmgPerUnit:
                            100,

                        armorMultiplier:
                            0.25,

                        penetrationMultiplier:
                            1.5,

                        speed:
                            120,

                        modifiers: []
                    });

                expect(
                    runtime.runtimeUnitId
                ).toBe("unit_1");

                expect(
                    runtime.shipTemplateId
                ).toBe("fighter_mk1");

                expect(
                    runtime.unitCount
                ).toBe(10);

                expect(
                    runtime.hpPerUnit
                ).toBe(500);

                expect(
                    runtime.dmgPerUnit
                ).toBe(100);

                expect(
                    runtime.armorMultiplier
                ).toBe(0.25);

                expect(
                    runtime.penetrationMultiplier
                ).toBe(1.5);

                expect(
                    runtime.speed
                ).toBe(120);

                expect(
                    runtime.totalHp
                ).toBe(5000);

                expect(
                    runtime.totalDamage
                ).toBe(1000);

                expect(
                    runtime.remainingHp
                ).toBe(5000);

                expect(
                    runtime.remainingUnits
                ).toBe(10);

                expect(
                    runtime.destroyed
                ).toBe(false);

                expect(
                    runtime.receivedDamage
                ).toBe(0);
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
                            "fighter_mk1",

                        unitCount:
                            100000,

                        hpPerUnit:
                            500,

                        dmgPerUnit:
                            100,

                        armorMultiplier:
                            1,

                        penetrationMultiplier:
                            1,

                        speed:
                            100,

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
                    10000000
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
                            "fighter_mk1",

                        unitCount: 10,

                        hpPerUnit:
                            500,

                        dmgPerUnit:
                            100,

                        armorMultiplier:
                            1,

                        penetrationMultiplier:
                            1,

                        speed:
                            100
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
                            "fighter_mk1",

                        unitCount: 10,

                        hpPerUnit:
                            500,

                        dmgPerUnit:
                            100,

                        armorMultiplier:
                            1,

                        penetrationMultiplier:
                            1,

                        speed:
                            100
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
                            "fighter_mk1",

                        unitCount: 10,

                        hpPerUnit:
                            500,

                        dmgPerUnit:
                            100,

                        armorMultiplier:
                            1,

                        penetrationMultiplier:
                            1,

                        speed:
                            100
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
                            "fighter_mk1",

                        unitCount: 10,

                        hpPerUnit:
                            500,

                        dmgPerUnit:
                            100,

                        armorMultiplier:
                            1,

                        penetrationMultiplier:
                            1,

                        speed:
                            100
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
                            "fighter_mk1",

                        unitCount: 10,

                        hpPerUnit:
                            500,

                        dmgPerUnit:
                            100,

                        armorMultiplier:
                            1,

                        penetrationMultiplier:
                            1,

                        speed:
                            100
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
                            "fighter_mk1",

                        unitCount: 10,

                        hpPerUnit:
                            500,

                        dmgPerUnit:
                            100,

                        armorMultiplier:
                            1,

                        penetrationMultiplier:
                            1,

                        speed:
                            100,

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
                            "fighter_mk1",

                        unitCount: 10,

                        hpPerUnit:
                            500,

                        dmgPerUnit:
                            100
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

                        hpPerUnit:
                            500,

                        dmgPerUnit:
                            100
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
                            "fighter_mk1",

                        unitCount: 0,

                        hpPerUnit:
                            500,

                        dmgPerUnit:
                            100
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
                        "fighter_mk1",

                    unitCount: 10,

                    hpPerUnit:
                        500,

                    dmgPerUnit:
                        100,

                    armorMultiplier:
                        1,

                    penetrationMultiplier:
                        1,

                    speed:
                        100,

                    modifiers: []
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