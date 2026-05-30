import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat resolver performance baseline",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_resolver_performance_001",

                currentRound: 1,

                maxRounds: 10,

                combatFinished: false,

                attackerDefeated: false,

                defenderDefeated: false,

                attackerFleet: {

                    fleetId:
                        "fleet_attacker",

                    units: Array.from(
                        { length: 100 },
                        (_, index) => ({

                            runtimeUnitId:
                                `attacker_${index}`,

                            unitTypeId:
                                "fighter",

                            hp: 500,

                            remainingUnits: 50,

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
                        { length: 100 },
                        (_, index) => ({

                            runtimeUnitId:
                                `defender_${index}`,

                            unitTypeId:
                                "fighter",

                            hp: 500,

                            remainingUnits: 50,

                            hpLastUnit: 500,

                            damage: 300,

                            receivedDamage: 0
                        })
                    )
                }
            });



        test(
            "combat resolves within acceptable time",
            () => {

                const runtime =
                    createCombatRuntime();

                const start =
                    performance.now();

                resolveCombat(
                    runtime
                );

                const end =
                    performance.now();

                expect(
                    end - start
                ).toBeLessThan(
                    5000
                );
            }
        );


        test(
            "performance result remains deterministic",
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
            "performance result survives serialization",
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
            "performance baseline remains replay safe",
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
            "performance baseline never creates negative units",
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