import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat runtime mutation safety",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_mutation_001",

                currentRound: 1,

                maxRounds: 10,

                combatFinished: false,

                attackerDefeated: false,

                defenderDefeated: false,

                rounds: [],

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

                            remainingUnits: 10,

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

                            remainingUnits: 10,

                            hpLastUnit: 500,

                            damage: 300,

                            receivedDamage: 0
                        }

                    ]
                }
            });



        test(
            "resolveCombat never mutates original runtime",
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
            "resolveCombat returns isolated runtime copy",
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
            "returned fleets are isolated copies",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.attackerFleet
                ).not.toBe(
                    runtime.attackerFleet
                );

                expect(
                    result.defenderFleet
                ).not.toBe(
                    runtime.defenderFleet
                );
            }
        );


        test(
            "returned units are isolated copies",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                        .attackerFleet
                        .units[0]
                ).not.toBe(
                    runtime
                        .attackerFleet
                        .units[0]
                );

                expect(
                    result
                        .defenderFleet
                        .units[0]
                ).not.toBe(
                    runtime
                        .defenderFleet
                        .units[0]
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
                ).toBe(10);
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
            "runtime isolation remains deterministic",
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


        test(
            "runtime isolation survives serialization",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    restored
                ).toEqual(
                    result
                );
            }
        );


        test(
            "empty runtime remains mutation safe",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units = [];

                runtime
                    .defenderFleet
                    .units = [];

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

    }
);