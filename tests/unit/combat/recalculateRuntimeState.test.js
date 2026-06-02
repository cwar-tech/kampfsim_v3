import recalculateRuntimeState
    from "../../../app/combat/runtime/recalculateRuntimeState.js";

describe(
    "recalculateRuntimeState",
    () => {

        // ==================================================
        // DERIVED STATE
        // ==================================================

        test(
            "calculates remaining units correctly",
            () => {

                const runtime = {

                    unitCount: 10,

                    hpPerUnit: 500,

                    remainingHp: 3700
                };

                const result =
                    recalculateRuntimeState(
                        runtime
                    );

                expect(
                    result.remainingUnits
                ).toBe(8);

                expect(
                    result.destroyed
                ).toBe(false);
            }
        );



        test(
            "handles fully destroyed stacks correctly",
            () => {

                const runtime = {

                    unitCount: 10,

                    hpPerUnit: 500,

                    remainingHp: 0
                };

                const result =
                    recalculateRuntimeState(
                        runtime
                    );

                expect(
                    result.remainingUnits
                ).toBe(0);

                expect(
                    result.destroyed
                ).toBe(true);
            }
        );



        test(
            "handles exact unit hp boundaries correctly",
            () => {

                const runtime = {

                    unitCount: 10,

                    hpPerUnit: 500,

                    remainingHp: 3500
                };

                const result =
                    recalculateRuntimeState(
                        runtime
                    );

                expect(
                    result.remainingUnits
                ).toBe(7);

                expect(
                    result.destroyed
                ).toBe(false);
            }
        );



        // ==================================================
        // HP SAFETY
        // ==================================================

        test(
            "clamps negative hp safely",
            () => {

                const runtime = {

                    unitCount: 10,

                    hpPerUnit: 500,

                    remainingHp: -500
                };

                const result =
                    recalculateRuntimeState(
                        runtime
                    );

                expect(
                    result.remainingHp
                ).toBe(0);

                expect(
                    result.remainingUnits
                ).toBe(0);

                expect(
                    result.destroyed
                ).toBe(true);
            }
        );



        test(
            "clamps hp above totalHp safely",
            () => {

                const runtime = {

                    unitCount: 10,

                    hpPerUnit: 500,

                    remainingHp: 999999
                };

                const result =
                    recalculateRuntimeState(
                        runtime
                    );

                expect(
                    result.remainingHp
                ).toBe(5000);

                expect(
                    result.remainingUnits
                ).toBe(10);

                expect(
                    result.destroyed
                ).toBe(false);
            }
        );



        // ==================================================
        // VALIDATION
        // ==================================================

        test(
            "returns null for invalid runtime",
            () => {

                const result =
                    recalculateRuntimeState(
                        null
                    );

                expect(result)
                    .toBeNull();
            }
        );



        // ==================================================
        // DETERMINISM
        // ==================================================

        test(
            "same input always produces same output",
            () => {

                const runtimeA = {

                    unitCount: 10,

                    hpPerUnit: 500,

                    remainingHp: 3700
                };

                const runtimeB = {

                    unitCount: 10,

                    hpPerUnit: 500,

                    remainingHp: 3700
                };

                const resultA =
                    recalculateRuntimeState(
                        runtimeA
                    );

                const resultB =
                    recalculateRuntimeState(
                        runtimeB
                    );

                expect(
                    resultA
                ).toEqual(
                    resultB
                );
            }
        );



        // ==================================================
        // SINGLE SOURCE OF TRUTH
        // ==================================================

        test(
            "remainingHp is the single combat truth",
            () => {

                const runtime = {

                    unitCount: 10,

                    hpPerUnit: 500,

                    remainingHp: 1,

                    remainingUnits: 0,

                    destroyed: true
                };

                const result =
                    recalculateRuntimeState(
                        runtime
                    );

                expect(
                    result.remainingUnits
                ).toBe(1);

                expect(
                    result.destroyed
                ).toBe(false);
            }
        );

    }
);