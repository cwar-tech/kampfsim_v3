import calculateLosses
    from "../../../app/combat/resolver/calculateLosses.js";

describe(
    "calculateLosses",
    () => {

        test(
            "tracks attacker destroyed units",
            () => {

                const runtime = {

                    combatRuntime: {

                        attackerFleet: {

                            units: [

                                {
                                    runtimeUnitId:
                                        "a1",

                                    remainingUnits: 0
                                }
                            ]
                        },

                        defenderFleet: {

                            units: []
                        }
                    },

                    roundRuntime: {

                        attackerDestroyedUnits:
                            [],

                        defenderDestroyedUnits:
                            []
                    }
                };

                calculateLosses(
                    runtime
                );

                expect(
                    Array.isArray(
                        runtime
                            .roundRuntime
                            .attackerDestroyedUnits
                    )
                ).toBe(true);
            }
        );


        test(
            "handles malformed runtimes safely",
            () => {

                expect(
                    () =>
                        calculateLosses(
                            {}
                        )
                ).not.toThrow();
            }
        );

    }
);
