import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat resolver boundary conditions",
    () => {

        const createCombatRuntime =
            () => ({

                combatId:
                    "combat_resolver_boundary_001",

                currentRound: 1,

                maxRounds: 1,

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

                            hp: 1,

                            remainingUnits: 1,

                            hpLastUnit: 1,

                            damage: 1,

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

                            hp: 1,

                            remainingUnits: 1,

                            hpLastUnit: 1,

                            damage: 1,

                            receivedDamage: 0
                        }

                    ]
                }
            });



        test(
            "single hp combat resolves safely",
            () => {

                const runtime =
                    createCombatRuntime();

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                ).toBeDefined();
            }
        );


        test(
            "empty fleets resolve safely",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units = [];

                runtime
                    .defenderFleet
                    .units = [];

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                ).toBeDefined();
            }
        );


        test(
            "massive damage resolves safely",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .damage = 999999999;

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                ).toBeDefined();
            }
        );


        test(
            "zero damage resolves safely",
            () => {

                const runtime =
                    createCombatRuntime();

                runtime
                    .attackerFleet
                    .units[0]
                    .damage = 0;

                runtime
                    .defenderFleet
                    .units[0]
                    .damage = 0;

                const result =
                    resolveCombat(
                        runtime
                    );

                expect(
                    result
                ).toBeDefined();
            }
        );


        test(
            "boundary conditions remain deterministic",
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