import applyDamage
    from "../../app/combat/resolver/applyDamage.js";

describe(
    "applyDamage",
    () => {

        const validTarget = {

            runtimeUnitId:
                "runtime_bomber_001",

            unitTypeId:
                "bomber",

            amount: 10,

            remainingUnits: 10,

            hpLastUnit: 500
        };



        // ==================================================
        // BASIC DAMAGE
        // ==================================================

        test(
            "reduces hpLastUnit on damage",
            () => {

                const target =
                    JSON.parse(
                        JSON.stringify(
                            validTarget
                        )
                    );

                const result =
                    applyDamage(
                        target,
                        100
                    );

                expect(
                    result.target.hpLastUnit
                ).toBe(400);
            }
        );


        test(
            "does not destroy unit on partial damage",
            () => {

                const target =
                    JSON.parse(
                        JSON.stringify(
                            validTarget
                        )
                    );

                const result =
                    applyDamage(
                        target,
                        200
                    );

                expect(
                    result.target.remainingUnits
                ).toBe(10);
            }
        );



        // ==================================================
        // UNIT DESTRUCTION
        // ==================================================

        test(
            "destroys one unit on exact lethal damage",
            () => {

                const target =
                    JSON.parse(
                        JSON.stringify(
                            validTarget
                        )
                    );

                const result =
                    applyDamage(
                        target,
                        500
                    );

                expect(
                    result.target.remainingUnits
                ).toBe(9);

                expect(
                    result.target.hpLastUnit
                ).toBe(500);
            }
        );


        test(
            "creates overflow damage on overkill",
            () => {

                const target =
                    JSON.parse(
                        JSON.stringify(
                            validTarget
                        )
                    );

                const result =
                    applyDamage(
                        target,
                        700
                    );

                expect(
                    result.overflowDamage
                ).toBe(200);
            }
        );

        // ==================================================
        // SAFETY
        // ==================================================

        test(
            "never allows negative hpLastUnit",
            () => {

                const target =
                    JSON.parse(
                        JSON.stringify(
                            validTarget
                        )
                    );

                const result =
                    applyDamage(
                        target,
                        999999
                    );

                expect(
                    result.target.hpLastUnit
                ).toBeGreaterThanOrEqual(
                    0
                );
            }
        );


        test(
            "never allows negative remainingUnits",
            () => {

                const target =
                    JSON.parse(
                        JSON.stringify(
                            validTarget
                        )
                    );

                const result =
                    applyDamage(
                        target,
                        999999
                    );

                expect(
                    result.target.remainingUnits
                ).toBeGreaterThanOrEqual(
                    0
                );
            }
        );


        test(
            "returns null for invalid target",
            () => {

                const result =
                    applyDamage(
                        null,
                        100
                    );

                expect(result)
                    .toBeNull();
            }
        );


        test(
            "returns null for negative damage",
            () => {

                const target =
                    JSON.parse(
                        JSON.stringify(
                            validTarget
                        )
                    );

                const result =
                    applyDamage(
                        target,
                        -100
                    );

                expect(result)
                    .toBeNull();
            }
        );



        // ==================================================
        // EDGE CASES
        // ==================================================

        test(
            "handles zero damage safely",
            () => {

                const target =
                    JSON.parse(
                        JSON.stringify(
                            validTarget
                        )
                    );

                const result =
                    applyDamage(
                        target,
                        0
                    );

                expect(
                    result.target.hpLastUnit
                ).toBe(500);
            }
        );

        test(
            "same input produces same result",
            () => {

                const targetA =
                    JSON.parse(
                        JSON.stringify(
                            validTarget
                        )
                    );

                const targetB =
                    JSON.parse(
                        JSON.stringify(
                            validTarget
                        )
                    );

                const resultA =
                    applyDamage(
                        targetA,
                        700
                    );

                const resultB =
                    applyDamage(
                        targetB,
                        700
                    );

                expect(resultA)
                    .toEqual(resultB);
            }
        );

    }
);