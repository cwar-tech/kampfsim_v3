import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

import buildCombatRuntime
    from "../../factories/buildCombatRuntime.js";



describe(
    "combat mutation safety",
    () => {

        test(
            "resolveCombat does not mutate original runtime",
            () => {

                const runtime =
                    buildCombatRuntime();

                const original =
                    JSON.parse(
                        JSON.stringify(
                            runtime
                        )
                    );

                resolveCombat(
                    runtime
                );

                expect(
                    runtime
                ).toEqual(
                    original
                );
            }
        );



        test(
            "result attacker fleet is not same reference",
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
            "result defender fleet is not same reference",
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
            "mutating result attacker fleet does not affect runtime",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                result
                    .attackerFleet
                    .totalHp = 0;

                expect(
                    runtime
                        .attackerFleet
                        .totalHp
                ).not.toBe(
                    0
                );
            }
        );



        test(
            "mutating result defender fleet does not affect runtime",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                result
                    .defenderFleet
                    .totalHp = 0;

                expect(
                    runtime
                        .defenderFleet
                        .totalHp
                ).not.toBe(
                    0
                );
            }
        );



        test(
            "mutating result unit does not affect runtime unit",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                if (
                    result
                        .attackerFleet
                        .units
                        .length === 0
                ) {

                    return;
                }

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
            "mutating runtime after combat does not affect result",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                runtime
                    .attackerFleet
                    .totalHp = 123456;

                expect(
                    result
                        .attackerFleet
                        .totalHp
                ).not.toBe(
                    123456
                );
            }
        );



        test(
            "multiple combat executions remain isolated",
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
            "runtime unit arrays remain unchanged",
            () => {

                const runtime =
                    buildCombatRuntime();

                const originalLength =
                    runtime
                        .attackerFleet
                        .units
                        .length;

                resolveCombat(
                    runtime
                );

                expect(
                    runtime
                        .attackerFleet
                        .units
                        .length
                ).toBe(
                    originalLength
                );
            }
        );



        test(
            "runtime remains serializable after combat",
            () => {

                const runtime =
                    buildCombatRuntime();

                resolveCombat(
                    runtime
                );

                expect(
                    () =>
                        JSON.stringify(
                            runtime
                        )
                ).not.toThrow();
            }
        );

    }
);