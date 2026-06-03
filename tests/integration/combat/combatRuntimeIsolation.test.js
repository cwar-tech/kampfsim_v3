import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

import buildCombatRuntime
    from "../../factories/buildCombatRuntime.js";



describe(
    "combat runtime isolation",
    () => {

        test(
            "combat A does not mutate combat B runtime",
            () => {

                const runtimeA =
                    buildCombatRuntime();

                const runtimeB =
                    buildCombatRuntime();

                const originalB =
                    JSON.parse(
                        JSON.stringify(
                            runtimeB
                        )
                    );

                resolveCombat(
                    runtimeA
                );

                expect(
                    runtimeB
                ).toEqual(
                    originalB
                );
            }
        );



        test(
            "combat A result does not affect combat B result",
            () => {

                const resultA =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                const resultB =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                resultA
                    .attackerFleet
                    .totalHp = 0;

                expect(
                    resultB
                        .attackerFleet
                        .totalHp
                ).not.toBe(
                    0
                );
            }
        );



        test(
            "attacker fleets remain isolated between combats",
            () => {

                const resultA =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                const resultB =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                resultA
                    .attackerFleet
                    .units[0]
                    .remainingUnits = 0;

                expect(

                    resultB
                        .attackerFleet
                        .units[0]
                        .remainingUnits

                ).not.toBe(
                    0
                );
            }
        );



        test(
            "defender fleets remain isolated between combats",
            () => {

                const resultA =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                const resultB =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                resultA
                    .defenderFleet
                    .units[0]
                    .remainingUnits = 0;

                expect(

                    resultB
                        .defenderFleet
                        .units[0]
                        .remainingUnits

                ).not.toBe(
                    0
                );
            }
        );



        test(
            "combat execution order does not matter",
            () => {

                const runtimeA =
                    buildCombatRuntime();

                const runtimeB =
                    buildCombatRuntime();

                const resultA =
                    resolveCombat(
                        runtimeA
                    );

                const resultB =
                    resolveCombat(
                        runtimeB
                    );

                const sanitize =
                    (
                        result
                    ) => ({

                        ...result,

                        roundEvents: [],

                        attackerFleet: {

                            ...result.attackerFleet,

                            units:

                                result
                                    .attackerFleet
                                    .units
                                    .map(

                                        ({
                                            runtimeUnitId,
                                            ...unit
                                        }) => unit
                                    )
                        },

                        defenderFleet: {

                            ...result.defenderFleet,

                            units:

                                result
                                    .defenderFleet
                                    .units
                                    .map(

                                        ({
                                            runtimeUnitId,
                                            ...unit
                                        }) => unit
                                    )
                        }
                    });

                expect(
                    sanitize(
                        resultA
                    )
                ).toEqual(

                    sanitize(
                        resultB
                    )
                );
            }
        );



        test(
            "repeated combat executions remain isolated",
            () => {

                const results =
                    [];

                for (
                    let i = 0;
                    i < 10;
                    i++
                ) {

                    results.push(

                        resolveCombat(
                            buildCombatRuntime()
                        )
                    );
                }

                results[0]
                    .attackerFleet
                    .totalHp = 0;

                for (
                    let i = 1;
                    i < results.length;
                    i++
                ) {

                    expect(
                        results[i]
                            .attackerFleet
                            .totalHp
                    ).not.toBe(
                        0
                    );
                }
            }
        );



        test(
            "runtime ids remain unique across combats",
            () => {

                const resultA =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                const resultB =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                const ids =
                    new Set();

                const allUnits = [

                    ...resultA
                        .attackerFleet
                        .units,

                    ...resultA
                        .defenderFleet
                        .units,

                    ...resultB
                        .attackerFleet
                        .units,

                    ...resultB
                        .defenderFleet
                        .units
                ];

                for (
                    const unit
                    of allUnits
                ) {

                    expect(
                        ids.has(
                            unit.runtimeUnitId
                        )
                    ).toBe(false);

                    ids.add(
                        unit.runtimeUnitId
                    );
                }
            }
        );



        test(
            "serialization of one combat does not affect another",
            () => {

                const resultA =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                const resultB =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                JSON.stringify(
                    resultA
                );

                expect(
                    () =>
                        JSON.stringify(
                            resultB
                        )
                ).not.toThrow();
            }
        );



        test(
            "combat results remain independently mutable",
            () => {

                const resultA =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                const resultB =
                    resolveCombat(
                        buildCombatRuntime()
                    );

                resultA
                    .combatFinished = false;

                expect(
                    resultB
                        .combatFinished
                ).not.toBe(
                    false
                );
            }
        );



        test(
            "combat runtimes remain independently serializable",
            () => {

                const runtimeA =
                    buildCombatRuntime();

                const runtimeB =
                    buildCombatRuntime();

                expect(
                    () =>
                        JSON.stringify(
                            runtimeA
                        )
                ).not.toThrow();

                expect(
                    () =>
                        JSON.stringify(
                            runtimeB
                        )
                ).not.toThrow();
            }
        );

    }
);