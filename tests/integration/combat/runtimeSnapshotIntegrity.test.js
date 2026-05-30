import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "runtime snapshot integrity",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_snapshot_001",

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
            "snapshot preserves combat id",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const snapshot =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    snapshot.combatId
                ).toBe(
                    result.combatId
                );
            }
        );


        test(
            "snapshot preserves current round",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const snapshot =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    snapshot.currentRound
                ).toBe(
                    result.currentRound
                );
            }
        );


        test(
            "snapshot preserves attacker fleet",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const snapshot =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    snapshot.attackerFleet
                ).toEqual(
                    result.attackerFleet
                );
            }
        );


        test(
            "snapshot preserves defender fleet",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const snapshot =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    snapshot.defenderFleet
                ).toEqual(
                    result.defenderFleet
                );
            }
        );


        test(
            "snapshot preserves rounds",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const snapshot =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    snapshot.rounds
                ).toEqual(
                    result.rounds
                );
            }
        );


        test(
            "snapshot preserves destroyed unit tracking",
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

                const snapshot =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                const originalDestroyed =
                    result.rounds.flatMap(
                        (round) => [

                            ...round
                                .roundRuntime
                                .attackerDestroyedUnits,

                            ...round
                                .roundRuntime
                                .defenderDestroyedUnits
                        ]
                    );

                const snapshotDestroyed =
                    snapshot.rounds.flatMap(
                        (round) => [

                            ...round
                                .roundRuntime
                                .attackerDestroyedUnits,

                            ...round
                                .roundRuntime
                                .defenderDestroyedUnits
                        ]
                    );

                expect(
                    snapshotDestroyed
                ).toEqual(
                    originalDestroyed
                );
            }
        );


        test(
            "snapshot preserves damage event count",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const snapshot =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                const originalCount =
                    result.rounds.reduce(
                        (
                            total,
                            round
                        ) =>
                            total +
                            round.damageEvents
                                .length,
                        0
                    );

                const snapshotCount =
                    snapshot.rounds.reduce(
                        (
                            total,
                            round
                        ) =>
                            total +
                            round.damageEvents
                                .length,
                        0
                    );

                expect(
                    snapshotCount
                ).toBe(
                    originalCount
                );
            }
        );


        test(
            "snapshot preserves overflow event count",
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

                const snapshot =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                const originalCount =
                    result.rounds.reduce(
                        (
                            total,
                            round
                        ) =>
                            total +
                            round.overflowEvents
                                .length,
                        0
                    );

                const snapshotCount =
                    snapshot.rounds.reduce(
                        (
                            total,
                            round
                        ) =>
                            total +
                            round.overflowEvents
                                .length,
                        0
                    );

                expect(
                    snapshotCount
                ).toBe(
                    originalCount
                );
            }
        );


        test(
            "snapshot never contains functions",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                const snapshot =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    typeof snapshot
                ).not.toBe(
                    "function"
                );
            }
        );

    }
);