import resolveRound
    from "../../../app/combat/resolver/resolveRound.js";

describe(
    "combat round loss calculation consistency",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_round_losses_001",

                currentRound: 1,

                maxRounds: 10,

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
                                "destroyer",

                            hp: 2500,

                            remainingUnits: 5,

                            hpLastUnit: 2500,

                            damage: 999999,

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

                            remainingUnits: 20,

                            hpLastUnit: 500,

                            damage: 300,

                            receivedDamage: 0
                        }

                    ]
                }
            });



        test(
            "destroyed units are tracked",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                const destroyed =
                    result
                        .roundRuntime
                        .defenderDestroyedUnits;

                expect(
                    destroyed.length
                ).toBeGreaterThan(0);
            }
        );


        test(
            "destroyed units remain deterministic",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                const resultA =
                    resolveRound(
                        runtimeA
                    );

                const resultB =
                    resolveRound(
                        runtimeB
                    );

                expect(
                    resultA
                        .roundRuntime
                ).toEqual(
                    resultB
                        .roundRuntime
                );
            }
        );


        test(
            "loss calculation survives serialization",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
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
                        .roundRuntime
                ).toEqual(
                    result
                        .roundRuntime
                );
            }
        );


        test(
            "destroyed units always exist in runtime",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                const destroyed =
                    result
                        .roundRuntime
                        .defenderDestroyedUnits;

                const runtimeIds =
                    result
                        .combatRuntime
                        .defenderFleet
                        .units
                        .map(
                            (unit) =>
                                unit.runtimeUnitId
                        );

                for (
                    const id
                    of destroyed
                ) {

                    expect(
                        runtimeIds.includes(
                            id
                        )
                    ).toBe(true);
                }
            }
        );


        test(
            "destroyed units have zero remainingUnits",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                const destroyed =
                    result
                        .roundRuntime
                        .defenderDestroyedUnits;

                const destroyedUnits =
                    result
                        .combatRuntime
                        .defenderFleet
                        .units
                        .filter(
                            (unit) =>
                                destroyed.includes(
                                    unit.runtimeUnitId
                                )
                        );

                for (
                    const unit
                    of destroyedUnits
                ) {

                    expect(
                        unit.remainingUnits
                    ).toBe(0);
                }
            }
        );


        test(
            "destroyed units have zero hp",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                const destroyed =
                    result
                        .roundRuntime
                        .defenderDestroyedUnits;

                const destroyedUnits =
                    result
                        .combatRuntime
                        .defenderFleet
                        .units
                        .filter(
                            (unit) =>
                                destroyed.includes(
                                    unit.runtimeUnitId
                                )
                        );

                for (
                    const unit
                    of destroyedUnits
                ) {

                    expect(
                        unit.hpLastUnit
                    ).toBe(0);
                }
            }
        );


        test(
            "living units are not tracked as destroyed",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                const destroyed =
                    result
                        .roundRuntime
                        .defenderDestroyedUnits;

                const livingUnits =
                    result
                        .combatRuntime
                        .defenderFleet
                        .units
                        .filter(
                            (unit) =>
                                unit.remainingUnits > 0
                        );

                for (
                    const unit
                    of livingUnits
                ) {

                    expect(
                        destroyed.includes(
                            unit.runtimeUnitId
                        )
                    ).toBe(false);
                }
            }
        );


        test(
            "loss calculation never creates negative values",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                const allUnits = [

                    ...result
                        .combatRuntime
                        .attackerFleet
                        .units,

                    ...result
                        .combatRuntime
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

                    expect(
                        unit.hpLastUnit
                    ).toBeGreaterThanOrEqual(
                        0
                    );
                }
            }
        );


        test(
            "loss calculation remains replay safe",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
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
            "attacker destroyed units array always exists",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                expect(
                    Array.isArray(
                        result
                            .roundRuntime
                            .attackerDestroyedUnits
                    )
                ).toBe(true);
            }
        );


        test(
            "defender destroyed units array always exists",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                expect(
                    Array.isArray(
                        result
                            .roundRuntime
                            .defenderDestroyedUnits
                    )
                ).toBe(true);
            }
        );


        test(
            "destroyed units never contain duplicates",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                const destroyed =
                    result
                        .roundRuntime
                        .defenderDestroyedUnits;

                const unique =
                    new Set(
                        destroyed
                    );

                expect(
                    unique.size
                ).toBe(
                    destroyed.length
                );
            }
        );


        test(
            "destroyed units are strings",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                const destroyed =
                    result
                        .roundRuntime
                        .defenderDestroyedUnits;

                for (
                    const id
                    of destroyed
                ) {

                    expect(
                        typeof id
                    ).toBe(
                        "string"
                    );
                }
            }
        );


        test(
            "destroyed units tracking remains deterministic",
            () => {

                const resultA =
                    resolveRound(
                        createCombatRuntime()
                    );

                const resultB =
                    resolveRound(
                        createCombatRuntime()
                    );

                expect(
                    resultA
                        .roundRuntime
                        .defenderDestroyedUnits
                ).toEqual(
                    resultB
                        .roundRuntime
                        .defenderDestroyedUnits
                );
            }
        );

    }
);