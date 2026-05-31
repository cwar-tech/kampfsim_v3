import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat resolver runtime hardening",
    () => {

        const createRuntime =
            () => ({

                combatId:
                    "combat_runtime_hardening_001",

                currentRound: 1,

                maxRounds: 5,

                attackerFleet: {

                    units: [

                        {
                            runtimeUnitId:
                                "attacker_1",

                            hp: 500,

                            hpLastUnit: 500,

                            remainingUnits: 5,

                            damage: 100,

                            receivedDamage: 0
                        }
                    ]
                },

                defenderFleet: {

                    units: [

                        {
                            runtimeUnitId:
                                "defender_1",

                            hp: 500,

                            hpLastUnit: 500,

                            remainingUnits: 5,

                            damage: 100,

                            receivedDamage: 0
                        }
                    ]
                }
            });



        test(
            "handles null runtime safely",
            () => {

                expect(
                    () =>
                        resolveCombat(
                            null
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles undefined runtime safely",
            () => {

                expect(
                    () =>
                        resolveCombat(
                            undefined
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles empty runtime safely",
            () => {

                expect(
                    () =>
                        resolveCombat(
                            {}
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles malformed attackerFleet safely",
            () => {

                const runtime =
                    createRuntime();

                runtime.attackerFleet =
                    null;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles malformed defenderFleet safely",
            () => {

                const runtime =
                    createRuntime();

                runtime.defenderFleet =
                    null;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles malformed unit arrays safely",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .attackerFleet
                    .units = null;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles malformed units safely",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .attackerFleet
                    .units = [
                        null,
                        undefined
                    ];

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles negative currentRound safely",
            () => {

                const runtime =
                    createRuntime();

                runtime.currentRound =
                    -10;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles negative maxRounds safely",
            () => {

                const runtime =
                    createRuntime();

                runtime.maxRounds =
                    -5;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles NaN currentRound safely",
            () => {

                const runtime =
                    createRuntime();

                runtime.currentRound =
                    NaN;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles NaN hp safely",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .hp = NaN;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles Infinity hp safely",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .hp = Infinity;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles malformed combatId safely",
            () => {

                const runtime =
                    createRuntime();

                runtime.combatId =
                    null;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "never mutates original runtime",
            () => {

                const runtime =
                    createRuntime();

                const original =
                    JSON.parse(
                        JSON.stringify(
                            runtime
                        )
                    );

                resolveCombat(
                    runtime
                );

                expect(
                    runtime
                ).toEqual(
                    original
                );
            }
        );


        test(
            "remains deterministic across repeated executions",
            () => {

                const runtimeA =
                    createRuntime();

                const runtimeB =
                    createRuntime();

                const resultA =
                    resolveCombat(
                        runtimeA
                    );

                const resultB =
                    resolveCombat(
                        runtimeB
                    );

                expect(
                    resultA
                ).toEqual(
                    resultB
                );
            }
        );


        test(
            "survives serialization replay",
            () => {

                const runtime =
                    createRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const replay =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    replay
                ).toEqual(
                    result
                );
            }
        );

    }
);