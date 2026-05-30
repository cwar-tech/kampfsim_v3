import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat resolver round runtime consistency",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_resolver_round_runtime_001",

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
                                "attacker_1",

                            unitTypeId:
                                "fighter",

                            hp: 500,

                            remainingUnits: 10,

                            hpLastUnit: 500,

                            damage: 300,

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
                                "defender_1",

                            unitTypeId:
                                "fighter",

                            hp: 500,

                            remainingUnits: 10,

                            hpLastUnit: 500,

                            damage: 300,

                            receivedDamage: 0
                        }

                    ]
                }
            });



        test(
            "all rounds contain roundRuntime",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                for (
                    const round
                    of result.rounds
                ) {

                    expect(
                        round.roundRuntime
                    ).toBeDefined();
                }
            }
        );


        test(
            "roundRuntime contains attackerDestroyedUnits",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                for (
                    const round
                    of result.rounds
                ) {

                    expect(
                        Array.isArray(
                            round
                                .roundRuntime
                                .attackerDestroyedUnits
                        )
                    ).toBe(true);
                }
            }
        );


        test(
            "roundRuntime contains defenderDestroyedUnits",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                for (
                    const round
                    of result.rounds
                ) {

                    expect(
                        Array.isArray(
                            round
                                .roundRuntime
                                .defenderDestroyedUnits
                        )
                    ).toBe(true);
                }
            }
        );


        test(
            "roundRuntime survives serialization",
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
                    replay.rounds
                ).toEqual(
                    result.rounds
                );
            }
        );


        test(
            "round runtime consistency remains deterministic",
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

    }
);