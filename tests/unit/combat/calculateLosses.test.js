import calculateLosses
    from "../../../app/combat/resolver/calculateLosses.js";

describe(
    "calculateLosses",
    () => {

        const createCombatRuntime =
            () => ({

                attackerFleet: {

                    units: [

                        {
                            runtimeUnitId:
                                "attacker_1",

                            remainingUnits: 0
                        }

                    ]
                },

                defenderFleet: {

                    units: [

                        {
                            runtimeUnitId:
                                "defender_1",

                            remainingUnits: 0
                        }

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

        test(
            "ignores living attacker units",
            () => {

                const combatRuntime = {

                    attackerFleet: {

                        units: [
                            {
                                runtimeUnitId:
                                    "attacker_1",

                                remainingUnits: 5
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
                            {
                                runtimeUnitId:
                                    "defender_1",

                                remainingUnits: 5
                            }
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
            "returns undefined for invalid combatRuntime",
            () => {

                const roundRuntime =
                    createRoundRuntime();

                const result =
                    calculateLosses(
                        null,
                        roundRuntime
                    );

                expect(result)
                    .toBeUndefined();
            }
        );

        test(
            "returns undefined for invalid roundRuntime",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const result =
                    calculateLosses(
                        combatRuntime,
                        null
                    );

                expect(result)
                    .toBeUndefined();
            }
        );

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
    }
);