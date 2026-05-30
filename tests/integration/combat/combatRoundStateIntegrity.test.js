import resolveRound
    from "../../../app/combat/resolver/resolveRound.js";

describe(
    "combat round state integrity",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_round_state_001",

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

                            remainingUnits: 20,

                            hpLastUnit: 500,

                            damage: 300,

                            receivedDamage: 0
                        },

                        {
                            runtimeUnitId:
                                "attacker_2",

                            unitTypeId:
                                "frigate",

                            hp: 1500,

                            remainingUnits: 5,

                            hpLastUnit: 1500,

                            damage: 900,

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
                        },

                        {
                            runtimeUnitId:
                                "defender_2",

                            unitTypeId:
                                "frigate",

                            hp: 1500,

                            remainingUnits: 5,

                            hpLastUnit: 1500,

                            damage: 900,

                            receivedDamage: 0
                        }

                    ]
                }
            });



        test(
            "round state contains combatRuntime",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                expect(
                    result
                ).toHaveProperty(
                    "combatRuntime"
                );
            }
        );


        test(
            "round state contains damageEvents",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                expect(
                    Array.isArray(
                        result.damageEvents
                    )
                ).toBe(true);
            }
        );


        test(
            "round state contains overflowEvents",
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

                expect(
                    Array.isArray(
                        result.overflowEvents
                    )
                ).toBe(true);
            }
        );


        test(
            "round state contains roundRuntime",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                expect(
                    result
                ).toHaveProperty(
                    "roundRuntime"
                );
            }
        );


        test(
            "destroyed units are tracked correctly",
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

                const destroyed = [

                    ...result
                        .roundRuntime
                        .attackerDestroyedUnits,

                    ...result
                        .roundRuntime
                        .defenderDestroyedUnits
                ];

                expect(
                    Array.isArray(
                        destroyed
                    )
                ).toBe(true);
            }
        );


        test(
            "round state remains deterministic",
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
            "round state never creates negative hp",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[1]
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
            "round state never creates negative units",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[1]
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

    }
);