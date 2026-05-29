import resolveRound
    from "../../app/combat/resolver/resolveRound.js";

describe(
    "resolveRound",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_001",

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
                },

                currentRound: 1
            });



        // ==========================================
        // BASIC ROUND FLOW
        // ==========================================

        test(
            "resolves a combat round",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        combatRuntime
                    );

                expect(result)
                    .toBeDefined();
            }
        );


        test(
            "creates damage events",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        combatRuntime
                    );

                expect(
                    result.damageEvents
                        .length
                ).toBeGreaterThan(0);
            }
        );


        test(
            "attacker deals damage",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        combatRuntime
                    );

                const defender =
                    result
                        .combatRuntime
                        .defenderFleet
                        .units[0];

                expect(
                    defender.hpLastUnit
                ).toBeLessThan(500);
            }
        );


        test(
            "defender deals damage",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const result =
                    resolveRound(
                        combatRuntime
                    );

                const attacker =
                    result
                        .combatRuntime
                        .attackerFleet
                        .units[0];

                expect(
                    attacker.hpLastUnit
                ).toBeLessThan(500);
            }
        );



        // ==========================================
        // OVERFLOW
        // ==========================================

        test(
            "creates overflow events when overkill occurs",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                combatRuntime
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

                const result =
                    resolveRound(
                        combatRuntime
                    );

                expect(
                    result.overflowEvents
                        .length
                ).toBeGreaterThan(0);
            }
        );



        // ==========================================
        // LOSSES
        // ==========================================

        test(
            "tracks destroyed attacker units",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                combatRuntime
                    .defenderFleet
                    .units[0]
                    .damage = 999999;

                const result =
                    resolveRound(
                        combatRuntime
                    );

                expect(
                    result.roundRuntime
                        .attackerDestroyedUnits
                        .length
                ).toBeGreaterThan(0);
            }
        );


        test(
            "tracks destroyed defender units",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                combatRuntime
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

                const result =
                    resolveRound(
                        combatRuntime
                    );

                expect(
                    result.roundRuntime
                        .defenderDestroyedUnits
                        .length
                ).toBeGreaterThan(0);
            }
        );



        // ==========================================
        // SAFETY
        // ==========================================

        test(
            "never creates negative hp",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                combatRuntime
                    .attackerFleet
                    .units[0]
                    .damage = 999999999;

                const result =
                    resolveRound(
                        combatRuntime
                    );

                const defender =
                    result
                        .combatRuntime
                        .defenderFleet
                        .units[0];

                expect(
                    defender.hpLastUnit
                ).toBeGreaterThanOrEqual(
                    0
                );
            }
        );


        test(
            "never creates negative remaining units",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                combatRuntime
                    .attackerFleet
                    .units[0]
                    .damage = 999999999;

                const result =
                    resolveRound(
                        combatRuntime
                    );

                const defender =
                    result
                        .combatRuntime
                        .defenderFleet
                        .units[0];

                expect(
                    defender.remainingUnits
                ).toBeGreaterThanOrEqual(
                    0
                );
            }
        );



        // ==========================================
        // DETERMINISM
        // ==========================================

        test(
            "same combat runtime produces same round result",
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

                expect(resultA)
                    .toEqual(resultB);
            }
        );



        // ==========================================
        // EDGE CASES
        // ==========================================

        test(
            "handles empty fleets",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                combatRuntime
                    .attackerFleet
                    .units = [];

                combatRuntime
                    .defenderFleet
                    .units = [];

                const result =
                    resolveRound(
                        combatRuntime
                    );

                expect(result)
                    .toBeDefined();
            }
        );


        test(
            "destroyed units do not attack",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                combatRuntime
                    .attackerFleet
                    .units[0]
                    .remainingUnits = 0;

                combatRuntime
                    .attackerFleet
                    .units[0]
                    .hpLastUnit = 0;

                const result =
                    resolveRound(
                        combatRuntime
                    );

                expect(
                    result.damageEvents
                        .length
                ).toBe(0);
            }
        );



        // ==========================================
        // INVALID INPUTS
        // ==========================================

        test(
            "returns null for invalid runtime",
            () => {

                const result =
                    resolveRound(
                        null
                    );

                expect(result)
                    .toBeNull();
            }
        );

    }
);