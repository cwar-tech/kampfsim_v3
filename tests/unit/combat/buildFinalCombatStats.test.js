import buildFinalCombatStats
    from "../../../app/combat/stats/buildFinalCombatStats.js";

describe(
    "buildFinalCombatStats",
    () => {

        // ==================================================
        // BASE STATS
        // ==================================================

        test(
            "builds base combat stats correctly",
            () => {

                const result =
                    buildFinalCombatStats({

                        baseStats: {

                            hp: 500,
                            damage: 100,
                            armor: 50
                        },

                        modifiers: []
                    });

                expect(
                    result
                ).toEqual({

                    hpPerUnit: 500,
                    dmgPerUnit: 100,
                    armorPerUnit: 50
                });
            }
        );



        // ==================================================
        // HP MODIFIERS
        // ==================================================

        test(
            "applies hp modifiers correctly",
            () => {

                const result =
                    buildFinalCombatStats({

                        baseStats: {

                            hp: 500
                        },

                        modifiers: [

                            {
                                stat: "hp",
                                multiplier: 1.2
                            }
                        ]
                    });

                expect(
                    result.hpPerUnit
                ).toBe(600);
            }
        );



        // ==================================================
        // DAMAGE MODIFIERS
        // ==================================================

        test(
            "applies multiple modifiers correctly",
            () => {

                const result =
                    buildFinalCombatStats({

                        baseStats: {

                            hp: 500,
                            damage: 100
                        },

                        modifiers: [

                            {
                                stat: "hp",
                                multiplier: 1.2
                            },

                            {
                                stat: "hp",
                                multiplier: 1.1
                            },

                            {
                                stat: "damage",
                                multiplier: 1.5
                            }
                        ]
                    });

                expect(
                    result.hpPerUnit
                ).toBe(660);

                expect(
                    result.dmgPerUnit
                ).toBe(150);
            }
        );



        // ==================================================
        // ARMOR MODIFIERS
        // ==================================================

        test(
            "applies armor modifiers correctly",
            () => {

                const result =
                    buildFinalCombatStats({

                        baseStats: {

                            armor: 100
                        },

                        modifiers: [

                            {
                                stat: "armor",
                                multiplier: 1.5
                            }
                        ]
                    });

                expect(
                    result.armorPerUnit
                ).toBe(150);
            }
        );



        // ==================================================
        // SAFETY
        // ==================================================

        test(
            "ignores malformed modifiers safely",
            () => {

                const result =
                    buildFinalCombatStats({

                        baseStats: {

                            hp: 500
                        },

                        modifiers: [

                            null,
                            undefined,
                            {},
                            {
                                stat: "hp"
                            }
                        ]
                    });

                expect(
                    result.hpPerUnit
                ).toBe(500);
            }
        );


        test(
            "ignores unknown stats safely",
            () => {

                const result =
                    buildFinalCombatStats({

                        baseStats: {

                            hp: 500
                        },

                        modifiers: [

                            {
                                stat: "unknownStat",
                                multiplier: 999
                            }
                        ]
                    });

                expect(
                    result.hpPerUnit
                ).toBe(500);
            }
        );


        test(
            "returns null for invalid baseStats",
            () => {

                const result =
                    buildFinalCombatStats({

                        baseStats: null,
                        modifiers: []
                    });

                expect(result)
                    .toBeNull();
            }
        );



        // ==================================================
        // ROUNDING
        // ==================================================

        test(
            "rounds final values correctly",
            () => {

                const result =
                    buildFinalCombatStats({

                        baseStats: {

                            hp: 333
                        },

                        modifiers: [

                            {
                                stat: "hp",
                                multiplier: 1.15
                            }
                        ]
                    });

                expect(
                    result.hpPerUnit
                ).toBe(383);
            }
        );



        // ==================================================
        // DETERMINISM
        // ==================================================

        test(
            "same input always produces same output",
            () => {

                const input = {

                    baseStats: {

                        hp: 500,
                        damage: 100
                    },

                    modifiers: [

                        {
                            stat: "hp",
                            multiplier: 1.2
                        }
                    ]
                };

                const resultA =
                    buildFinalCombatStats(
                        input
                    );

                const resultB =
                    buildFinalCombatStats(
                        input
                    );

                expect(
                    resultA
                ).toEqual(
                    resultB
                );
            }
        );


        test(
            "modifier order stays deterministic",
            () => {

                const modifiers = [

                    {
                        stat: "hp",
                        multiplier: 1.1
                    },

                    {
                        stat: "hp",
                        multiplier: 1.2
                    }
                ];

                const resultA =
                    buildFinalCombatStats({

                        baseStats: {
                            hp: 100
                        },

                        modifiers
                    });

                const resultB =
                    buildFinalCombatStats({

                        baseStats: {
                            hp: 100
                        },

                        modifiers
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
