import {
    calculateRound
}
    from "../../../app/combat/calculateRound.js";

import buildCombatRuntime
    from "../../factories/buildCombatRuntime.js";



describe(
    "round state integrity",
    () => {

        test(
            "combat state is always valid",
            () => {

                const runtime =
                    buildCombatRuntime();

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
            "winner state is always valid",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect([

                    "attacker",
                    "defender",
                    "draw"

                ]).toContain(

                    result.winner
                );
            }
        );



        test(
            "remaining hp is never negative",
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
                        .remainingHp
                ).toBeGreaterThanOrEqual(
                    0
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
            "remaining units are never negative",
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
                        .remainingUnits
                ).toBeGreaterThanOrEqual(
                    0
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
            "remaining volume is never negative",
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
                        .remainingVolume
                ).toBeGreaterThanOrEqual(
                    0
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
                        .destroyedUnits
                ).toBeLessThanOrEqual(

                    runtime
                        .attackerFleet
                        .totalUnits
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
                        .destroyedVolume
                ).toBeLessThanOrEqual(

                    runtime
                        .attackerFleet
                        .totalVolume
                );

                expect(
                    result
                        .defenderFleet
                        .destroyedVolume
                ).toBeLessThanOrEqual(

                    runtime
                        .defenderFleet
                        .totalVolume
                );
            }
        );



        test(
            "round events always exist",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect(
                    Array.isArray(
                        result.roundEvents
                    )
                ).toBe(true);

                expect(
                    result.roundEvents.length
                ).toBeGreaterThan(
                    0
                );
            }
        );



        test(
            "round result survives serialization",
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
            "round state remains deterministic without timestamps",
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