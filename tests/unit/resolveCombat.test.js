import resolveCombat
    from "../../app/combat/resolver/resolveCombat.js";

describe(
    "resolveCombat",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_001",

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
        // BASIC COMBAT FLOW
        // ==========================================

        test(
            "resolves full combat",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        combatRuntime
                    );

                expect(result)
                    .toBeDefined();
            }
        );


        test(
            "creates combat rounds",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        combatRuntime
                    );

                expect(
                    result.rounds.length
                ).toBeGreaterThan(0);
            }
        );


        test(
            "increments rounds deterministically",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        combatRuntime
                    );

                expect(
                    result.currentRound
                ).toBeGreaterThan(1);
            }
        );



        // ==========================================
        // WIN CONDITIONS
        // ==========================================

        test(
            "detects defender defeat",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                combatRuntime
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

                const result =
                    resolveCombat(
                        combatRuntime
                    );

                expect(
                    result.defenderDefeated
                ).toBe(true);
            }
        );


        test(
            "detects attacker defeat",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                combatRuntime
                    .defenderFleet
                    .units[0]
                    .damage = 999999;

                const result =
                    resolveCombat(
                        combatRuntime
                    );

                expect(
                    result.attackerDefeated
                ).toBe(true);
            }
        );


        test(
            "marks combat as finished",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                combatRuntime
                    .attackerFleet
                    .units[0]
                    .damage = 999999;

                const result =
                    resolveCombat(
                        combatRuntime
                    );

                expect(
                    result.combatFinished
                ).toBe(true);
            }
        );



        // ==========================================
        // DRAW CONDITIONS
        // ==========================================

        test(
            "stops combat at max rounds",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                combatRuntime.maxRounds =
                    1;

                const result =
                    resolveCombat(
                        combatRuntime
                    );

                expect(
                    result.currentRound
                ).toBeLessThanOrEqual(
                    1
                );
            }
        );


        test(
            "supports draw states",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                combatRuntime.maxRounds =
                    1;

                const result =
                    resolveCombat(
                        combatRuntime
                    );

                expect(
                    result.combatFinished
                ).toBe(true);
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
                    resolveCombat(
                        combatRuntime
                    );

                const defender =
                    result
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
                    resolveCombat(
                        combatRuntime
                    );

                const defender =
                    result
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
            "same combat runtime produces same combat result",
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
                    resolveCombat(
                        combatRuntime
                    );

                expect(result)
                    .toBeDefined();
            }
        );


        test(
            "destroyed units do not continue combat",
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
                    resolveCombat(
                        combatRuntime
                    );

                expect(
                    result.damageEvents
                        ?.length || 0
                ).toBe(0);
            }
        );



        // ==========================================
        // INVALID INPUTS
        // ==========================================

        test(
            "returns null for invalid combat runtime",
            () => {

                const result =
                    resolveCombat(
                        null
                    );

                expect(result)
                    .toBeNull();
            }
        );

    }
);