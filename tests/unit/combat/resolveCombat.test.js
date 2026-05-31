import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat resolver runtime hardening",
    () => {

        const createRuntime =
            () => ({

                combatId:
                    "combat_runtime_hardening_001",

                currentRound: 1,

                maxRounds: 5,

                attackerFleet: {

                    units: [

                        {
                            runtimeUnitId:
                                "attacker_1",

                            hp: 500,

                            hpLastUnit: 500,

                            remainingUnits: 5,

                            damage: 100,

                            receivedDamage: 0
                        }
                    ]
                },

                defenderFleet: {

                    units: [

                        {
                            runtimeUnitId:
                                "defender_1",

                            hp: 500,

                            hpLastUnit: 500,

                            remainingUnits: 5,

                            damage: 100,

                            receivedDamage: 0
                        }
                    ]
                }
            });



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
            "handles NaN hp safely",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .hp = NaN;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles Infinity hp safely",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .hp = Infinity;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


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
            "handles malformed defender unit arrays safely",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .defenderFleet
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
            "handles NaN remainingUnits safely",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .remainingUnits = NaN;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles Infinity remainingUnits safely",
            () => {

                const runtime =
                    createRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .remainingUnits = Infinity;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles missing runtimeUnitId safely",
            () => {

                const runtime =
                    createRuntime();

                delete runtime
                    .attackerFleet
                    .units[0]
                    .runtimeUnitId;

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


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


        test(
            "creates rounds array safely",
            () => {

                const runtime =
                    createRuntime();

                runtime.rounds =
                    null;

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    Array.isArray(
                        result.rounds
                    )
                ).toBe(true);
            }
        );


        test(
            "creates valid combatFinished flag",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                expect(
                    typeof result.combatFinished
                ).toBe(
                    "boolean"
                );
            }
        );


        test(
            "creates valid attackerDefeated flag",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                expect(
                    typeof result.attackerDefeated
                ).toBe(
                    "boolean"
                );
            }
        );


        test(
            "creates valid defenderDefeated flag",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                expect(
                    typeof result.defenderDefeated
                ).toBe(
                    "boolean"
                );
            }
        );


        test(
            "creates rounds history",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                expect(
                    Array.isArray(
                        result.rounds
                    )
                ).toBe(true);
            }
        );


        test(
            "stores at least one round",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                expect(
                    result.rounds.length
                ).toBeGreaterThanOrEqual(
                    1
                );
            }
        );


        test(
            "creates valid currentRound",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                expect(
                    typeof result.currentRound
                ).toBe(
                    "number"
                );
            }
        );


        test(
            "creates valid maxRounds",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                expect(
                    typeof result.maxRounds
                ).toBe(
                    "number"
                );
            }
        );


        test(
            "creates valid attackerFleet",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                expect(
                    result.attackerFleet
                ).toBeDefined();
            }
        );


        test(
            "creates valid defenderFleet",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                expect(
                    result.defenderFleet
                ).toBeDefined();
            }
        );


        test(
            "creates valid damageEvents array",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                expect(
                    Array.isArray(
                        result.damageEvents
                    )
                ).toBe(true);
            }
        );


        test(
            "never creates negative remainingUnits",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                const allUnits = [

                    ...result
                        .attackerFleet
                        .units,

                    ...result
                        .defenderFleet
                        .units
                ];

                for (
                    const unit
                    of allUnits
                ) {

                    expect(
                        unit.remainingUnits
                    ).toBeGreaterThanOrEqual(
                        0
                    );
                }
            }
        );


        test(
            "never creates negative hpLastUnit",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                const allUnits = [

                    ...result
                        .attackerFleet
                        .units,

                    ...result
                        .defenderFleet
                        .units
                ];

                for (
                    const unit
                    of allUnits
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


        test(
            "creates valid round objects",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                for (
                    const round
                    of result.rounds
                ) {

                    expect(
                        typeof round
                    ).toBe(
                        "object"
                    );
                }
            }
        );


        test(
            "creates valid round numbers",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                for (
                    const round
                    of result.rounds
                ) {

                    expect(
                        typeof round.round
                    ).toBe(
                        "number"
                    );
                }
            }
        );


        test(
            "creates valid roundRuntime objects",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                for (
                    const round
                    of result.rounds
                ) {

                    expect(
                        round.roundRuntime
                    ).toBeDefined();
                }
            }
        );


        test(
            "creates valid damageEvents arrays per round",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
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
            "creates valid overflowEvents arrays per round",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                for (
                    const round
                    of result.rounds
                ) {

                    expect(
                        Array.isArray(
                            round.overflowEvents
                        )
                    ).toBe(true);
                }
            }
        );


        test(
            "never creates negative round numbers",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                for (
                    const round
                    of result.rounds
                ) {

                    expect(
                        round.round
                    ).toBeGreaterThan(
                        0
                    );
                }
            }
        );


        test(
            "creates attackerFleet units array safely",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                expect(
                    Array.isArray(
                        result
                            .attackerFleet
                            .units
                    )
                ).toBe(true);
            }
        );


        test(
            "creates defenderFleet units array safely",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                expect(
                    Array.isArray(
                        result
                            .defenderFleet
                            .units
                    )
                ).toBe(true);
            }
        );


        test(
            "creates valid runtimeUnitIds",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                const allUnits = [

                    ...result
                        .attackerFleet
                        .units,

                    ...result
                        .defenderFleet
                        .units
                ];

                for (
                    const unit
                    of allUnits
                ) {

                    expect(
                        typeof unit.runtimeUnitId
                    ).toBe(
                        "string"
                    );
                }
            }
        );


        test(
            "creates valid hp values",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                const allUnits = [

                    ...result
                        .attackerFleet
                        .units,

                    ...result
                        .defenderFleet
                        .units
                ];

                for (
                    const unit
                    of allUnits
                ) {

                    expect(
                        typeof unit.hp
                    ).toBe(
                        "number"
                    );
                }
            }
        );


        test(
            "creates valid remainingUnits values",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                const allUnits = [

                    ...result
                        .attackerFleet
                        .units,

                    ...result
                        .defenderFleet
                        .units
                ];

                for (
                    const unit
                    of allUnits
                ) {

                    expect(
                        typeof unit.remainingUnits
                    ).toBe(
                        "number"
                    );
                }
            }
        );


        test(
            "creates valid hpLastUnit values",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                const allUnits = [

                    ...result
                        .attackerFleet
                        .units,

                    ...result
                        .defenderFleet
                        .units
                ];

                for (
                    const unit
                    of allUnits
                ) {

                    expect(
                        typeof unit.hpLastUnit
                    ).toBe(
                        "number"
                    );
                }
            }
        );


        test(
            "creates valid receivedDamage values",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                const allUnits = [

                    ...result
                        .attackerFleet
                        .units,

                    ...result
                        .defenderFleet
                        .units
                ];

                for (
                    const unit
                    of allUnits
                ) {

                    expect(
                        typeof unit.receivedDamage
                    ).toBe(
                        "number"
                    );
                }
            }
        );


        test(
            "never creates NaN hpLastUnit",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                const allUnits = [

                    ...result
                        .attackerFleet
                        .units,

                    ...result
                        .defenderFleet
                        .units
                ];

                for (
                    const unit
                    of allUnits
                ) {

                    expect(
                        Number.isNaN(
                            unit.hpLastUnit
                        )
                    ).toBe(false);
                }
            }
        );


        test(
            "never creates NaN remainingUnits",
            () => {

                const result =
                    resolveCombat(
                        createRuntime()
                    );

                const allUnits = [

                    ...result
                        .attackerFleet
                        .units,

                    ...result
                        .defenderFleet
                        .units
                ];

                for (
                    const unit
                    of allUnits
                ) {

                    expect(
                        Number.isNaN(
                            unit.remainingUnits
                        )
                    ).toBe(false);
                }
            }
        );

    }
);