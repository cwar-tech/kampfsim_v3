import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat replay compatibility",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_replay_compat_001",

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
            "combat replay snapshot remains valid",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const replaySnapshot =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    replaySnapshot
                ).toEqual(
                    result
                );
            }
        );


        test(
            "replay preserves round order",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const replay =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                for (
                    let i = 1;
                    i < replay.rounds.length;
                    i++
                ) {

                    expect(
                        replay.rounds[i]
                            .round
                    ).toBeGreaterThan(
                        replay.rounds[i - 1]
                            .round
                    );
                }
            }
        );


        test(
            "replay preserves damage event ordering",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const replay =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                const originalEvents =
                    result.rounds.flatMap(
                        (round) =>
                            round.damageEvents
                    );

                const replayEvents =
                    replay.rounds.flatMap(
                        (round) =>
                            round.damageEvents
                    );

                expect(
                    replayEvents
                ).toEqual(
                    originalEvents
                );
            }
        );


        test(
            "replay preserves overflow chains",
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

                const replay =
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

                const replayOverflow =
                    replay.rounds.flatMap(
                        (round) =>
                            round.overflowEvents
                    );

                expect(
                    replayOverflow
                ).toEqual(
                    originalOverflow
                );
            }
        );


        test(
            "replay preserves fleet states",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const replay =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    replay.attackerFleet
                ).toEqual(
                    result.attackerFleet
                );

                expect(
                    replay.defenderFleet
                ).toEqual(
                    result.defenderFleet
                );
            }
        );


        test(
            "replay preserves winner state",
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

                const replay =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    replay.attackerDefeated
                ).toBe(
                    result.attackerDefeated
                );

                expect(
                    replay.defenderDefeated
                ).toBe(
                    result.defenderDefeated
                );
            }
        );


        test(
            "replay preserves combatFinished state",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const replay =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    replay.combatFinished
                ).toBe(
                    result.combatFinished
                );
            }
        );


        test(
            "replay snapshot remains deterministic",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                const replayA =
                    JSON.stringify(
                        resolveCombat(
                            runtimeA
                        )
                    );

                const replayB =
                    JSON.stringify(
                        resolveCombat(
                            runtimeB
                        )
                    );

                expect(
                    replayA
                ).toBe(
                    replayB
                );
            }
        );


        test(
            "replay snapshot remains json safe",
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