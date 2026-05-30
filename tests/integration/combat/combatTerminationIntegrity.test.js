import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat termination integrity",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_termination_001",

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
            "combat eventually terminates",
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
            "combat never exceeds max rounds",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime.maxRounds = 3;

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.rounds.length
                ).toBeLessThanOrEqual(
                    3
                );
            }
        );


        test(
            "defender defeat terminates combat",
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

                expect(
                    result.defenderDefeated
                ).toBe(true);

                expect(
                    result.combatFinished
                ).toBe(true);
            }
        );


        test(
            "attacker defeat terminates combat",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .defenderFleet
                    .units[0]
                    .damage = 999999;

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.attackerDefeated
                ).toBe(true);

                expect(
                    result.combatFinished
                ).toBe(true);
            }
        );


        test(
            "destroyed fleets contain no living units",
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
            "combat termination remains deterministic",
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
                    resultA.combatFinished
                ).toBe(
                    resultB.combatFinished
                );

                expect(
                    resultA.attackerDefeated
                ).toBe(
                    resultB.attackerDefeated
                );

                expect(
                    resultA.defenderDefeated
                ).toBe(
                    resultB.defenderDefeated
                );
            }
        );


        test(
            "combat termination survives serialization",
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
                    restored.combatFinished
                ).toBe(
                    result.combatFinished
                );
            }
        );


        test(
            "empty combat terminates safely",
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
                    result.combatFinished
                ).toBe(true);
            }
        );


        test(
            "terminated combat never contains negative values",
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

                    expect(
                        unit.hpLastUnit
                    ).toBeGreaterThanOrEqual(
                        0
                    );
                }
            }
        );

    }
);