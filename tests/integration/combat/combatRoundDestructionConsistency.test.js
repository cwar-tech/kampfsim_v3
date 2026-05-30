import resolveRound
    from "../../../app/combat/resolver/resolveRound.js";

describe(
    "combat round destruction consistency",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_round_destruction_001",

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

                            remainingUnits: 4,

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

                            remainingUnits: 15,

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

                expect(
                    result
                        .roundRuntime
                        .defenderDestroyedUnits
                        .length
                ).toBeGreaterThan(0);
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

                const destroyedIds =
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
                                destroyedIds.includes(
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

                const destroyedIds =
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
                                destroyedIds.includes(
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
            "living units are never marked destroyed",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                const destroyedIds =
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
                        destroyedIds.includes(
                            unit.runtimeUnitId
                        )
                    ).toBe(false);
                }
            }
        );


        test(
            "destruction tracking remains deterministic",
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
                    resultA.roundRuntime
                ).toEqual(
                    resultB.roundRuntime
                );
            }
        );


        test(
            "destruction tracking survives serialization",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    restored.roundRuntime
                ).toEqual(
                    result.roundRuntime
                );
            }
        );


        test(
            "destroyed ids always exist in runtime",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

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
                    of result
                        .roundRuntime
                        .defenderDestroyedUnits
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
            "destruction never creates negative values",
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
            "destruction tracking remains replay safe",
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

    }
);