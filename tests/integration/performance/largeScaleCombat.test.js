import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

import buildCombatRuntime
    from "../../factories/buildCombatRuntime.js";



function createLargeFleet(
    fleetPrefix,
    unitCount = 100
) {

    const units = [];

    for (
        let i = 0;
        i < unitCount;
        i++
    ) {

        units.push({

            runtimeUnitId:
                `${fleetPrefix}_unit_${i}`,

            dmgPerUnit:
                100,

            hpPerUnit:
                500,

            volumePerUnit:
                10,

            remainingUnits:
                100
        });
    }

    return {

        fleetId:
            "large_fleet",

        totalDamage:
            units.reduce(

                (
                    sum,
                    unit
                ) =>

                    sum +

                    (
                        unit.dmgPerUnit *
                        unit.remainingUnits
                    ),

                0
            ),

        totalHp:
            units.reduce(

                (
                    sum,
                    unit
                ) =>

                    sum +

                    (
                        unit.hpPerUnit *
                        unit.remainingUnits
                    ),

                0
            ),

        totalUnits:
            units.reduce(

                (
                    sum,
                    unit
                ) =>

                    sum +
                    unit.remainingUnits,

                0
            ),

        totalVolume:
            units.reduce(

                (
                    sum,
                    unit
                ) =>

                    sum +

                    (
                        unit.volumePerUnit *
                        unit.remainingUnits
                    ),

                0
            ),

        units
    };
}



