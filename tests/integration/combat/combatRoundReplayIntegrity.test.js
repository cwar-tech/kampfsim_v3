import resolveRound
    from "../../../app/combat/resolver/resolveRound.js";

describe(
    "combat round replay integrity",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_round_replay_001",

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
                        },

                        {
                            runtimeUnitId:
                                "attacker_2",

                            unitTypeId:
                                "destroyer",

                            hp: 2500,

                            remainingUnits: 3,

                            hpLastUnit: 2500,

                            damage: 1500,

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
                        },

                        {
                            runtimeUnitId:
                                "defender_2",

                            unitTypeId:
                                "destroyer",

                            hp: 2500,

                            remainingUnits: 3,

                            hpLastUnit: 2500,

                            damage: 1500,

                            receivedDamage: 0
                        }

                    ]
                }
            });



        test(
            "round replay survives serialization",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
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
            "round replay preserves damage events",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                const replay =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    replay.damageEvents
                ).toEqual(
                    result.damageEvents
                );
            }
        );


        test(
            "round replay preserves overflow events",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[1]
                    .damage = 999999;

                const result =
                    resolveRound(
                        runtime
                    );

                const replay =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    replay.overflowEvents
                ).toEqual(
                    result.overflowEvents
                );
            }
        );


        test(
            "round replay preserves runtime state",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                const replay =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    replay.combatRuntime
                ).toEqual(
                    result.combatRuntime
                );
            }
        );


        test(
            "round replay preserves destroyed units",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[1]
                    .damage = 999999;

                const result =
                    resolveRound(
                        runtime
                    );

                const replay =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    replay.roundRuntime
                ).toEqual(
                    result.roundRuntime
                );
            }
        );


        test(
            "round replay remains deterministic",
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
            "round replay remains json safe",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
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
            "round replay never contains undefined values",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                const serialized =
                    JSON.stringify(
                        result
                    );

                expect(
                    serialized.includes(
                        "undefined"
                    )
                ).toBe(false);
            }
        );


        test(
            "round replay preserves unique runtime ids",
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