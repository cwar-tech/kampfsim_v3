import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat multi fleet consistency",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_multifleet_001",

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

                            remainingUnits: 8,

                            hpLastUnit: 1500,

                            damage: 900,

                            receivedDamage: 0
                        },

                        {
                            runtimeUnitId:
                                "attacker_3",

                            unitTypeId:
                                "destroyer",

                            hp: 4000,

                            remainingUnits: 2,

                            hpLastUnit: 4000,

                            damage: 2500,

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

                            remainingUnits: 8,

                            hpLastUnit: 1500,

                            damage: 900,

                            receivedDamage: 0
                        },

                        {
                            runtimeUnitId:
                                "defender_3",

                            unitTypeId:
                                "destroyer",

                            hp: 4000,

                            remainingUnits: 2,

                            hpLastUnit: 4000,

                            damage: 2500,

                            receivedDamage: 0
                        }

                    ]
                }
            });



        test(
            "multiple fleets resolve consistently",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.combatFinished
                ).toBe(true);
            }
        );


        test(
            "all runtime ids remain unique",
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
            "multi fleet combat remains deterministic",
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
            "multi fleet combat survives serialization",
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
            "fleet unit counts never become negative",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[2]
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
            "fleet hp values never become negative",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[2]
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
            "destroyed fleets contain only destroyed units",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[2]
                    .damage = 999999999;

                const result =
                    resolveCombat(
                        runtime
                    );

                if (
                    result.defenderDefeated
                ) {

                    for (
                        const unit
                        of result
                            .defenderFleet
                            .units
                    ) {

                        expect(
                            unit.remainingUnits
                        ).toBe(0);
                    }
                }
            }
        );


        test(
            "damage events exist in multi fleet combat",
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

                expect(
                    events.length
                ).toBeGreaterThan(0);
            }
        );


        test(
            "overflow chains remain stable in multi fleet combat",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[2]
                    .damage = 999999999;

                const result =
                    resolveCombat(
                        runtime
                    );

                const overflow =
                    result.rounds.flatMap(
                        (round) =>
                            round.overflowEvents
                    );

                for (
                    const event
                    of overflow
                ) {

                    expect(
                        event.overflowDamage
                    ).toBeGreaterThan(0);
                }
            }
        );

    }
);