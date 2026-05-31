import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat replay safety",
    () => {

        test(
            "combat result survives serialization",
            () => {

                const runtime = {

                    combatId:
                        "combat_1",

                    currentRound: 1,

                    maxRounds: 1,

                    attackerFleet: {
                        units: []
                    },

                    defenderFleet: {
                        units: []
                    }
                };

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

    }
);
