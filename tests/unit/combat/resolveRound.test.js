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

                hpLastUnit: 500,

                receivedDamage: 0
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
            "tracks received damage",
            () => {

                const result =
                    applyDamage(
                        createTarget(),
                        100
                    );

                expect(
                    result.target.receivedDamage
                ).toBe(100);
            }
        );


        test(
            "creates overflow damage",
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
            "reduces remaining units after lethal damage",
            () => {

                const result =
                    applyDamage(
                        createTarget(),
                        600
                    );

                expect(
                    result.target.remainingUnits
                ).toBeLessThan(10);
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
            "never creates negative remaining units",
            () => {

                const result =
                    applyDamage(
                        createTarget(),
                        999999999
                    );

                expect(
                    result.target.remainingUnits
                ).toBeGreaterThanOrEqual(0);
            }
        );


        test(
            "handles zero damage safely",
            () => {

                const result =
                    applyDamage(
                        createTarget(),
                        0
                    );

                expect(
                    result.target.hpLastUnit
                ).toBe(500);
            }
        );


        test(
            "handles exact lethal damage",
            () => {

                const target =
                    createTarget();

                target.remainingUnits = 1;

                const result =
                    applyDamage(
                        target,
                        500
                    );

                expect(
                    result.target.remainingUnits
                ).toBe(0);
            }
        );


        test(
            "creates no overflow on exact lethal damage",
            () => {

                const target =
                    createTarget();

                target.remainingUnits = 1;

                const result =
                    applyDamage(
                        target,
                        500
                    );

                expect(
                    result.overflowDamage
                ).toBe(0);
            }
        );


        test(
            "handles partial unit damage correctly",
            () => {

                const result =
                    applyDamage(
                        createTarget(),
                        250
                    );

                expect(
                    result.target.hpLastUnit
                ).toBe(250);
            }
        );


        test(
            "handles multiple unit destruction",
            () => {

                const result =
                    applyDamage(
                        createTarget(),
                        1500
                    );

                expect(
                    result.target.remainingUnits
                ).toBeLessThan(8);
            }
        );


        test(
            "preserves runtimeUnitId",
            () => {

                const result =
                    applyDamage(
                        createTarget(),
                        100
                    );

                expect(
                    result.target.runtimeUnitId
                ).toBe(
                    "target_1"
                );
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


        test(
            "handles undefined damage safely",
            () => {

                expect(
                    () =>
                        applyDamage(
                            createTarget()
                        )
                ).not.toThrow();
            }
        );


        test(
            "handles negative damage safely",
            () => {

                expect(
                    () =>
                        applyDamage(
                            createTarget(),
                            -100
                        )
                ).not.toThrow();
            }
        );


        test(
            "remains deterministic",
            () => {

                const resultA =
                    applyDamage(
                        createTarget(),
                        250
                    );

                const resultB =
                    applyDamage(
                        createTarget(),
                        250
                    );

                expect(
                    resultA
                ).toEqual(
                    resultB
                );
            }
        );


        test(
            "survives serialization",
            () => {

                const result =
                    applyDamage(
                        createTarget(),
                        250
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