import resolveCombat
    from "../../../app/combat/resolver/resolveCombat.js";

describe(
    "combat resolver invalid runtime safety",
    () => {

        test(
            "null runtime resolves safely",
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
            "undefined runtime resolves safely",
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
            "empty object runtime resolves safely",
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
            "malformed fleets resolve safely",
            () => {

                const runtime = {

                    attackerFleet: null,

                    defenderFleet: null
                };

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );


        test(
            "malformed units resolve safely",
            () => {

                const runtime = {

                    attackerFleet: {
                        units: [null]
                    },

                    defenderFleet: {
                        units: [null]
                    }
                };

                expect(
                    () =>
                        resolveCombat(
                            runtime
                        )
                ).not.toThrow();
            }
        );

    }
);