import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat resolver mutation safety",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_resolver_mutation_001",

                currentRound: 1,

                maxRounds: 5,

                combatFinished: false,

                attackerDefeated: false,

                defenderDefeated: false,

                attackerFleet: {

                    fleetId:
                        "fleet_attacker",

                    units: [

                        {
                            runtimeUnitId:
                                "attacker_1",

                            unitTypeId:
                                "fighter",

                            hp: 500,

                            remainingUnits: 20,

                            hpLastUnit: 500,

                            damage: 300,

                            receivedDamage: 0
                        }

                    ]
                },

                defenderFleet: {

                    fleetId:
                        "fleet_defender",

                    units: [

                        {
                            runtimeUnitId:
                                "defender_1",

                            unitTypeId:
                                "fighter",

                            hp: 500,

                            remainingUnits: 20,

                            hpLastUnit: 500,

                            damage: 300,

                            receivedDamage: 0
                        }

                    ]
                }
            });



        test(
            "resolveCombat does not mutate original runtime",
            () => {

                const runtime =
                    createCombatRuntime();

                const original =
                    JSON.stringify(
                        runtime
                    );

                resolveCombat(
                    runtime
                );

                expect(
                    JSON.stringify(
                        runtime
                    )
                ).toBe(
                    original
                );
            }
        );


        test(
            "returned result is isolated",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                ).not.toBe(
                    runtime
                );
            }
        );


        test(
            "mutating result does not affect original runtime",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                result
                    .attackerFleet
                    .units[0]
                    .remainingUnits = 0;

                expect(
                    runtime
                        .attackerFleet
                        .units[0]
                        .remainingUnits
                ).toBe(20);
            }
        );


        test(
            "mutating original runtime does not affect result",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const originalValue =
                    result
                        .attackerFleet
                        .units[0]
                        .remainingUnits;

                runtime
                    .attackerFleet
                    .units[0]
                    .remainingUnits = 0;

                expect(
                    result
                        .attackerFleet
                        .units[0]
                        .remainingUnits
                ).toBe(
                    originalValue
                );
            }
        );


        test(
            "mutation safety remains deterministic",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

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

    }
);