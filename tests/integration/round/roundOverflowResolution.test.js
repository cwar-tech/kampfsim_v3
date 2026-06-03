import {
    calculateRound
}
    from "../../../app/combat/calculateRound.js";

import buildCombatRuntime
    from "../../factories/buildCombatRuntime.js";



describe(
    "round overflow resolution",
    () => {

        test(
            "overflow damage never creates negative hp",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet: {

                            ...buildCombatRuntime()
                                .attackerFleet,

                            totalDamage:
                                999999
                        }
                    });

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect(
                    result
                        .defenderFleet
                        .remainingHp
                ).toBeGreaterThanOrEqual(
                    0
                );
            }
        );



        test(
            "overflow damage never creates negative units",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet: {

                            ...buildCombatRuntime()
                                .attackerFleet,

                            totalDamage:
                                999999
                        }
                    });

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect(
                    result
                        .defenderFleet
                        .remainingUnits
                ).toBeGreaterThanOrEqual(
                    0
                );
            }
        );



        test(
            "overflow damage never creates negative volume",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet: {

                            ...buildCombatRuntime()
                                .attackerFleet,

                            totalDamage:
                                999999
                        }
                    });

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect(
                    result
                        .defenderFleet
                        .remainingVolume
                ).toBeGreaterThanOrEqual(
                    0
                );
            }
        );



        test(
            "destroyed units never exceed total units",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet: {

                            ...buildCombatRuntime()
                                .attackerFleet,

                            totalDamage:
                                999999
                        }
                    });

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect(
                    result
                        .defenderFleet
                        .destroyedUnits
                ).toBeLessThanOrEqual(

                    runtime
                        .defenderFleet
                        .totalUnits
                );
            }
        );



        test(
            "destroyed volume never exceeds total volume",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet: {

                            ...buildCombatRuntime()
                                .attackerFleet,

                            totalDamage:
                                999999
                        }
                    });

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect(
                    result
                        .defenderDestroyedVolume
                ).toBeLessThanOrEqual(

                    runtime
                        .defenderFleet
                        .totalVolume
                );
            }
        );



        test(
            "overflow state remains deterministic",
            () => {

                const runtimeA =
                    buildCombatRuntime({

                        attackerFleet: {

                            ...buildCombatRuntime()
                                .attackerFleet,

                            totalDamage:
                                999999
                        }
                    });

                const runtimeB =
                    buildCombatRuntime({

                        attackerFleet: {

                            ...buildCombatRuntime()
                                .attackerFleet,

                            totalDamage:
                                999999
                        }
                    });

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



        test(
            "overflow resolution survives serialization",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet: {

                            ...buildCombatRuntime()
                                .attackerFleet,

                            totalDamage:
                                999999
                        }
                    });

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
            "overflow creates valid combat state",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet: {

                            ...buildCombatRuntime()
                                .attackerFleet,

                            totalDamage:
                                999999
                        }
                    });

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect([

                    "ongoing",
                    "attackerVictory",
                    "defenderVictory",
                    "mutualDestruction"

                ]).toContain(

                    result.combatState
                );
            }
        );



        test(
            "overflow combat result remains finite",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet: {

                            ...buildCombatRuntime()
                                .attackerFleet,

                            totalDamage:
                                999999
                        }
                    });

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect(
                    Number.isFinite(

                        result
                            .defenderFleet
                            .remainingHp
                    )
                ).toBe(true);

                expect(
                    Number.isFinite(

                        result
                            .defenderFleet
                            .remainingUnits
                    )
                ).toBe(true);

                expect(
                    Number.isFinite(

                        result
                            .defenderFleet
                            .remainingVolume
                    )
                ).toBe(true);
            }
        );



        test(
            "overflow damage preserves fleet structure",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet: {

                            ...buildCombatRuntime()
                                .attackerFleet,

                            totalDamage:
                                999999
                        }
                    });

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect(
                    result.defenderFleet
                        .fleetId
                ).toBe(

                    runtime.defenderFleet
                        .fleetId
                );
            }
        );

    }
);