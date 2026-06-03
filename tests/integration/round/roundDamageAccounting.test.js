import {
    calculateRound
}
    from "../../../app/combat/calculateRound.js";

import buildCombatRuntime
    from "../../factories/buildCombatRuntime.js";



describe(
    "round damage accounting",
    () => {

        test(
            "round applies damage to both fleets",
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
                        .receivedDamage
                ).toBeGreaterThan(
                    0
                );

                expect(
                    result
                        .defenderFleet
                        .receivedDamage
                ).toBeGreaterThan(
                    0
                );
            }
        );



        test(
            "round never creates negative hp",
            () => {

                const runtime =
                    buildCombatRuntime();

                runtime
                    .attackerFleet
                    .totalDamage =
                    999999999;

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
            "round never creates negative unit counts",
            () => {

                const runtime =
                    buildCombatRuntime();

                runtime
                    .attackerFleet
                    .totalDamage =
                    999999999;

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
            "round damage accounting remains deterministic",
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



        test(
            "round preserves fleet structure",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect(
                    result.attackerFleet
                        .fleetId
                ).toBe(
                    runtime.attackerFleet
                        .fleetId
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



        test(
            "round damage accounting survives serialization",
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
            "round creates valid combat state",
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
            "round creates valid winner state",
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
            "round events are generated",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                expect(
                    result.roundEvents.length
                ).toBeGreaterThan(
                    0
                );
            }
        );



        test(
            "round damage remains finite",
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

    }
);