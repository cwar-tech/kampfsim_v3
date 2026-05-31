import calculateLosses
    from "../../app/combat/resolver/calculateLosses.js";

describe(
    "calculateLosses",
    () => {

        const createCombatRuntime =
            () => ({

                attackerFleet: {

                    units: [

                        {
                            runtimeUnitId:
                                "attacker_1",

                            hp: 500,

                            remainingUnits: 10,

                            hpLastUnit: 500,

                            receivedDamage: 0
                        }

                    ]
                },

                defenderFleet: {

                    units: [

                        {
                            runtimeUnitId:
                                "defender_1",

                            hp: 1000,

                            remainingUnits: 5,

                            hpLastUnit: 1000,

                            receivedDamage: 0
                        }

                    ]
                }
            });

        const createRoundRuntime =
            () => ({

                attackerDestroyedUnits:
                    [],

                defenderDestroyedUnits:
                    []
            });



        // ==========================================
        // BASIC LOSSES
        // ==========================================

        test(
            "calculates destroyed attacker units correctly",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const roundRuntime =
                    createRoundRuntime();

                combatRuntime
                    .attackerFleet
                    .units[0]
                    .receivedDamage =
                    1500;

                calculateLosses({
                    combatRuntime,
                    roundRuntime
                });

                expect(
                    combatRuntime
                        .attackerFleet
                        .units[0]
                        .remainingUnits
                ).toBe(7);
            }
        );


        test(
            "calculates destroyed defender units correctly",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const roundRuntime =
                    createRoundRuntime();

                combatRuntime
                    .defenderFleet
                    .units[0]
                    .receivedDamage =
                    3000;

                calculateLosses({
                    combatRuntime,
                    roundRuntime
                });

                expect(
                    combatRuntime
                        .defenderFleet
                        .units[0]
                        .remainingUnits
                ).toBe(2);
            }
        );



        // ==========================================
        // PARTIAL DAMAGE
        // ==========================================

        test(
            "handles partial hp damage correctly",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const roundRuntime =
                    createRoundRuntime();

                combatRuntime
                    .attackerFleet
                    .units[0]
                    .receivedDamage =
                    200;

                calculateLosses({
                    combatRuntime,
                    roundRuntime
                });

                expect(
                    combatRuntime
                        .attackerFleet
                        .units[0]
                        .remainingUnits
                ).toBe(10);

                expect(
                    combatRuntime
                        .attackerFleet
                        .units[0]
                        .hpLastUnit
                ).toBe(300);
            }
        );



        // ==========================================
        // COMPLETE DESTRUCTION
        // ==========================================

        test(
            "handles full attacker destruction",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const roundRuntime =
                    createRoundRuntime();

                combatRuntime
                    .attackerFleet
                    .units[0]
                    .receivedDamage =
                    999999;

                calculateLosses({
                    combatRuntime,
                    roundRuntime
                });

                expect(
                    combatRuntime
                        .attackerFleet
                        .units[0]
                        .remainingUnits
                ).toBe(0);

                expect(
                    combatRuntime
                        .attackerFleet
                        .units[0]
                        .hpLastUnit
                ).toBe(0);
            }
        );


        test(
            "adds destroyed attacker units to roundRuntime",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const roundRuntime =
                    createRoundRuntime();

                combatRuntime
                    .attackerFleet
                    .units[0]
                    .receivedDamage =
                    999999;

                calculateLosses({
                    combatRuntime,
                    roundRuntime
                });

                expect(
                    roundRuntime
                        .attackerDestroyedUnits
                ).toContain(
                    "attacker_1"
                );
            }
        );


        test(
            "adds destroyed defender units to roundRuntime",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const roundRuntime =
                    createRoundRuntime();

                combatRuntime
                    .defenderFleet
                    .units[0]
                    .receivedDamage =
                    999999;

                calculateLosses({
                    combatRuntime,
                    roundRuntime
                });

                expect(
                    roundRuntime
                        .defenderDestroyedUnits
                ).toContain(
                    "defender_1"
                );
            }
        );



        // ==========================================
        // SAFETY
        // ==========================================

        test(
            "never creates negative remaining units",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const roundRuntime =
                    createRoundRuntime();

                combatRuntime
                    .attackerFleet
                    .units[0]
                    .receivedDamage =
                    999999999;

                calculateLosses({
                    combatRuntime,
                    roundRuntime
                });

                expect(
                    combatRuntime
                        .attackerFleet
                        .units[0]
                        .remainingUnits
                ).toBeGreaterThanOrEqual(
                    0
                );
            }
        );


        test(
            "never creates negative hpLastUnit",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const roundRuntime =
                    createRoundRuntime();

                combatRuntime
                    .attackerFleet
                    .units[0]
                    .receivedDamage =
                    999999999;

                calculateLosses({
                    combatRuntime,
                    roundRuntime
                });

                expect(
                    combatRuntime
                        .attackerFleet
                        .units[0]
                        .hpLastUnit
                ).toBeGreaterThanOrEqual(
                    0
                );
            }
        );



        // ==========================================
        // INVALID INPUTS
        // ==========================================

        test(
            "returns null for invalid combatRuntime",
            () => {

                const result =
                    calculateLosses({
                        combatRuntime:
                            null,

                        roundRuntime:
                            {}
                    });

                expect(result)
                    .toBeNull();
            }
        );


        test(
            "returns null for invalid roundRuntime",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const result =
                    calculateLosses({
                        combatRuntime,

                        roundRuntime:
                            null
                    });

                expect(result)
                    .toBeNull();
            }
        );



        // ==========================================
        // DETERMINISM
        // ==========================================

        test(
            "same runtime always produces same result",
            () => {

                const combatRuntimeA =
                    createCombatRuntime();

                const combatRuntimeB =
                    createCombatRuntime();

                const roundRuntimeA =
                    createRoundRuntime();

                const roundRuntimeB =
                    createRoundRuntime();

                combatRuntimeA
                    .attackerFleet
                    .units[0]
                    .receivedDamage =
                    1500;

                combatRuntimeB
                    .attackerFleet
                    .units[0]
                    .receivedDamage =
                    1500;

                const resultA =
                    calculateLosses({
                        combatRuntime:
                            combatRuntimeA,

                        roundRuntime:
                            roundRuntimeA
                    });

                const resultB =
                    calculateLosses({
                        combatRuntime:
                            combatRuntimeB,

                        roundRuntime:
                            roundRuntimeB
                    });

                expect(resultA)
                    .toEqual(resultB);
            }
        );

    }
);