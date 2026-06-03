import {
    calculateRound
}
    from "../../../app/combat/calculateRound.js";

import buildCombatRuntime
    from "../../factories/buildCombatRuntime.js";



describe(
    "serialization invariants",
    () => {

        test(
            "combat result survives full serialization",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                const serialized =
                    JSON.stringify(
                        result
                    );

                const deserialized =
                    JSON.parse(
                        serialized
                    );

                expect(
                    deserialized
                ).toEqual(
                    result
                );
            }
        );



        test(
            "attacker fleet survives serialization",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                const serialized =
                    JSON.stringify(

                        result
                            .attackerFleet
                    );

                const deserialized =
                    JSON.parse(
                        serialized
                    );

                expect(
                    deserialized
                ).toEqual(

                    result
                        .attackerFleet
                );
            }
        );



        test(
            "defender fleet survives serialization",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                const serialized =
                    JSON.stringify(

                        result
                            .defenderFleet
                    );

                const deserialized =
                    JSON.parse(
                        serialized
                    );

                expect(
                    deserialized
                ).toEqual(

                    result
                        .defenderFleet
                );
            }
        );



        test(
            "unit arrays survive serialization",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                const serialized =
                    JSON.stringify([

                        ...result
                            .attackerFleet
                            .units,

                        ...result
                            .defenderFleet
                            .units
                    ]);

                const deserialized =
                    JSON.parse(
                        serialized
                    );

                expect(
                    Array.isArray(
                        deserialized
                    )
                ).toBe(true);

                expect(
                    deserialized.length
                ).toBeGreaterThan(
                    0
                );
            }
        );



        test(
            "runtime unit ids survive serialization",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                const allUnits = [

                    ...result
                        .attackerFleet
                        .units,

                    ...result
                        .defenderFleet
                        .units
                ];

                const serialized =
                    JSON.stringify(
                        allUnits
                    );

                const deserialized =
                    JSON.parse(
                        serialized
                    );

                for (
                    const unit
                    of deserialized
                ) {

                    expect(
                        typeof unit
                            .runtimeUnitId
                    ).toBe(
                        "string"
                    );
                }
            }
        );



        test(
            "combat states survive serialization",
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

                const serialized =
                    JSON.stringify({

                        combatState:
                            result.combatState,

                        winner:
                            result.winner
                    });

                const deserialized =
                    JSON.parse(
                        serialized
                    );

                expect(
                    deserialized
                        .combatState
                ).toBe(
                    result.combatState
                );

                expect(
                    deserialized
                        .winner
                ).toBe(
                    result.winner
                );
            }
        );



        test(
            "numeric combat values survive serialization",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                const serialized =
                    JSON.stringify({

                        attackerHp:
                            result
                                .attackerFleet
                                .remainingHp,

                        defenderHp:
                            result
                                .defenderFleet
                                .remainingHp,

                        attackerUnits:
                            result
                                .attackerFleet
                                .remainingUnits,

                        defenderUnits:
                            result
                                .defenderFleet
                                .remainingUnits
                    });

                const deserialized =
                    JSON.parse(
                        serialized
                    );

                expect(
                    Number.isFinite(

                        deserialized
                            .attackerHp
                    )
                ).toBe(true);

                expect(
                    Number.isFinite(

                        deserialized
                            .defenderHp
                    )
                ).toBe(true);

                expect(
                    Number.isFinite(

                        deserialized
                            .attackerUnits
                    )
                ).toBe(true);

                expect(
                    Number.isFinite(

                        deserialized
                            .defenderUnits
                    )
                ).toBe(true);
            }
        );



        test(
            "round events survive serialization",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                const serialized =
                    JSON.stringify(
                        result.roundEvents
                    );

                const deserialized =
                    JSON.parse(
                        serialized
                    );

                expect(
                    Array.isArray(
                        deserialized
                    )
                ).toBe(true);
            }
        );



        test(
            "serialization remains deterministic without timestamps",
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
            "serialized combat results remain structurally valid",
            () => {

                const runtime =
                    buildCombatRuntime();

                const result =
                    calculateRound(

                        runtime.attackerFleet,

                        runtime.defenderFleet
                    );

                const deserialized =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    deserialized
                ).toHaveProperty(
                    "attackerFleet"
                );

                expect(
                    deserialized
                ).toHaveProperty(
                    "defenderFleet"
                );

                expect(
                    deserialized
                ).toHaveProperty(
                    "combatState"
                );

                expect(
                    deserialized
                ).toHaveProperty(
                    "winner"
                );

                expect(
                    deserialized
                ).toHaveProperty(
                    "roundEvents"
                );
            }
        );

    }
);