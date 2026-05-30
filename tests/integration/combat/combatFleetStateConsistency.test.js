import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat fleet state consistency",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_fleet_state_001",

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
                                "frigate",

                            hp: 1000,

                            remainingUnits: 5,

                            hpLastUnit: 1000,

                            damage: 600,

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
                                "frigate",

                            hp: 1000,

                            remainingUnits: 5,

                            hpLastUnit: 1000,

                            damage: 600,

                            receivedDamage: 0
                        }

                    ]
                }
            });



        test(
            "fleet units never exceed original size",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const attackerUnits =
                    result.attackerFleet.units;

                const defenderUnits =
                    result.defenderFleet.units;

                expect(
                    attackerUnits[0]
                        .remainingUnits
                ).toBeLessThanOrEqual(
                    10
                );

                expect(
                    attackerUnits[1]
                        .remainingUnits
                ).toBeLessThanOrEqual(
                    5
                );

                expect(
                    defenderUnits[0]
                        .remainingUnits
                ).toBeLessThanOrEqual(
                    10
                );

                expect(
                    defenderUnits[1]
                        .remainingUnits
                ).toBeLessThanOrEqual(
                    5
                );
            }
        );


        test(
            "living units always contain hp",
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

                    if (
                        unit.remainingUnits > 0
                    ) {

                        expect(
                            unit.hpLastUnit
                        ).toBeGreaterThan(0);
                    }
                }
            }
        );


        test(
            "destroyed units always have zero hp",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

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

                    if (
                        unit.remainingUnits === 0
                    ) {

                        expect(
                            unit.hpLastUnit
                        ).toBe(0);
                    }
                }
            }
        );


        test(
            "fleet states remain deterministic",
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
                    resultA.attackerFleet
                ).toEqual(
                    resultB.attackerFleet
                );

                expect(
                    resultA.defenderFleet
                ).toEqual(
                    resultB.defenderFleet
                );
            }
        );


        test(
            "fleet states survive serialization",
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
                    restored.attackerFleet
                ).toEqual(
                    result.attackerFleet
                );

                expect(
                    restored.defenderFleet
                ).toEqual(
                    result.defenderFleet
                );
            }
        );


        test(
            "fleet runtime ids remain unique",
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
            "fleet hp values never become negative",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .damage = 999999999;

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
                        unit.hpLastUnit
                    ).toBeGreaterThanOrEqual(
                        0
                    );
                }
            }
        );


        test(
            "fleet unit counts never become negative",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .damage = 999999999;

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
                        unit.remainingUnits
                    ).toBeGreaterThanOrEqual(
                        0
                    );
                }
            }
        );


        test(
            "empty fleets remain stable",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units = [];

                runtime
                    .defenderFleet
                    .units = [];

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.attackerFleet
                        .units
                ).toEqual([]);

                expect(
                    result.defenderFleet
                        .units
                ).toEqual([]);
            }
        );

    }
);