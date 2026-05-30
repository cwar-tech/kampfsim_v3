import resolveRound
    from "../../../app/combat/resolver/resolveRound.js";

describe(
    "combat round event consistency",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_round_events_001",

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
            "damage events contain source ids",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                for (
                    const event
                    of result.damageEvents
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
            "damage events contain target ids",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                for (
                    const event
                    of result.damageEvents
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
            "damage events contain applied damage",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                for (
                    const event
                    of result.damageEvents
                ) {

                    expect(
                        event.appliedDamage
                    ).toBeGreaterThan(0);
                }
            }
        );


        test(
            "overflow events contain overflow damage",
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

                for (
                    const event
                    of result.overflowEvents
                ) {

                    expect(
                        event.overflowDamage
                    ).toBeGreaterThan(0);
                }
            }
        );


        test(
            "overflow events contain source ids",
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

                for (
                    const event
                    of result.overflowEvents
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

                runtime
                    .attackerFleet
                    .units[1]
                    .damage = 999999;

                const result =
                    resolveRound(
                        runtime
                    );

                for (
                    const event
                    of result.overflowEvents
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
            "event ordering remains deterministic",
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
            "overflow ordering remains deterministic",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                runtimeA
                    .attackerFleet
                    .units[1]
                    .damage = 999999;

                runtimeB
                    .attackerFleet
                    .units[1]
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
            "events survive serialization",
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

    }
);