describe(
    "large scale combat",
    () => {

        test(
            "large combat resolves successfully",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet:
                            createLargeFleet(
                                "attacker"
                            ),

                        defenderFleet:
                            createLargeFleet(
                                "defender"
                            )
                    });

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                ).toHaveProperty(
                    "attackerFleet"
                );

                expect(
                    result
                ).toHaveProperty(
                    "defenderFleet"
                );
            }
        );



        test(
            "large combat remains serializable",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet:
                            createLargeFleet(
                                "attacker"
                            ),

                        defenderFleet:
                            createLargeFleet(
                                "defender"
                            )
                    });

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    () =>
                        JSON.stringify(
                            result
                        )
                ).not.toThrow();
            }
        );



        test(
            "large combat never produces NaN values",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet:
                            createLargeFleet(
                                "attacker"
                            ),

                        defenderFleet:
                            createLargeFleet(
                                "defender"
                            )
                    });

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    Number.isNaN(

                        result
                            .attackerFleet
                            .totalHp
                    )
                ).toBe(false);

                expect(
                    Number.isNaN(

                        result
                            .defenderFleet
                            .totalHp
                    )
                ).toBe(false);
            }
        );



        test(
            "large combat never creates negative unit counts",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet:
                            createLargeFleet(
                                "attacker"
                            ),

                        defenderFleet:
                            createLargeFleet(
                                "defender"
                            )
                    });

                const result =
                    resolveCombat(
                        runtime
                    );

                for (
                    const unit
                    of result
                        .attackerFleet
                        .units
                ) {

                    expect(
                        unit.remainingUnits
                    ).toBeGreaterThanOrEqual(
                        0
                    );
                }

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



        test(
            "large combat preserves fleet ids",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet:
                            createLargeFleet(
                                "attacker"
                            ),

                        defenderFleet:
                            createLargeFleet(
                                "defender"
                            )
                    });

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                        .attackerFleet
                        .fleetId
                ).toBe(
                    "large_fleet"
                );

                expect(
                    result
                        .defenderFleet
                        .fleetId
                ).toBe(
                    "large_fleet"
                );
            }
        );



        test(
            "large combat completes within acceptable time",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet:
                            createLargeFleet(
                                "attacker"
                            ),

                        defenderFleet:
                            createLargeFleet(
                                "defender"
                            )
                    });

                const start =
                    performance.now();

                resolveCombat(
                    runtime
                );

                const duration =
                    performance.now() -
                    start;

                expect(
                    duration
                ).toBeLessThan(
                    1000
                );
            }
        );



        test(
            "repeated large combats remain stable",
            () => {

                for (
                    let i = 0;
                    i < 20;
                    i++
                ) {

                    const result =
                        resolveCombat(

                            buildCombatRuntime({

                                attackerFleet:
                                    createLargeFleet(),

                                defenderFleet:
                                    createLargeFleet()
                            })
                        );

                    expect(
                        result
                    ).toHaveProperty(
                        "combatFinished"
                    );
                }
            }
        );



        test(
            "large combat survives persistence cycle",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet:
                            createLargeFleet(
                                "attacker"
                            ),

                        defenderFleet:
                            createLargeFleet(
                                "defender"
                            )
                    });

                const result =
                    resolveCombat(
                        runtime
                    );

                const restored =
                    JSON.parse(
                        JSON.stringify(
                            result
                        )
                    );

                expect(
                    restored
                ).toEqual(
                    result
                );
            }
        );



        test(
            "large combat preserves all unit ids",
            () => {

                const runtime =
                    buildCombatRuntime({

                        attackerFleet:
                            createLargeFleet(
                                "attacker"
                            ),

                        defenderFleet:
                            createLargeFleet(
                                "defender"
                            )
                    });

                const result =
                    resolveCombat(
                        runtime
                    );

                const ids =
                    new Set();

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
                        ids.has(
                            unit.runtimeUnitId
                        )
                    ).toBe(false);

                    ids.add(
                        unit.runtimeUnitId
                    );
                }
            }
        );



        test(
            "large combat remains deterministic",
            () => {

                const sanitize =
                    (
                        result
                    ) => ({

                        ...result,

                        roundEvents: []
                    });

                const resultA =
                    sanitize(

                        resolveCombat(

                            buildCombatRuntime({

                                attackerFleet:
                                    createLargeFleet(
                                        "attacker"
                                    ),

                                defenderFleet:
                                    createLargeFleet(
                                        "defender"
                                    )
                            })
                        )
                    );

                const resultB =
                    sanitize(

                        resolveCombat(

                            buildCombatRuntime({

                                attackerFleet:
                                    createLargeFleet(
                                        "attacker"
                                    ),

                                defenderFleet:
                                    createLargeFleet(
                                        "defender"
                                    )
                            })
                        )
                    );

                expect(
                    resultA
                ).toEqual(
                    resultB
                );
            }
        );

        test(
            "100 transporters versus 100 transporters resolves below baseline time",
            () => {

                const createTransportFleet =
                    () => {

                        const units = [];

                        for (
                            let i = 0;
                            i < 100;
                            i++
                        ) {

                            units.push({

                                runtimeUnitId:
                                    `transporter_${i}`,

                                dmgPerUnit:
                                    1,

                                hpPerUnit:
                                    10000,

                                volumePerUnit:
                                    100,

                                remainingUnits:
                                    100
                            });
                        }

                        return {

                            fleetId:
                                "transporter_fleet",

                            totalDamage:
                                units.reduce(

                                    (
                                        sum,
                                        unit
                                    ) =>

                                        sum +

                                        (
                                            unit.dmgPerUnit *
                                            unit.remainingUnits
                                        ),

                                    0
                                ),

                            totalHp:
                                units.reduce(

                                    (
                                        sum,
                                        unit
                                    ) =>

                                        sum +

                                        (
                                            unit.hpPerUnit *
                                            unit.remainingUnits
                                        ),

                                    0
                                ),

                            totalUnits:
                                units.reduce(

                                    (
                                        sum,
                                        unit
                                    ) =>

                                        sum +
                                        unit.remainingUnits,

                                    0
                                ),

                            totalVolume:
                                units.reduce(

                                    (
                                        sum,
                                        unit
                                    ) =>

                                        sum +

                                        (
                                            unit.volumePerUnit *
                                            unit.remainingUnits
                                        ),

                                    0
                                ),

                            units
                        };
                    };



                const runtime =
                    buildCombatRuntime({

                        attackerFleet:
                            createTransportFleet("attacker"),

                        defenderFleet:
                            createTransportFleet("defender")
                    });



                runtime.maxRounds =
                    250;



                const start =
                    performance.now();

                const result =
                    resolveCombat(
                        runtime
                    );

                const duration =
                    performance.now() -
                    start;



                expect(
                    duration
                ).toBeLessThan(
                    500
                );



                expect(
                    result
                ).toHaveProperty(
                    "combatFinished"
                );



                expect(
                    result.currentRound
                ).toBeLessThanOrEqual(
                    250
                );
            }
        );
    }
);