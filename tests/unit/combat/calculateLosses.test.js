import calculateLosses
    from "../../../app/combat/resolver/calculateLosses.js";

describe(
    "calculateLosses",
    () => {

        // ==================================================
        // FACTORIES
        // ==================================================

        const createDestroyedUnit =
            (
                runtimeUnitId
            ) => ({

                runtimeUnitId,

                hpPerUnit: 500,

                totalHp: 5000,

                remainingHp: 0,

                remainingUnits: 0,

                destroyed: true
            });


        const createLivingUnit =
            (
                runtimeUnitId
            ) => ({

                runtimeUnitId,

                hpPerUnit: 500,

                totalHp: 5000,

                remainingHp: 3000,

                remainingUnits: 6,

                destroyed: false
            });


        const createCombatRuntime =
            () => ({

                attackerFleet: {

                    units: [

                        createDestroyedUnit(
                            "attacker_1"
                        )
                    ]
                },

                defenderFleet: {

                    units: [

                        createDestroyedUnit(
                            "defender_1"
                        )
                    ]
                }
            });


        const createRoundRuntime =
            () => ({

                attackerDestroyedUnits:
                    [],

                defenderDestroyedUnits:
                    []
            });



        // ==================================================
        // DESTROYED UNITS
        // ==================================================

        test(
            "adds destroyed attacker units to roundRuntime",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const roundRuntime =
                    createRoundRuntime();

                calculateLosses(
                    combatRuntime,
                    roundRuntime
                );

                expect(
                    roundRuntime
                        .attackerDestroyedUnits
                ).toContain(
                    "attacker_1"
                );
            }
        );


        test(
            "adds destroyed defender units to roundRuntime",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const roundRuntime =
                    createRoundRuntime();

                calculateLosses(
                    combatRuntime,
                    roundRuntime
                );

                expect(
                    roundRuntime
                        .defenderDestroyedUnits
                ).toContain(
                    "defender_1"
                );
            }
        );



        // ==================================================
        // LIVING UNITS
        // ==================================================

        test(
            "ignores living attacker units",
            () => {

                const combatRuntime = {

                    attackerFleet: {

                        units: [

                            createLivingUnit(
                                "attacker_1"
                            )
                        ]
                    },

                    defenderFleet: {
                        units: []
                    }
                };

                const roundRuntime =
                    createRoundRuntime();

                calculateLosses(
                    combatRuntime,
                    roundRuntime
                );

                expect(
                    roundRuntime
                        .attackerDestroyedUnits
                        .length
                ).toBe(0);
            }
        );


        test(
            "ignores living defender units",
            () => {

                const combatRuntime = {

                    attackerFleet: {
                        units: []
                    },

                    defenderFleet: {

                        units: [

                            createLivingUnit(
                                "defender_1"
                            )
                        ]
                    }
                };

                const roundRuntime =
                    createRoundRuntime();

                calculateLosses(
                    combatRuntime,
                    roundRuntime
                );

                expect(
                    roundRuntime
                        .defenderDestroyedUnits
                        .length
                ).toBe(0);
            }
        );



        // ==================================================
        // SAFETY
        // ==================================================

        test(
            "handles malformed units safely",
            () => {

                const combatRuntime = {

                    attackerFleet: {

                        units: [
                            null,
                            undefined,
                            {}
                        ]
                    },

                    defenderFleet: {
                        units: []
                    }
                };

                const roundRuntime =
                    createRoundRuntime();

                expect(
                    () =>
                        calculateLosses(
                            combatRuntime,
                            roundRuntime
                        )
                ).not.toThrow();
            }
        );


        test(
            "returns null for invalid combatRuntime",
            () => {

                const roundRuntime =
                    createRoundRuntime();

                const result =
                    calculateLosses(
                        null,
                        roundRuntime
                    );

                expect(result)
                    .toBeNull();
            }
        );


        test(
            "returns null for invalid roundRuntime",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const result =
                    calculateLosses(
                        combatRuntime,
                        null
                    );

                expect(result)
                    .toBeNull();
            }
        );



        // ==================================================
        // DETERMINISM
        // ==================================================

        test(
            "same runtime always produces same result",
            () => {

                const combatRuntimeA =
                    createCombatRuntime();

                const combatRuntimeB =
                    createCombatRuntime();

                const roundRuntimeA =
                    createRoundRuntime();

                const roundRuntimeB =
                    createRoundRuntime();

                calculateLosses(
                    combatRuntimeA,
                    roundRuntimeA
                );

                calculateLosses(
                    combatRuntimeB,
                    roundRuntimeB
                );

                expect(
                    roundRuntimeA
                ).toEqual(
                    roundRuntimeB
                );
            }
        );



        // ==================================================
        // HP TRUTH
        // ==================================================

        test(
            "remainingHp is the destruction truth",
            () => {

                const combatRuntime = {

                    attackerFleet: {

                        units: [

                            {

                                runtimeUnitId:
                                    "attacker_1",

                                hpPerUnit: 500,

                                totalHp: 5000,

                                remainingHp: 0,

                                remainingUnits: 5,

                                destroyed: false
                            }
                        ]
                    },

                    defenderFleet: {
                        units: []
                    }
                };

                const roundRuntime =
                    createRoundRuntime();

                calculateLosses(
                    combatRuntime,
                    roundRuntime
                );

                expect(
                    roundRuntime
                        .attackerDestroyedUnits
                ).toContain(
                    "attacker_1"
                );
            }
        );

    }
);