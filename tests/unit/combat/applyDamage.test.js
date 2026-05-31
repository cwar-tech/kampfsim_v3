import applyDamage
    from "../../../app/combat/resolver/applyDamage.js";

describe(
    "applyDamage",
    () => {

        const createTarget =
            () => ({

                runtimeUnitId:
                    "target_1",

                hp: 500,

                remainingUnits: 10,

                hpLastUnit: 500
            });



        test(
            "applies normal damage",
            () => {

                const result =
                    applyDamage(
                        createTarget(),
                        100
                    );

                expect(
                    result.target.hpLastUnit
                ).toBe(400);
            }
        );


        test(
            "creates overflow",
            () => {

                const result =
                    applyDamage(
                        createTarget(),
                        600
                    );

                expect(
                    result.overflowDamage
                ).toBeGreaterThan(0);
            }
        );


        test(
            "never creates negative hp",
            () => {

                const result =
                    applyDamage(
                        createTarget(),
                        999999999
                    );

                expect(
                    result.target.hpLastUnit
                ).toBeGreaterThanOrEqual(0);
            }
        );


        test(
            "handles malformed target safely",
            () => {

                expect(
                    () =>
                        applyDamage(
                            null,
                            100
                        )
                ).not.toThrow();
            }
        );

    }
);
