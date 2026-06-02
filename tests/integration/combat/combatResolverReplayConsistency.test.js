import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

import createRuntimeUnit
    from "../../factories/createRuntimeUnit.js";

describe(
    "combat resolver replay consistency",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_resolver_replay_001",

                currentRound: 1,

                maxRounds: 5,

                combatFinished: false,

                attackerDefeated: false,

                defenderDefeated: false,

                attackerFleet: {

                    fleetId:
                        "fleet_attacker",

                    units: [

                        createRuntimeUnit({

                            runtimeUnitId:
                                "attacker_1",

                            shipTemplateId:
                                "fighter",

                            unitCount: 15
                        }),

                        createRuntimeUnit({

                            runtimeUnitId:
                                "attacker_2",

                            shipTemplateId:
                                "destroyer",

                            unitCount: 3
                        })
                    ]
                },

                defenderFleet: {

                    fleetId:
                        "fleet_defender",

                    units: [

                        createRuntimeUnit({

                            runtimeUnitId:
                                "defender_1",

                            shipTemplateId:
                                "fighter",

                            unitCount: 15
                        }),

                        createRuntimeUnit({

                            runtimeUnitId:
                                "defender_2",

                            shipTemplateId:
                                "destroyer",

                            unitCount: 3
                        })
                    ]
                }
            });



        test(
            "combat replay remains deterministic",
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
            "combat replay survives serialization",
            () => {

                const runtime =
                    createCombatRuntime();

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


        test(
            "combat replay remains json safe",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    () =>
                        JSON.stringify(
                            result
                        )
                ).not.toThrow();
            }
        );


        test(
            "combat replay preserves runtime ids",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const ids =
                    new Set();

                const allUnits = [

                    ...result
                        .attackerFleet
                        .units,

                    ...result
                        .defenderFleet
                        .units
                ];

                for (
                    const unit
                    of allUnits
                ) {

                    expect(
                        ids.has(
                            unit.runtimeUnitId
                        )
                    ).toBe(false);

                    ids.add(
                        unit.runtimeUnitId
                    );
                }
            }
        );


        test(
            "combat replay never creates negative hp",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[1]
                    .totalDamage =
                    999999999;

                const result =
                    resolveCombat(
                        runtime
                    );

                const allUnits = [

                    ...result
                        .attackerFleet
                        .units,

                    ...result
                        .defenderFleet
                        .units
                ];

                for (
                    const unit
                    of allUnits
                ) {

                    expect(
                        unit.remainingHp
                    ).toBeGreaterThanOrEqual(
                        0
                    );
                }
            }
        );

    }
);