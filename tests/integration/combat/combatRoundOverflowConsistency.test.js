import resolveRound
    from "../../../app/combat/resolver/resolveRound.js";

describe(
    "combat round overflow consistency",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_round_overflow_001",

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
                                "destroyer",

                            hp: 2500,

                            remainingUnits: 5,

                            hpLastUnit: 2500,

                            damage: 999999,

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

                            damage: 200,

                            receivedDamage: 0
                        },

                        {
                            runtimeUnitId:
                                "defender_2",

                            unitTypeId:
                                "fighter",

                            hp: 500,

                            remainingUnits: 10,

                            hpLastUnit: 500,

                            damage: 200,

                            receivedDamage: 0
                        }

                    ]
                }
            });



        test(
            "overflow events are created",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                expect(
                    result
                        .overflowEvents
                        .length
                ).toBeGreaterThan(0);
            }
        );


        test(
            "overflow damage is always positive",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                for (
                    const event
                    of result
                        .overflowEvents
                ) {

                    expect(
                        event
                            .overflowDamage
                    ).toBeGreaterThan(0);
                }
            }
        );


        test(
            "overflow chains remain deterministic",
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
                        .overflowEvents
                ).toEqual(
                    resultB
                        .overflowEvents
                );
            }
        );


        test(
            "overflow survives serialization",
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
                        .overflowEvents
                ).toEqual(
                    result
                        .overflowEvents
                );
            }
        );


        test(
            "overflow never creates negative hp",
            () => {

                const runtime =
                    createCombatRuntime();

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
            "overflow never creates negative units",
            () => {

                const runtime =
                    createCombatRuntime();

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
            "overflow events contain source ids",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                for (
                    const event
                    of result
                        .overflowEvents
                ) {

                    expect(
                        typeof event
                            .sourceRuntimeUnitId
                    ).toBe(
                        "string"
                    );
                }
            }
        );


        test(
            "overflow events contain target ids",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                for (
                    const event
                    of result
                        .overflowEvents
                ) {

                    expect(
                        typeof event
                            .targetRuntimeUnitId
                    ).toBe(
                        "string"
                    );
                }
            }
        );


        test(
            "overflow result remains replay safe",
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

    }
);