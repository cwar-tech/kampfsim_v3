import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

import buildCombatRuntime
    from "../../factories/buildCombatRuntime.js";



describe(
    "combat persistence",
    () => {

        test(
            "combat result survives save and load cycle",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const savedState =
                    JSON.stringify(
                        result
                    );

                const loadedState =
                    JSON.parse(
                        savedState
                    );

                expect(
                    loadedState
                ).toEqual(
                    result
                );
            }
        );



        test(
            "combat state remains json safe",
            () => {

                const runtime =
                    buildCombatRuntime();

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
            "attacker fleet survives persistence",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        JSON.stringify(

                            result
                                .attackerFleet
                        )
                    );

                expect(
                    restored
                ).toEqual(

                    result
                        .attackerFleet
                );
            }
        );



        test(
            "defender fleet survives persistence",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        JSON.stringify(

                            result
                                .defenderFleet
                        )
                    );

                expect(
                    restored
                ).toEqual(

                    result
                        .defenderFleet
                );
            }
        );



        test(
            "runtime unit ids survive persistence",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                const allUnits = [

                    ...restored
                        .attackerFleet
                        .units,

                    ...restored
                        .defenderFleet
                        .units
                ];

                for (
                    const unit
                    of allUnits
                ) {

                    expect(
                        typeof unit
                            .runtimeUnitId
                    ).toBe(
                        "string"
                    );

                    expect(
                        unit
                            .runtimeUnitId
                            .length
                    ).toBeGreaterThan(
                        0
                    );
                }
            }
        );



        test(
            "fleet ids survive persistence",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    restored
                        .attackerFleet
                        .fleetId
                ).toBe(

                    result
                        .attackerFleet
                        .fleetId
                );

                expect(
                    restored
                        .defenderFleet
                        .fleetId
                ).toBe(

                    result
                        .defenderFleet
                        .fleetId
                );
            }
        );



        test(
            "combat id survives persistence",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    restored.combatId
                ).toBe(
                    result.combatId
                );
            }
        );



        test(
            "combat outcome survives persistence",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet: {

                            ...buildCombatRuntime()
                                .attackerFleet,

                            totalDamage:
                                999999999
                        }
                    });

                const result =
                    resolveCombat(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    restored
                        .combatFinished
                ).toBe(
                    result
                        .combatFinished
                );

                expect(
                    restored
                        .attackerDefeated
                ).toBe(
                    result
                        .attackerDefeated
                );

                expect(
                    restored
                        .defenderDefeated
                ).toBe(
                    result
                        .defenderDefeated
                );
            }
        );



        test(
            "loaded combat remains immutable to original",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                restored.currentRound =
                    999;

                expect(
                    result.currentRound
                ).not.toBe(
                    999
                );
            }
        );



        test(
            "persisted combat structure remains valid",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    restored
                ).toHaveProperty(
                    "attackerFleet"
                );

                expect(
                    restored
                ).toHaveProperty(
                    "defenderFleet"
                );

                expect(
                    restored
                ).toHaveProperty(
                    "combatFinished"
                );
            }
        );

    }
);