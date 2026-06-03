import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";



describe(
    "combat lifecycle",
    () => {

        const createRuntime =
            (
                overrides = {}
            ) => ({

                combatId:
                    "combat_lifecycle_001",

                currentRound: 1,

                maxRounds: 5,

                combatFinished: false,

                attackerDefeated: false,

                defenderDefeated: false,

                attackerFleet: {

                    fleetId:
                        "fleet_attacker",

                    units: [

                        {
                            runtimeUnitId:
                                "attacker_fighter_1",

                            unitTypeId:
                                "fighter",

                            hp: 500,

                            hpLastUnit: 500,

                            remainingUnits: 10,

                            damage: 250,

                            receivedDamage: 0
                        }

                    ]
                },

                defenderFleet: {

                    fleetId:
                        "fleet_defender",

                    units: [

                        {
                            runtimeUnitId:
                                "defender_fighter_1",

                            unitTypeId:
                                "fighter",

                            hp: 500,

                            hpLastUnit: 500,

                            remainingUnits: 10,

                            damage: 250,

                            receivedDamage: 0
                        }

                    ]
                },

                ...overrides
            });



        test(
            "combat progresses through rounds",
            () => {

                const runtime =
                    createRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.currentRound
                ).toBeGreaterThanOrEqual(
                    1
                );

                expect(
                    result.currentRound
                ).toBeLessThanOrEqual(
                    result.maxRounds
                );
            }
        );



        test(
            "combat eventually finishes",
            () => {

                const runtime =
                    createRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.combatFinished
                ).toBe(true);
            }
        );



        test(
            "combat never exceeds max rounds",
            () => {

                const runtime =
                    createRuntime({
                        maxRounds: 3
                    });

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.currentRound
                ).toBeLessThanOrEqual(
                    3
                );
            }
        );



        test(
            "combat handles attacker destruction",
            () => {

                const runtime =
                    createRuntime({
                        attackerFleet: {

                            fleetId:
                                "fleet_attacker",

                            units: []
                        }
                    });

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.attackerDefeated
                ).toBe(true);

                expect(
                    result.combatFinished
                ).toBe(true);
            }
        );



        test(
            "combat handles defender destruction",
            () => {

                const runtime =
                    createRuntime({
                        defenderFleet: {

                            fleetId:
                                "fleet_defender",

                            units: []
                        }
                    });

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.defenderDefeated
                ).toBe(true);

                expect(
                    result.combatFinished
                ).toBe(true);
            }
        );



        test(
            "combat handles mutual destruction",
            () => {

                const runtime =
                    createRuntime({
                        attackerFleet: {
                            fleetId:
                                "fleet_attacker",

                            units: []
                        },

                        defenderFleet: {
                            fleetId:
                                "fleet_defender",

                            units: []
                        }
                    });

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.attackerDefeated
                ).toBe(true);

                expect(
                    result.defenderDefeated
                ).toBe(true);

                expect(
                    result.combatFinished
                ).toBe(true);
            }
        );



        test(
            "combat preserves combat id",
            () => {

                const runtime =
                    createRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.combatId
                ).toBe(
                    runtime.combatId
                );
            }
        );



        test(
            "combat never revives destroyed fleets",
            () => {

                const runtime =
                    createRuntime({
                        attackerFleet: {

                            fleetId:
                                "fleet_attacker",

                            units: []
                        }
                    });

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.attackerFleet.units
                        .length
                ).toBe(0);
            }
        );



        test(
            "combat runtime remains serializable",
            () => {

                const runtime =
                    createRuntime();

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
            "combat runtime remains deterministic",
            () => {

                const runtimeA =
                    createRuntime();

                const runtimeB =
                    createRuntime();

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

    }
);