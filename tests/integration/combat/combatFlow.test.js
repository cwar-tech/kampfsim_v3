import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat flow integration",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_integration_001",

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
        // FULL COMBAT FLOW
        // ==========================================

        test(
            "resolves complete combat flow",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        combatRuntime
                    );

                expect(result)
                    .toBeDefined();

                expect(
                    result.rounds.length
                ).toBeGreaterThan(0);
            }
        );


        test(
            "combat eventually finishes",
            () => {

                const combatRuntime =
                    createCombatRuntime();

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
        // EVENT CONSISTENCY
        // ==========================================

        test(
            "creates stable damage events",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        combatRuntime
                    );

                for (
                    const round
                    of result.rounds
                ) {

                    expect(
                        Array.isArray(
                            round.damageEvents
                        )
                    ).toBe(true);
                }
            }
        );


        test(
            "overflow events remain valid",
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

                for (
                    const round
                    of result.rounds
                ) {

                    for (
                        const overflowEvent
                        of round.overflowEvents
                    ) {

                        expect(
                            overflowEvent
                                .overflowDamage
                        ).toBeGreaterThan(0);
                    }
                }
            }
        );



        // ==========================================
        // DETERMINISM
        // ==========================================

        test(
            "same combat produces same result",
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
        // RUNTIME VALIDITY
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

                for (
                    const unit
                    of result
                        .defenderFleet
                        .units
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

                for (
                    const unit
                    of result
                        .defenderFleet
                        .units
                ) {

                    expect(
                        unit.remainingUnits
                    ).toBeGreaterThanOrEqual(
                        0
                    );
                }
            }
        );



        // ==========================================
        // SERIALIZATION
        // ==========================================

        test(
            "combat result is serializable",
            () => {

                const combatRuntime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        combatRuntime
                    );

                expect(
                    () =>
                        JSON.stringify(
                            result
                        )
                ).not.toThrow();
            }
        );



        // ==========================================
        // EDGE CASES
        // ==========================================

        test(
            "handles empty fleets safely",
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
            "destroyed units never attack again",
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

                const hasAttackerEvents =
                    result.damageEvents.some(
                        (event) =>
                            event.sourceRuntimeUnitId ===
                            "attacker_1"
                    );

                expect(
                    hasAttackerEvents
                ).toBe(false);
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