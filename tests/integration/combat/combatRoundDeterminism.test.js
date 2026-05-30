import resolveRound
    from "../../../app/combat/resolver/resolveRound.js";

describe(
    "combat round determinism",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_round_determinism_001",

                currentRound: 1,

                maxRounds: 10,

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

                            remainingUnits: 15,

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

                            remainingUnits: 15,

                            hpLastUnit: 500,

                            damage: 300,

                            receivedDamage: 0
                        }

                    ]
                }
            });



        test(
            "resolveRound produces deterministic results",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                const resultA =
                    resolveRound(
                        runtimeA
                    );

                const resultB =
                    resolveRound(
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
            "round events remain deterministic",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                const resultA =
                    resolveRound(
                        runtimeA
                    );

                const resultB =
                    resolveRound(
                        runtimeB
                    );

                expect(
                    resultA.damageEvents
                ).toEqual(
                    resultB.damageEvents
                );
            }
        );


        test(
            "overflow chains remain deterministic",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                runtimeA
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

                runtimeB
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

                const resultA =
                    resolveRound(
                        runtimeA
                    );

                const resultB =
                    resolveRound(
                        runtimeB
                    );

                expect(
                    resultA.overflowEvents
                ).toEqual(
                    resultB.overflowEvents
                );
            }
        );


        test(
            "round runtime remains deterministic",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                const resultA =
                    resolveRound(
                        runtimeA
                    );

                const resultB =
                    resolveRound(
                        runtimeB
                    );

                expect(
                    resultA.roundRuntime
                ).toEqual(
                    resultB.roundRuntime
                );
            }
        );


        test(
            "round state survives serialization",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
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
            "round result remains replay safe",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                expect(
                    () =>
                        JSON.parse(
                            JSON.stringify(
                                result
                            )
                        )
                ).not.toThrow();
            }
        );


        test(
            "round never creates negative units",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .damage = 999999999;

                const result =
                    resolveRound(
                        runtime
                    );

                const allUnits = [

                    ...result
                        .combatRuntime
                        .attackerFleet
                        .units,

                    ...result
                        .combatRuntime
                        .defenderFleet
                        .units
                ];

                for (
                    const unit
                    of allUnits
                ) {

                    expect(
                        unit.remainingUnits
                    ).toBeGreaterThanOrEqual(
                        0
                    );
                }
            }
        );


        test(
            "round never creates negative hp",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .damage = 999999999;

                const result =
                    resolveRound(
                        runtime
                    );

                const allUnits = [

                    ...result
                        .combatRuntime
                        .attackerFleet
                        .units,

                    ...result
                        .combatRuntime
                        .defenderFleet
                        .units
                ];

                for (
                    const unit
                    of allUnits
                ) {

                    expect(
                        unit.hpLastUnit
                    ).toBeGreaterThanOrEqual(
                        0
                    );
                }
            }
        );


        test(
            "round maintains unique runtime ids",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                const ids =
                    new Set();

                const allUnits = [

                    ...result
                        .combatRuntime
                        .attackerFleet
                        .units,

                    ...result
                        .combatRuntime
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

    }
);