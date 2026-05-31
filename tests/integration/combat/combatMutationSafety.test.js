import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat mutation safety",
    () => {

        test(
            "runtime mutations do not affect result",
            () => {

                const runtime = {

                    combatId:
                        "combat_1",

                    currentRound: 1,

                    maxRounds: 1,

                    attackerFleet: {

                        units: [

                            {
                                runtimeUnitId:
                                    "a1",

                                remainingUnits: 5,

                                hp: 500,

                                hpLastUnit: 500,

                                damage: 100
                            }
                        ]
                    },

                    defenderFleet: {
                        units: []
                    }
                };

                const result =
                    resolveCombat(
                        runtime
                    );

                runtime
                    .attackerFleet
                    .units[0]
                    .remainingUnits = 0;

                expect(
                    result
                        .attackerFleet
                        .units[0]
                        .remainingUnits
                ).not.toBe(0);
            }
        );

    }
);
