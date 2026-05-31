import selectTarget
    from "../../app/combat/resolver/selectTarget.js";

describe(
    "selectTarget",
    () => {

        const attackerUnit = {

            runtimeUnitId:
                "runtime_lf_001",

            unitTypeId:
                "light_fighter",

            amount: 100,

            remainingUnits: 100,

            hpLastUnit: 430
        };

        const validTargets = [

            {
                runtimeUnitId:
                    "runtime_bomber_001",

                unitTypeId:
                    "bomber",

                amount: 50,

                remainingUnits: 50,

                hpLastUnit: 400
            },

            {
                runtimeUnitId:
                    "runtime_destroyer_001",

                unitTypeId:
                    "destroyer",

                amount: 20,

                remainingUnits: 20,

                hpLastUnit: 1200
            }

        ];



        // ==================================================
        // BASIC TARGETING
        // ==================================================

        test(
            "returns a valid target",
            () => {

                const target =
                    selectTarget(
                        attackerUnit,
                        validTargets
                    );

                expect(target)
                    .not
                    .toBeNull();

                expect(
                    target.runtimeUnitId
                ).toBeDefined();
            }
        );


        test(
            "returns deterministic target for same input",
            () => {

                const targetA =
                    selectTarget(
                        attackerUnit,
                        validTargets
                    );

                const targetB =
                    selectTarget(
                        attackerUnit,
                        validTargets
                    );

                expect(targetA)
                    .toEqual(targetB);
            }
        );



        // ==================================================
        // DEAD TARGET FILTERING
        // ==================================================

        test(
            "never targets destroyed units",
            () => {

                const destroyedTargets = [

                    {
                        runtimeUnitId:
                            "runtime_dead_001",

                        unitTypeId:
                            "bomber",

                        amount: 50,

                        remainingUnits: 0,

                        hpLastUnit: 0
                    }

                ];

                const target =
                    selectTarget(
                        attackerUnit,
                        destroyedTargets
                    );

                expect(target)
                    .toBeNull();
            }
        );


        test(
            "ignores destroyed targets when valid targets exist",
            () => {

                const mixedTargets = [

                    {
                        runtimeUnitId:
                            "runtime_dead_001",

                        unitTypeId:
                            "bomber",

                        amount: 50,

                        remainingUnits: 0,

                        hpLastUnit: 0
                    },

                    {
                        runtimeUnitId:
                            "runtime_alive_001",

                        unitTypeId:
                            "destroyer",

                        amount: 20,

                        remainingUnits: 20,

                        hpLastUnit: 1000
                    }

                ];

                const target =
                    selectTarget(
                        attackerUnit,
                        mixedTargets
                    );

                expect(
                    target.runtimeUnitId
                ).toBe(
                    "runtime_alive_001"
                );
            }
        );



        // ==================================================
        // SAFETY
        // ==================================================

        test(
            "returns null for empty target array",
            () => {

                const target =
                    selectTarget(
                        attackerUnit,
                        []
                    );

                expect(target)
                    .toBeNull();
            }
        );


        test(
            "never targets the attacking unit itself",
            () => {

                const invalidTargets = [

                    attackerUnit
                ];

                const target =
                    selectTarget(
                        attackerUnit,
                        invalidTargets
                    );

                expect(target)
                    .toBeNull();
            }
        );


        test(
            "returns null when all targets are invalid",
            () => {

                const invalidTargets = [

                    null,

                    {},

                    {
                        remainingUnits: 0
                    }

                ];

                const target =
                    selectTarget(
                        attackerUnit,
                        invalidTargets
                    );

                expect(target)
                    .toBeNull();
            }
        );



        // ==================================================
        // TARGET PRIORITIZATION
        // ==================================================

        test(
            "prefers first valid target deterministically",
            () => {

                const targets = [

                    {
                        runtimeUnitId:
                            "runtime_first",

                        unitTypeId:
                            "frigate",

                        amount: 10,

                        remainingUnits: 10,

                        hpLastUnit: 900
                    },

                    {
                        runtimeUnitId:
                            "runtime_second",

                        unitTypeId:
                            "destroyer",

                        amount: 5,

                        remainingUnits: 5,

                        hpLastUnit: 2000
                    }

                ];

                const target =
                    selectTarget(
                        attackerUnit,
                        targets
                    );

                expect(
                    target.runtimeUnitId
                ).toBe(
                    "runtime_first"
                );
            }
        );



        // ==================================================
        // EDGE CASES
        // ==================================================

        test(
            "handles undefined target array",
            () => {

                const target =
                    selectTarget(
                        attackerUnit,
                        undefined
                    );

                expect(target)
                    .toBeNull();
            }
        );


        test(
            "handles null attacker safely",
            () => {

                const target =
                    selectTarget(
                        null,
                        validTargets
                    );

                expect(target)
                    .toBeNull();
            }
        );


        test(
            "handles malformed target objects safely",
            () => {

                const malformedTargets = [

                    {
                        runtimeUnitId:
                            "runtime_invalid"
                    }

                ];

                const target =
                    selectTarget(
                        attackerUnit,
                        malformedTargets
                    );

                expect(target)
                    .toBeNull();
            }
        );

    }
);