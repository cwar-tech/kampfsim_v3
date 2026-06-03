import {
    calculateRound
}
    from "../../../app/combat/calculateRound.js";

import buildCombatRuntime
    from "../../factories/buildCombatRuntime.js";



describe(
    "fleet integrity",
    () => {

        test(
            "attacker fleet always preserves fleet id",
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
            }
        );



        test(
            "defender fleet always preserves fleet id",
            () => {

                const runtime =
                    buildCombatRuntime();

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



        test(
            "fleet units array always exists",
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

                        result
                            .attackerFleet
                            .units
                    )
                ).toBe(true);

                expect(
                    Array.isArray(

                        result
                            .defenderFleet
                            .units
                    )
                ).toBe(true);
            }
        );



        test(
            "fleet units array never becomes empty unexpectedly",
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
                        .units
                        .length

                ).toBeGreaterThan(
                    0
                );

                expect(

                    result
                        .defenderFleet
                        .units
                        .length

                ).toBeGreaterThan(
                    0
                );
            }
        );



        test(
            "fleet total hp always remains finite",
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
                            .totalHp
                    )
                ).toBe(true);

                expect(
                    Number.isFinite(

                        result
                            .defenderFleet
                            .totalHp
                    )
                ).toBe(true);
            }
        );



        test(
            "fleet total damage always remains finite",
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
                            .totalDamage
                    )
                ).toBe(true);

                expect(
                    Number.isFinite(

                        result
                            .defenderFleet
                            .totalDamage
                    )
                ).toBe(true);
            }
        );



        test(
            "fleet total volume always remains finite",
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
                            .totalVolume
                    )
                ).toBe(true);

                expect(
                    Number.isFinite(

                        result
                            .defenderFleet
                            .totalVolume
                    )
                ).toBe(true);
            }
        );



        test(
            "fleet remaining values always remain finite",
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
                    Number.isFinite(

                        result
                            .attackerFleet
                            .remainingHp
                    )
                ).toBe(true);

                expect(
                    Number.isFinite(

                        result
                            .attackerFleet
                            .remainingUnits
                    )
                ).toBe(true);

                expect(
                    Number.isFinite(

                        result
                            .attackerFleet
                            .remainingVolume
                    )
                ).toBe(true);

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
            "fleet result survives serialization",
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
            "fleet integrity remains deterministic without timestamps",
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
            });
    }
);