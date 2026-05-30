import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat resolver event integrity",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_resolver_event_integrity_001",

                currentRound: 1,

                maxRounds: 5,

                combatFinished: false,

                attackerDefeated: false,

                defenderDefeated: false,

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
            "combat result contains damageEvents",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    Array.isArray(
                        result.damageEvents
                    )
                ).toBe(true);
            }
        );


        test(
            "damage events contain sourceRuntimeUnitId",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                for (
                    const event
                    of result.damageEvents
                ) {

                    expect(
                        event
                            .sourceRuntimeUnitId
                    ).toBeDefined();
                }
            }
        );


        test(
            "damage events contain targetRuntimeUnitId",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                for (
                    const event
                    of result.damageEvents
                ) {

                    expect(
                        event
                            .targetRuntimeUnitId
                    ).toBeDefined();
                }
            }
        );


        test(
            "damage events contain appliedDamage",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                for (
                    const event
                    of result.damageEvents
                ) {

                    expect(
                        typeof event
                            .appliedDamage
                    ).toBe(
                        "number"
                    );
                }
            }
        );


        test(
            "event integrity remains deterministic",
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
                    resultA
                ).toEqual(
                    resultB
                );
            }
        );

    }
);