import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "replay determinism",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_replay_001",

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



        // ==========================================
        // FULL RESULT DETERMINISM
        // ==========================================

        test(
            "same combat runtime produces identical combat result",
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

                expect(resultA)
                    .toEqual(resultB);
            }
        );



        // ==========================================
        // ROUND DETERMINISM
        // ==========================================

        test(
            "round count remains deterministic",
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
                    resultA.rounds.length
                ).toBe(
                    resultB.rounds.length
                );
            }
        );



        // ==========================================
        // EVENT DETERMINISM
        // ==========================================

        test(
            "damage events remain deterministic",
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
                    resultA.damageEvents
                ).toEqual(
                    resultB.damageEvents
                );
            }
        );


        test(
            "overflow events remain deterministic",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                runtimeA
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

                runtimeB
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

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



        // ==========================================
        // SERIALIZATION
        // ==========================================

        test(
            "serialized combat result remains deterministic",
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

                const serializedA =
                    JSON.stringify(
                        resultA
                    );

                const serializedB =
                    JSON.stringify(
                        resultB
                    );

                expect(
                    serializedA
                ).toBe(
                    serializedB
                );
            }
        );



        // ==========================================
        // STATE CONSISTENCY
        // ==========================================

        test(
            "combatFinished state remains deterministic",
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
            }
        );


        test(
            "winner state remains deterministic",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                runtimeA
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

                runtimeB
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

                const resultA =
                    resolveCombat(
                        runtimeA
                    );

                const resultB =
                    resolveCombat(
                        runtimeB
                    );

                expect(
                    resultA.defenderDefeated
                ).toBe(
                    resultB.defenderDefeated
                );
            }
        );



        // ==========================================
        // REPLAY SAFETY
        // ==========================================

        test(
            "combat result remains replay safe",
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



        // ==========================================
        // EDGE CASES
        // ==========================================

        test(
            "empty combat remains deterministic",
            () => {

                const runtimeA =
                    createCombatRuntime();

                const runtimeB =
                    createCombatRuntime();

                runtimeA
                    .attackerFleet
                    .units = [];

                runtimeA
                    .defenderFleet
                    .units = [];

                runtimeB
                    .attackerFleet
                    .units = [];

                runtimeB
                    .defenderFleet
                    .units = [];

                const resultA =
                    resolveCombat(
                        runtimeA
                    );

                const resultB =
                    resolveCombat(
                        runtimeB
                    );

                expect(resultA)
                    .toEqual(resultB);
            }
        );

    }
);