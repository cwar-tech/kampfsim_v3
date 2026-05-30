import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "runtime invariant recovery",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_invariant_001",

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
                        }

                    ]
                }
            });



        test(
            "recovered runtime never contains negative hp",
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

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                const allUnits = [

                    ...restored
                        .attackerFleet
                        .units,

                    ...restored
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
            "recovered runtime never contains negative units",
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

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                const allUnits = [

                    ...restored
                        .attackerFleet
                        .units,

                    ...restored
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
            "destroyed units always have zero hp",
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

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                const allUnits = [

                    ...restored
                        .attackerFleet
                        .units,

                    ...restored
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
            "living units always have hp",
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

                const allUnits = [

                    ...restored
                        .attackerFleet
                        .units,

                    ...restored
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
            "runtimeUnitIds remain unique after recovery",
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

                const ids =
                    new Set();

                const allUnits = [

                    ...restored
                        .attackerFleet
                        .units,

                    ...restored
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
            "recovered rounds always remain ordered",
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

                for (
                    let i = 1;
                    i < restored.rounds.length;
                    i++
                ) {

                    expect(
                        restored.rounds[i]
                            .round
                    ).toBeGreaterThan(
                        restored.rounds[i - 1]
                            .round
                    );
                }
            }
        );


        test(
            "combatFinished remains boolean after recovery",
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
                    typeof restored
                        .combatFinished
                ).toBe(
                    "boolean"
                );
            }
        );


        test(
            "recovered events always contain source ids",
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

                for (
                    const round
                    of restored.rounds
                ) {

                    for (
                        const event
                        of round.damageEvents
                    ) {

                        expect(
                            typeof event
                                .sourceRuntimeUnitId
                        ).toBe(
                            "string"
                        );
                    }
                }
            }
        );


        test(
            "recovered overflow events always contain overflow damage",
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

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                for (
                    const round
                    of restored.rounds
                ) {

                    for (
                        const event
                        of round.overflowEvents
                    ) {

                        expect(
                            event.overflowDamage
                        ).toBeGreaterThan(0);
                    }
                }
            }
        );

    }
);