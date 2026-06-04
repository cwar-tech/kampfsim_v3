import DamageEvent
    from "../../app/combat/runtime/DamageEvent.js";

describe(
    "DamageEvent defaults",
    () => {

        test(
            "analysis fields receive defaults",
            () => {

                const event =
                    new DamageEvent({

                        sourceRuntimeUnitId:
                            "u1",

                        targetRuntimeUnitId:
                            "u2",

                        sourceUnitTypeId:
                            "fighter",

                        targetUnitTypeId:
                            "cruiser",

                        baseDamage:
                            100,

                        multiplier:
                            1,

                        appliedDamage:
                            100,

                        overflowDamage:
                            0
                    });

                expect(
                    event.focusReason
                ).toBeNull();

                expect(
                    event.counterBonus
                ).toBe(0);

                expect(
                    event.armorPercent
                ).toBe(0);

                expect(
                    event.penetrationPercent
                ).toBe(0);

                expect(
                    event.targetDestroyed
                ).toBe(false);

                expect(
                    event.overflowTriggered
                ).toBe(false);
            }
        );
        test(
            "analysis fields are stored",
            () => {

                const event =
                    new DamageEvent({

                        sourceRuntimeUnitId:
                            "u1",

                        targetRuntimeUnitId:
                            "u2",

                        sourceUnitTypeId:
                            "fighter",

                        targetUnitTypeId:
                            "cruiser",

                        baseDamage:
                            100,

                        multiplier:
                            4.5,

                        appliedDamage:
                            450,

                        overflowDamage:
                            50,

                        focusReason:
                            "highestCounter",

                        counterBonus:
                            450,

                        armorPercent:
                            30,

                        penetrationPercent:
                            10,

                        targetDestroyed:
                            true,

                        overflowTriggered:
                            true
                    });

                expect(
                    event.focusReason
                ).toBe(
                    "highestCounter"
                );

                expect(
                    event.counterBonus
                ).toBe(450);

                expect(
                    event.armorPercent
                ).toBe(30);

                expect(
                    event.penetrationPercent
                ).toBe(10);

                expect(
                    event.targetDestroyed
                ).toBe(true);

                expect(
                    event.overflowTriggered
                ).toBe(true);
            }
        );
    }
);