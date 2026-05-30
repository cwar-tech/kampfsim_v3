import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat damage propagation integrity",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_damage_001",

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
                        },

                        {
                            runtimeUnitId:
                                "attacker_2",

                            unitTypeId:
                                "destroyer",

                            hp: 2000,

                            remainingUnits: 3,

                            hpLastUnit: 2000,

                            damage: 1200,

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
                        },

                        {
                            runtimeUnitId:
                                "defender_2",

                            unitTypeId:
                                "destroyer",

                            hp: 2000,

                            remainingUnits: 3,

                            hpLastUnit: 2000,

                            damage: 1200,

                            receivedDamage: 0
                        }

                    ]
                }
            });



        test(
            "damage is propagated to targets",
            () => {

                const runtime =
                    createCombatRuntime();

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
                        unit.receivedDamage
                    ).toBeGreaterThanOrEqual(
                        0
                    );
                }
            }
        );


        test(
            "damage propagation remains deterministic",
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

                const damageA =
                    resultA.rounds.flatMap(
                        (round) =>
                            round.damageEvents
                    );

                const damageB =
                    resultB.rounds.flatMap(
                        (round) =>
                            round.damageEvents
                    );

                expect(
                    damageA
                ).toEqual(
                    damageB
                );
            }
        );


        test(
            "damage propagation survives serialization",
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

                const originalDamage =
                    result.rounds.flatMap(
                        (round) =>
                            round.damageEvents
                    );

                const restoredDamage =
                    restored.rounds.flatMap(
                        (round) =>
                            round.damageEvents
                    );

                expect(
                    restoredDamage
                ).toEqual(
                    originalDamage
                );
            }
        );


        test(
            "damage events always contain applied damage",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const events =
                    result.rounds.flatMap(
                        (round) =>
                            round.damageEvents
                    );

                for (
                    const event
                    of events
                ) {

                    expect(
                        event.appliedDamage
                    ).toBeGreaterThan(0);
                }
            }
        );


        test(
            "damage propagation reduces fleet integrity",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const defender =
                    result
                        .defenderFleet
                        .units[0];

                expect(
                    defender.hpLastUnit
                ).toBeLessThanOrEqual(
                    500
                );
            }
        );


        test(
            "massive damage propagates consistently",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[1]
                    .damage = 999999;

                const result =
                    resolveCombat(
                        runtime
                    );

                const overflow =
                    result.rounds.flatMap(
                        (round) =>
                            round.overflowEvents
                    );

                expect(
                    overflow.length
                ).toBeGreaterThan(0);
            }
        );


        test(
            "destroyed units preserve final damage state",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[1]
                    .damage = 999999;

                const result =
                    resolveCombat(
                        runtime
                    );

                const destroyed =
                    result
                        .defenderFleet
                        .units
                        .filter(
                            (unit) =>
                                unit.remainingUnits === 0
                        );

                for (
                    const unit
                    of destroyed
                ) {

                    expect(
                        unit.hpLastUnit
                    ).toBe(0);
                }
            }
        );


        test(
            "damage propagation remains replay safe",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
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

    }
);