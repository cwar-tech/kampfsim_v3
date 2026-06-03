import {
    calculateRound
}
    from "../../../app/combat/calculateRound.js";

import buildCombatRuntime
    from "../../factories/buildCombatRuntime.js";



describe(
    "runtime invariants",
    () => {

        test(
            "attacker remaining hp never exceeds total hp",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect(
                    result
                        .attackerFleet
                        .remainingHp
                ).toBeLessThanOrEqual(

                    runtime
                        .attackerFleet
                        .totalHp
                );
            }
        );



        test(
            "defender remaining hp never exceeds total hp",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect(
                    result
                        .defenderFleet
                        .remainingHp
                ).toBeLessThanOrEqual(

                    runtime
                        .defenderFleet
                        .totalHp
                );
            }
        );



        test(
            "remaining units never exceed total units",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect(
                    result
                        .attackerFleet
                        .remainingUnits
                ).toBeLessThanOrEqual(

                    runtime
                        .attackerFleet
                        .totalUnits
                );

                expect(
                    result
                        .defenderFleet
                        .remainingUnits
                ).toBeLessThanOrEqual(

                    runtime
                        .defenderFleet
                        .totalUnits
                );
            }
        );



        test(
            "remaining volume never exceeds total volume",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect(
                    result
                        .attackerFleet
                        .remainingVolume
                ).toBeLessThanOrEqual(

                    runtime
                        .attackerFleet
                        .totalVolume
                );

                expect(
                    result
                        .defenderFleet
                        .remainingVolume
                ).toBeLessThanOrEqual(

                    runtime
                        .defenderFleet
                        .totalVolume
                );
            }
        );



        test(
            "destroyed units plus remaining units equal total units",
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
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect(

                    result
                        .attackerFleet
                        .destroyedUnits +

                    result
                        .attackerFleet
                        .remainingUnits

                ).toBe(

                    runtime
                        .attackerFleet
                        .totalUnits
                );

                expect(

                    result
                        .defenderFleet
                        .destroyedUnits +

                    result
                        .defenderFleet
                        .remainingUnits

                ).toBe(

                    runtime
                        .defenderFleet
                        .totalUnits
                );
            }
        );



        test(
            "destroyed volume plus remaining volume equal total volume",
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
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect(

                    result
                        .attackerFleet
                        .destroyedVolume +

                    result
                        .attackerFleet
                        .remainingVolume

                ).toBe(

                    runtime
                        .attackerFleet
                        .totalVolume
                );

                expect(

                    result
                        .defenderFleet
                        .destroyedVolume +

                    result
                        .defenderFleet
                        .remainingVolume

                ).toBe(

                    runtime
                        .defenderFleet
                        .totalVolume
                );
            }
        );



        test(
            "combat winner and combat state remain logically compatible",
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
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                if (
                    result.combatState ===
                    "attackerVictory"
                ) {

                    expect(
                        result.winner
                    ).toBe(
                        "attacker"
                    );
                }

                if (
                    result.combatState ===
                    "defenderVictory"
                ) {

                    expect(
                        result.winner
                    ).toBe(
                        "defender"
                    );
                }
            }
        );



        test(
            "received damage always remains finite",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect(
                    Number.isFinite(

                        result
                            .attackerFleet
                            .receivedDamage
                    )
                ).toBe(true);

                expect(
                    Number.isFinite(

                        result
                            .defenderFleet
                            .receivedDamage
                    )
                ).toBe(true);
            }
        );



        test(
            "runtime result survives serialization",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                const serialized =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    serialized
                ).toEqual(
                    result
                );
            }
        );



        test(
            "runtime invariants remain deterministic without timestamps",
            () => {

                const runtimeA =
                    buildCombatRuntime();

                const runtimeB =
                    buildCombatRuntime();

                const resultA =
                    calculateRound(

                        runtimeA.attackerFleet,

                        runtimeA.defenderFleet
                    );

                const resultB =
                    calculateRound(

                        runtimeB.attackerFleet,

                        runtimeB.defenderFleet
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

    }
);