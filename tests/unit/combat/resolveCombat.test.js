import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "resolveCombat",
    () => {

        const createRuntime =
            () => ({

                combatId:
                    "combat_1",

                currentRound: 1,

                maxRounds: 3,

                attackerFleet: {

                    units: [

                        {
                            runtimeUnitId:
                                "a1",

                            remainingUnits: 5,

                            hp: 500,

                            hpLastUnit: 500,

                            damage: 200
                        }
                    ]
                },

                defenderFleet: {

                    units: [

                        {
                            runtimeUnitId:
                                "d1",

                            remainingUnits: 5,

                            hp: 500,

                            hpLastUnit: 500,

                            damage: 200
                        }
                    ]
                }
            });



        test(
            "creates rounds history",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                expect(
                    Array.isArray(
                        result.rounds
                    )
                ).toBe(true);
            }
        );


        test(
            "never exceeds maxRounds",
            () => {

                const runtime =
                    createRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.currentRound
                ).toBeLessThanOrEqual(
                    runtime.maxRounds
                );
            }
        );


        test(
            "remains deterministic",
            () => {

                const resultA =
                    resolveCombat(
                        createRuntime()
                    );

                const resultB =
                    resolveCombat(
                        createRuntime()
                    );

                expect(
                    resultA
                ).toEqual(
                    resultB
                );
            }
        );

    }
);
