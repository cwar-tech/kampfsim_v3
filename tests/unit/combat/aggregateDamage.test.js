import aggregateDamage
    from "../../../app/combat/resolver/aggregateDamage.js";

describe(
    "aggregateDamage",
    () => {

        const damageEvents = [

            {
                targetRuntimeUnitId:
                    "runtime_1",

                appliedDamage: 300,

                overflowDamage: 100
            },

            {
                targetRuntimeUnitId:
                    "runtime_1",

                appliedDamage: 200,

                overflowDamage: 0
            },

            {
                targetRuntimeUnitId:
                    "runtime_2",

                appliedDamage: 500,

                overflowDamage: 50
            }

        ];



        // ==================================================
        // BASIC AGGREGATION
        // ==================================================

        test(
            "aggregates damage per target",
            () => {

                const result =
                    aggregateDamage(
                        damageEvents
                    );

                expect(
                    result.runtime_1
                        .appliedDamage
                ).toBe(500);

                expect(
                    result.runtime_2
                        .appliedDamage
                ).toBe(500);
            }
        );


        test(
            "aggregates overflow damage",
            () => {

                const result =
                    aggregateDamage(
                        damageEvents
                    );

                expect(
                    result.runtime_1
                        .overflowDamage
                ).toBe(100);

                expect(
                    result.runtime_2
                        .overflowDamage
                ).toBe(50);
            }
        );



        // ==================================================
        // TARGET SEPARATION
        // ==================================================

        test(
            "keeps different targets separated",
            () => {

                const result =
                    aggregateDamage(
                        damageEvents
                    );

                expect(
                    Object.keys(result)
                        .length
                ).toBe(2);
            }
        );


        test(
            "creates deterministic aggregation",
            () => {

                const resultA =
                    aggregateDamage(
                        damageEvents
                    );

                const resultB =
                    aggregateDamage(
                        damageEvents
                    );

                expect(resultA)
                    .toEqual(resultB);
            }
        );



        // ==================================================
        // SAFETY
        // ==================================================

        test(
            "returns empty object for empty input",
            () => {

                const result =
                    aggregateDamage([]);

                expect(result)
                    .toEqual({});
            }
        );


        test(
            "returns null for invalid input",
            () => {

                const result =
                    aggregateDamage(
                        null
                    );

                expect(result)
                    .toBeNull();
            }
        );


        test(
            "ignores malformed damage events",
            () => {

                const malformed = [

                    {},

                    {
                        appliedDamage: 100
                    },

                    {
                        targetRuntimeUnitId:
                            "runtime_1"
                    }

                ];

                const result =
                    aggregateDamage(
                        malformed
                    );

                expect(result)
                    .toEqual({});
            }
        );


        test(
            "ignores negative applied damage",
            () => {

                const invalid = [

                    {
                        targetRuntimeUnitId:
                            "runtime_1",

                        appliedDamage: -100,

                        overflowDamage: 0
                    }

                ];

                const result =
                    aggregateDamage(
                        invalid
                    );

                expect(result)
                    .toEqual({});
            }
        );



        // ==================================================
        // IMMUTABILITY
        // ==================================================

        test(
            "does not mutate input events",
            () => {

                const original =
                    JSON.parse(
                        JSON.stringify(
                            damageEvents
                        )
                    );

                aggregateDamage(
                    damageEvents
                );

                expect(
                    damageEvents
                ).toEqual(
                    original
                );
            }
        );



        // ==================================================
        // EDGE CASES
        // ==================================================

        test(
            "handles zero damage correctly",
            () => {

                const zeroEvents = [

                    {
                        targetRuntimeUnitId:
                            "runtime_1",

                        appliedDamage: 0,

                        overflowDamage: 0
                    }

                ];

                const result =
                    aggregateDamage(
                        zeroEvents
                    );

                expect(
                    result.runtime_1
                        .appliedDamage
                ).toBe(0);
            }
        );


        test(
            "handles very large damage values",
            () => {

                const largeEvents = [

                    {
                        targetRuntimeUnitId:
                            "runtime_1",

                        appliedDamage:
                            999999999,

                        overflowDamage:
                            999999
                    }

                ];

                const result =
                    aggregateDamage(
                        largeEvents
                    );

                expect(
                    result.runtime_1
                        .appliedDamage
                ).toBe(
                    999999999
                );
            }
        );

    }
);