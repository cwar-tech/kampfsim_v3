import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

import buildUnitRuntime
    from "../../../app/combat/runtime/buildUnitRuntime.js";

describe(
    "combat resolver runtime hardening",
    () => {

        // ==================================================
        // FACTORIES
        // ==================================================

        const createUnit =
            (
                runtimeUnitId
            ) =>
                buildUnitRuntime({

                    runtimeUnitId,

                    shipTemplateId:
                        "fighter",

                    unitCount: 5,

                    baseStats: {

                        hp: 500,

                        damage: 100,

                        armorMultiplier:
                            0.25,

                        penetrationMultiplier:
                            1.0
                    },

                    modifiers: []
                });


        const createRuntime =
            () => ({

                combatId:
                    "combat_runtime_hardening_001",

                currentRound: 1,

                maxRounds: 5,

                attackerFleet: {

                    units: [

                        createUnit(
                            "attacker_1"
                        )
                    ]
                },

                defenderFleet: {

                    units: [

                        createUnit(
                            "defender_1"
                        )
                    ]
                }
            });



        // ==================================================
        // NULL SAFETY
        // ==================================================

        test(
            "handles null runtime safely",
            () => {

                expect(
                    () =>
                        resolveCombat(
                            null
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles undefined runtime safely",
            () => {

                expect(
                    () =>
                        resolveCombat(
                            undefined
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles empty runtime safely",
            () => {

                expect(
                    () =>
                        resolveCombat(
                            {}
                        )
                ).not.toThrow();
            }
        );



        // ==================================================
        // MALFORMED STRUCTURES
        // ==================================================

        test(
            "handles malformed attackerFleet safely",
            () => {

                const runtime =
                    createRuntime();

                runtime.attackerFleet =
                    null;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles malformed defenderFleet safely",
            () => {

                const runtime =
                    createRuntime();

                runtime.defenderFleet =
                    null;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles malformed unit arrays safely",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .attackerFleet
                    .units = null;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles malformed units safely",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .attackerFleet
                    .units = [
                        null,
                        undefined
                    ];

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );



        // ==================================================
        // INVALID NUMBERS
        // ==================================================

        test(
            "handles negative currentRound safely",
            () => {

                const runtime =
                    createRuntime();

                runtime.currentRound =
                    -10;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles negative maxRounds safely",
            () => {

                const runtime =
                    createRuntime();

                runtime.maxRounds =
                    -5;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles NaN currentRound safely",
            () => {

                const runtime =
                    createRuntime();

                runtime.currentRound =
                    NaN;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles NaN remainingHp safely",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .remainingHp = NaN;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles Infinity remainingHp safely",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .remainingHp =
                    Infinity;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );



        // ==================================================
        // COMBAT ID
        // ==================================================

        test(
            "handles malformed combatId safely",
            () => {

                const runtime =
                    createRuntime();

                runtime.combatId =
                    null;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );



        // ==================================================
        // IMMUTABILITY
        // ==================================================

        test(
            "never mutates original runtime",
            () => {

                const runtime =
                    createRuntime();

                const original =
                    JSON.parse(
                        JSON.stringify(
                            runtime
                        )
                    );

                resolveCombat(
                    runtime
                );

                expect(
                    runtime
                ).toEqual(
                    original
                );
            }
        );



        // ==================================================
        // DETERMINISM
        // ==================================================

        test(
            "remains deterministic across repeated executions",
            () => {

                const runtimeA =
                    createRuntime();

                const runtimeB =
                    createRuntime();

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


        test(
            "round history remains deterministic",
            () => {

                const resultA =
                    resolveCombat(
                        createRuntime()
                    );

                const resultB =
                    resolveCombat(
                        createRuntime()
                    );

                expect(
                    resultA.rounds
                ).toEqual(
                    resultB.rounds
                );
            }
        );



        // ==================================================
        // SERIALIZATION
        // ==================================================

        test(
            "survives serialization replay",
            () => {

                const runtime =
                    createRuntime();

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
                    replay
                ).toEqual(
                    result
                );
            }
        );


        test(
            "creates replay safe result",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
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


        test(
            "creates serializable rounds",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                expect(
                    () =>
                        JSON.stringify(
                            result.rounds
                        )
                ).not.toThrow();
            }
        );



        // ==================================================
        // FLEET EDGE CASES
        // ==================================================

        test(
            "handles empty fleets safely",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .attackerFleet
                    .units = [];

                runtime
                    .defenderFleet
                    .units = [];

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles attacker only combat safely",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .defenderFleet
                    .units = [];

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles defender only combat safely",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .attackerFleet
                    .units = [];

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );



        // ==================================================
        // ROUND LIMITS
        // ==================================================

        test(
            "combat finishes at maxRounds",
            () => {

                const runtime =
                    createRuntime();

                runtime.maxRounds = 1;

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.combatFinished
                ).toBe(true);
            }
        );


        test(
            "never exceeds configured maxRounds",
            () => {

                const runtime =
                    createRuntime();

                runtime.maxRounds = 3;

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result.currentRound
                ).toBeLessThanOrEqual(
                    3
                );
            }
        );



        // ==================================================
        // MASS BATTLE
        // ==================================================

        test(
            "handles massive fleet battles",
            () => {

                const createMassUnit =
                    (id) =>
                        buildUnitRuntime({

                            runtimeUnitId:
                                id,

                            shipTemplateId:
                                "fighter",

                            unitCount:
                                100000,

                            baseStats: {

                                hp: 500,

                                damage: 100,

                                armorMultiplier:
                                    0.25,

                                penetrationMultiplier:
                                    1.0
                            },

                            modifiers: []
                        });

                const runtime = {

                    combatId:
                        "mass_battle_001",

                    currentRound: 1,

                    maxRounds: 10,

                    attackerFleet: {

                        units: [

                            createMassUnit(
                                "attacker_mass"
                            )
                        ]
                    },

                    defenderFleet: {

                        units: [

                            createMassUnit(
                                "defender_mass"
                            )
                        ]
                    }
                };

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(result)
                    .toBeDefined();

                expect(
                    result.rounds.length
                ).toBeGreaterThan(0);
            }
        );



        // ==================================================
        // OVERFLOW STABILITY
        // ==================================================

        test(
            "overflow chains remain stable",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .totalDamage =
                    9999999;

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(result)
                    .toBeDefined();

                expect(
                    Array.isArray(
                        result.rounds
                    )
                ).toBe(true);
            }
        );



        // ==================================================
        // DESTROYED UNITS
        // ==================================================

        test(
            "destroyed units never attack again",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .remainingHp = 0;

                const result =
                    resolveCombat(
                        runtime
                    );

                const damageEvents =
                    result.rounds.flatMap(
                        (round) =>
                            round.damageEvents
                    );

                const invalidAttack =
                    damageEvents.find(
                        (event) =>

                            event
                                .sourceRuntimeUnitId ===
                            "attacker_1"
                    );

                expect(
                    invalidAttack
                ).toBeUndefined();
            }
        );

    }
);