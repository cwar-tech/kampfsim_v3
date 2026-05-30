import resolveRound
    from "../../../app/combat/resolver/resolveRound.js";

describe(
    "combat round damage accounting",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_round_damage_001",

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
                                "destroyer",

                            hp: 2500,

                            remainingUnits: 4,

                            hpLastUnit: 2500,

                            damage: 1800,

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
                                "destroyer",

                            hp: 2500,

                            remainingUnits: 4,

                            hpLastUnit: 2500,

                            damage: 1800,

                            receivedDamage: 0
                        }

                    ]
                }
            });



        test(
            "damage events are generated",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        runtime
                    );

                expect(
                    result.damageEvents.length
                ).toBeGreaterThan(0);
            }
        );


        test(
            "all applied damage values are positive",
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
            "receivedDamage is accumulated correctly",
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

                const damagedUnits =
                    allUnits.filter(
                        (unit) =>
                            unit.receivedDamage > 0
                    );

                expect(
                    damagedUnits.length
                ).toBeGreaterThan(0);
            }
        );


        test(
            "receivedDamage never becomes negative",
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
                        unit.receivedDamage
                    ).toBeGreaterThanOrEqual(
                        0
                    );
                }
            }
        );


        test(
            "damage accounting remains deterministic",
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
            "damage accounting survives serialization",
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
            "massive damage creates overflow accounting",
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
                    result.overflowEvents.length
                ).toBeGreaterThan(0);
            }
        );


        test(
            "damage accounting never creates negative hp",
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
            "damage accounting remains replay safe",
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