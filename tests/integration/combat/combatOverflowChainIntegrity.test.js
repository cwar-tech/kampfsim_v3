import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat overflow chain integrity",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_overflow_001",

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
                                "bomber",

                            hp: 500,

                            remainingUnits: 10,

                            hpLastUnit: 500,

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

                            remainingUnits: 5,

                            hpLastUnit: 500,

                            damage: 100,

                            receivedDamage: 0
                        },

                        {
                            runtimeUnitId:
                                "defender_2",

                            unitTypeId:
                                "fighter",

                            hp: 500,

                            remainingUnits: 5,

                            hpLastUnit: 500,

                            damage: 100,

                            receivedDamage: 0
                        }

                    ]
                }
            });



        test(
            "overflow chains are created",
            () => {

                const runtime =
                    createCombatRuntime();

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
            "overflow damage is always positive",
            () => {

                const runtime =
                    createCombatRuntime();

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


        test(
            "overflow chains remain deterministic",
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

                const overflowA =
                    resultA.rounds.flatMap(
                        (round) =>
                            round.overflowEvents
                    );

                const overflowB =
                    resultB.rounds.flatMap(
                        (round) =>
                            round.overflowEvents
                    );

                expect(
                    overflowA
                ).toEqual(
                    overflowB
                );
            }
        );


        test(
            "overflow chains survive serialization",
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

                const originalOverflow =
                    result.rounds.flatMap(
                        (round) =>
                            round.overflowEvents
                    );

                const restoredOverflow =
                    restored.rounds.flatMap(
                        (round) =>
                            round.overflowEvents
                    );

                expect(
                    restoredOverflow
                ).toEqual(
                    originalOverflow
                );
            }
        );


        test(
            "overflow never creates negative hp",
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
            "overflow destroys fleets consistently",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.defenderDefeated
                ).toBe(true);
            }
        );


        test(
            "overflow events always contain source ids",
            () => {

                const runtime =
                    createCombatRuntime();

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
                        typeof event
                            .sourceRuntimeUnitId
                    ).toBe(
                        "string"
                    );
                }
            }
        );


        test(
            "overflow events always contain target ids",
            () => {

                const runtime =
                    createCombatRuntime();

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
                        typeof event
                            .targetRuntimeUnitId
                    ).toBe(
                        "string"
                    );
                }
            }
        );

    }
);