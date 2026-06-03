import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

import buildCombatRuntime
    from "../../factories/buildCombatRuntime.js";



describe(
    "combat deep clone integrity",
    () => {

        test(
            "result is not same object as runtime",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                ).not.toBe(
                    runtime
                );
            }
        );



        test(
            "attacker fleet is deep cloned",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.attackerFleet
                ).not.toBe(
                    runtime.attackerFleet
                );
            }
        );



        test(
            "defender fleet is deep cloned",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.defenderFleet
                ).not.toBe(
                    runtime.defenderFleet
                );
            }
        );



        test(
            "attacker unit array is deep cloned",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                        .attackerFleet
                        .units
                ).not.toBe(

                    runtime
                        .attackerFleet
                        .units
                );
            }
        );



        test(
            "defender unit array is deep cloned",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                        .defenderFleet
                        .units
                ).not.toBe(

                    runtime
                        .defenderFleet
                        .units
                );
            }
        );



        test(
            "attacker units are deep cloned",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                for (
                    let i = 0;
                    i <
                    result
                        .attackerFleet
                        .units
                        .length;
                    i++
                ) {

                    expect(

                        result
                            .attackerFleet
                            .units[i]

                    ).not.toBe(

                        runtime
                            .attackerFleet
                            .units[i]
                    );
                }
            }
        );



        test(
            "defender units are deep cloned",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                for (
                    let i = 0;
                    i <
                    result
                        .defenderFleet
                        .units
                        .length;
                    i++
                ) {

                    expect(

                        result
                            .defenderFleet
                            .units[i]

                    ).not.toBe(

                        runtime
                            .defenderFleet
                            .units[i]
                    );
                }
            }
        );



        test(
            "mutating cloned attacker fleet does not affect runtime",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                result
                    .attackerFleet
                    .totalUnits = 0;

                expect(

                    runtime
                        .attackerFleet
                        .totalUnits

                ).not.toBe(
                    0
                );
            }
        );



        test(
            "mutating cloned defender fleet does not affect runtime",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                result
                    .defenderFleet
                    .totalUnits = 0;

                expect(

                    runtime
                        .defenderFleet
                        .totalUnits

                ).not.toBe(
                    0
                );
            }
        );



        test(
            "mutating cloned unit does not affect runtime unit",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                result
                    .attackerFleet
                    .units[0]
                    .remainingUnits = 0;

                expect(

                    runtime
                        .attackerFleet
                        .units[0]
                        .remainingUnits

                ).not.toBe(
                    0
                );
            }
        );



        test(
            "result remains serializable after cloning",
            () => {

                const result =
                    resolveCombat(
                        buildCombatRuntime()
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