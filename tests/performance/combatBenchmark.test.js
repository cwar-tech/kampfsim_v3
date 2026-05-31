import resolveCombat
    from "../../app/combat/resolver/resolveCombat.js";

describe(
    "combat benchmark",
    () => {

        test(
            "combat resolves below baseline time",
            () => {

                const runtime = {

                    combatId:
                        "combat_perf",

                    currentRound: 1,

                    maxRounds: 250,

                    attackerFleet: {
                        units: []
                    },

                    defenderFleet: {
                        units: []
                    }
                };

                const start =
                    performance.now();

                resolveCombat(
                    runtime
                );

                const duration =
                    performance.now() - start;

                expect(
                    duration
                ).toBeLessThan(
                    500
                );
            }
        );

    }
);
