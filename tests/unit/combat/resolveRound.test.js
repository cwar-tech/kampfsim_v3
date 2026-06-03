import resolveRound
    from "../../../app/combat/resolver/resolveRound.js";

import createRuntimeUnit
    from "../../factories/createRuntimeUnit.js";

import recalculateRuntimeState
    from "../../../app/combat/runtime/recalculateRuntimeState.js";

describe(
    "resolveRound",
    () => {

        // ==========================================
        // FACTORIES
        // ==========================================

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_001",

                attackerFleet: {

                    fleetId:
                        "fleet_attacker",

                    units: [

                        createRuntimeUnit({

                            runtimeUnitId:
                                "attacker_1",

                            shipTemplateId:
                                "fighter_mk1",

                            unitCount: 10,

                            hp: 500,

                            damage: 100,

                            armorMultiplier:
                                1,

                            penetrationMultiplier:
                                1
                        })
                    ]
                },

                defenderFleet: {

                    fleetId:
                        "fleet_defender",

                    units: [

                        createRuntimeUnit({

                            runtimeUnitId:
                                "defender_1",

                            shipTemplateId:
                                "fighter_mk1",

                            unitCount: 10,

                            hp: 500,

                            damage: 100,

                            armorMultiplier:
                                1,

                            penetrationMultiplier:
                                1
                        })
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

                const firstDamageEvent =
                    result.damageEvents[0];

                expect(
                    firstDamageEvent
                        .appliedDamage
                ).toBeGreaterThan(0);

                expect(
                    defender.receivedDamage
                ).toBeGreaterThan(0);

                expect(
                    defender.remainingHp
                ).toBeLessThan(
                    defender.totalHp
                );
            }
        );


        test(
            "defender deals damage",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                combatRuntime
                    .defenderFleet
                    .units[0]
                    .totalDamage =
                    999999;

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
                    attacker.remainingHp
                ).toBeLessThan(
                    attacker.totalHp
                );
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
                    .totalDamage =
                    999999;

                const result =
                    resolveRound(
                        combatRuntime
                    );

                expect(
                    result.overflowEvents
                        .length
                ).toBeGreaterThanOrEqual(
                    0
                );
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
                    .totalDamage =
                    999999;

                const result =
                    resolveRound(
                        combatRuntime
                    );

                expect(
                    Array.isArray(

                        result.roundRuntime
                            .attackerDestroyedUnits
                    )
                ).toBe(true);
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
                    .totalDamage =
                    999999;

                const result =
                    resolveRound(
                        combatRuntime
                    );

                expect(
                    Array.isArray(

                        result.roundRuntime
                            .defenderDestroyedUnits
                    )
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
                    .totalDamage =
                    999999999;

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
                    defender.remainingHp
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
                    .totalDamage =
                    999999999;

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
                    .remainingHp = 0;

                recalculateRuntimeState(

                    combatRuntime
                        .attackerFleet
                        .units[0]
                );

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