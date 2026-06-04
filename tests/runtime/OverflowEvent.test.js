import OverflowEvent
    from "../../app/combat/runtime/OverflowEvent.js";

describe(
    "OverflowEvent",
    () => {

        test(
            "analysis fields receive defaults",
            () => {

                const event =
                    new OverflowEvent({

                        originalOverflowDamage:
                            1000,

                        overflowLoss:
                            50,

                        normalizedOverflowDamage:
                            950,

                        previousMultiplierRemoved:
                            450,

                        newMultiplierApplied:
                            250
                    });

                expect(
                    event.overflowLossReason
                ).toBeNull();

                expect(
                    event.targetChangeTriggered
                ).toBe(false);

                expect(
                    event.fleetChangeTriggered
                ).toBe(false);
            }
        );

        test(
            "analysis fields are stored",
            () => {

                const event =
                    new OverflowEvent({

                        originalOverflowDamage:
                            1000,

                        overflowLoss:
                            50,

                        normalizedOverflowDamage:
                            950,

                        previousMultiplierRemoved:
                            450,

                        newMultiplierApplied:
                            250,

                        overflowLossReason:
                            "FIRST_TARGET_CHANGE",

                        targetChangeTriggered:
                            true,

                        fleetChangeTriggered:
                            true
                    });

                expect(
                    event.overflowLossReason
                ).toBe(
                    "FIRST_TARGET_CHANGE"
                );

                expect(
                    event.targetChangeTriggered
                ).toBe(true);

                expect(
                    event.fleetChangeTriggered
                ).toBe(true);
            }
        );

        test(
            "boolean flags are normalized",
            () => {

                const event =
                    new OverflowEvent({

                        originalOverflowDamage:
                            1000,

                        overflowLoss:
                            50,

                        normalizedOverflowDamage:
                            950,

                        previousMultiplierRemoved:
                            450,

                        newMultiplierApplied:
                            250,

                        targetChangeTriggered:
                            1,

                        fleetChangeTriggered:
                            "yes"
                    });

                expect(
                    event.targetChangeTriggered
                ).toBe(true);

                expect(
                    event.fleetChangeTriggered
                ).toBe(true);
            }
        );
    }
);