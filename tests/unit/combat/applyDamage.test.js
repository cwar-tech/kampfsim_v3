import calculateLosses
    from "../../../app/combat/resolver/calculateLosses.js";

describe(
    "calculateLosses",
    () => {

        test(
            "adds destroyed attacker units to roundRuntime",
            () => {

                const combatRuntime = {

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
                        units: []
                    }
                };

                const roundRuntime = {

                    attackerDestroyedUnits:
                        [],

                    defenderDestroyedUnits:
                        []
                };

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

                const combatRuntime = {

                    attackerFleet: {
                        units: []
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
                };

                const roundRuntime = {

                    attackerDestroyedUnits:
                        [],

                    defenderDestroyedUnits:
                        []
                };

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

                const roundRuntime = {

                    attackerDestroyedUnits:
                        [],

                    defenderDestroyedUnits:
                        []
                };

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

                const roundRuntime = {

                    attackerDestroyedUnits:
                        [],

                    defenderDestroyedUnits:
                        []
                };

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
            "handles empty fleets safely",
            () => {

                const combatRuntime = {

                    attackerFleet: {
                        units: []
                    },

                    defenderFleet: {
                        units: []
                    }
                };

                const roundRuntime = {

                    attackerDestroyedUnits:
                        [],

                    defenderDestroyedUnits:
                        []
                };

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

                const roundRuntime = {

                    attackerDestroyedUnits:
                        [],

                    defenderDestroyedUnits:
                        []
                };

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

                const roundRuntime = {

                    attackerDestroyedUnits:
                        [],

                    defenderDestroyedUnits:
                        []
                };

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

                const combatRuntime = {

                    attackerFleet: {
                        units: []
                    },

                    defenderFleet: {
                        units: []
                    }
                };

                const result =
                    calculateLosses(
                        combatRuntime,
                        null
                    );

                expect(result)
                    .toBeUndefined();
            }
        );
    }
);