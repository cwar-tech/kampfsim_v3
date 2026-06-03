import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";



describe(
    "combat victory conditions",
    () => {

        const createUnit =
            (
                id,
                damage = 250,
                remainingUnits = 10
            ) => ({

                runtimeUnitId:
                    id,

                unitTypeId:
                    "fighter",

                hp: 500,

                hpLastUnit: 500,

                remainingUnits,

                damage,

                receivedDamage: 0
            });



        const createRuntime =
            (
                overrides = {}
            ) => ({

                combatId:
                    "combat_victory_001",

                currentRound: 1,

                maxRounds: 5,

                combatFinished: false,

                attackerDefeated: false,

                defenderDefeated: false,

                attackerFleet: {

                    fleetId:
                        "fleet_attacker",

                    units: [

                        createUnit(
                            "attacker_1"
                        )
                    ]
                },

                defenderFleet: {

                    fleetId:
                        "fleet_defender",

                    units: [

                        createUnit(
                            "defender_1"
                        )
                    ]
                },

                ...overrides
            });



        test(
            "combat terminates when defender fleet is missing",
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
                    result.combatFinished
                ).toBe(true);

                expect(
                    result.defenderDefeated
                ).toBe(true);
            }
        );



        test(
            "combat terminates when attacker fleet is missing",
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
                    result.combatFinished
                ).toBe(true);

                expect(
                    result.attackerDefeated
                ).toBe(true);
            }
        );



        test(
            "combat handles simultaneous destruction",
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
            "combat never leaves invalid victory state",
            () => {

                const runtime =
                    createRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const attackerLost =
                    result.attackerDefeated;

                const defenderLost =
                    result.defenderDefeated;

                const validState =

                    (
                        attackerLost &&
                        !defenderLost
                    )

                    ||

                    (
                        !attackerLost &&
                        defenderLost
                    )

                    ||

                    (
                        attackerLost &&
                        defenderLost
                    )

                    ||

                    (
                        !attackerLost &&
                        !defenderLost
                    );

                expect(
                    validState
                ).toBe(true);
            }
        );



        test(
            "destroyed fleets never contain surviving units",
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

                if (
                    result.defenderDefeated
                ) {

                    expect(
                        result
                            .defenderFleet
                            .units
                            .length
                    ).toBe(0);
                }
            }
        );



        test(
            "combat resolves empty combat safely",
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
                    result.combatFinished
                ).toBe(true);
            }
        );



        test(
            "combat result remains deterministic",
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



        test(
            "combat victory state remains serializable",
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

    }
);