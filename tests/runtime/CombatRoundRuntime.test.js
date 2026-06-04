import CombatRoundRuntime
    from "../../app/combat/runtime/CombatRoundRuntime.js";

describe(
    "CombatRoundRuntime",
    () => {

        test(
            "milestones default to empty array",
            () => {

                const runtime =
                    new CombatRoundRuntime({
                        roundNumber: 1
                    });

                expect(
                    runtime.milestones
                ).toEqual([]);
            }
        );

        test(
            "stores milestones",
            () => {

                const runtime =
                    new CombatRoundRuntime({

                        roundNumber: 1,

                        milestones: [
                            {
                                type:
                                    "TARGET_GROUP_DESTROYED"
                            }
                        ]
                    });

                expect(
                    runtime.milestones.length
                ).toBe(1);

                expect(
                    runtime.milestones[0].type
                ).toBe(
                    "TARGET_GROUP_DESTROYED"
                );
            }
        );
    }
);