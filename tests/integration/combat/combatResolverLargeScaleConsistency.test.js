import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat resolver large scale consistency",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_resolver_large_scale_001",

                currentRound: 1,

                maxRounds: 5,

                combatFinished: false,

                attackerDefeated: false,

                defenderDefeated: false,

                attackerFleet: {

                    fleetId:
                        "fleet_attacker",

                    units: Array.from(
                        { length: 50 },
                        (_, index) => ({

                            runtimeUnitId:
                                `attacker_${index}`,

                            unitTypeId:
                                "fighter",

                            hp: 500,

                            remainingUnits: 20,

                            hpLastUnit: 500,

                            damage: 300,

                            receivedDamage: 0
                        })
                    )
                },

                defenderFleet: {

                    fleetId:
                        "fleet_defender",

                    units: Array.from(
                        { length: 50 },
                        (_, index) => ({

                            runtimeUnitId:
                                `defender_${index}`,

                            unitTypeId:
                                "fighter",

                            hp: 500,

                            remainingUnits: 20,

                            hpLastUnit: 500,

                            damage: 300,

                            receivedDamage: 0
                        })
                    )
                }
            });



        test(
            "large scale combat resolves successfully",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                ).toBeDefined();
            }
        );


        test(
            "large scale combat remains deterministic",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                const resultA =
                    resolveCombat(
                        runtimeA
                    );

                const resultB =
                    resolveCombat(
                        runtimeB
                    );

                expect(
                    resultA
                ).toEqual(
                    resultB
                );
            }
        );


        test(
            "large scale combat survives serialization",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const replay =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    replay
                ).toEqual(
                    result
                );
            }
        );


        test(
            "large scale combat remains replay safe",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    () =>
                        JSON.stringify(
                            result
                        )
                ).not.toThrow();
            }
        );


        test(
            "large scale combat never creates negative units",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const allUnits = [

                    ...result
                        .attackerFleet
                        .units,

                    ...result
                        .defenderFleet
                        .units
                ];

                for (
                    const unit
                    of allUnits
                ) {

                    expect(
                        unit.remainingUnits
                    ).toBeGreaterThanOrEqual(
                        0
                    );
                }
            }
        );

    }
);