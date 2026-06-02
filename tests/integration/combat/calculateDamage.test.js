import calculateDamage
    from "../../../app/combat/resolver/calculateDamage.js";

import createRuntimeUnit
    from "../../factories/createRuntimeUnit.js";

describe(
    "calculateDamage",
    () => {

        test(
            "calculates basic damage correctly",
            () => {

                const attacker =
                    createRuntimeUnit({

                        runtimeUnitId:
                            "attacker_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 10
                    });

                const target =
                    createRuntimeUnit({

                        runtimeUnitId:
                            "defender_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 10
                    });

                const result =
                    calculateDamage({

                        attacker,
                        target
                    });

                expect(
                    result.baseDamage
                ).toBe(3000);

                expect(
                    result.totalArmor
                ).toBe(500);

                expect(
                    result.totalPenetration
                ).toBe(200);

                expect(
                    result.effectiveArmor
                ).toBe(300);

                expect(
                    result.finalDamage
                ).toBe(2700);
            }
        );


        test(
            "penetration reduces armor correctly",
            () => {

                const attacker =
                    createRuntimeUnit({

                        runtimeUnitId:
                            "attacker_1",

                        shipTemplateId:
                            "destroyer",

                        unitCount: 3
                    });

                const target =
                    createRuntimeUnit({

                        runtimeUnitId:
                            "defender_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 10
                    });

                const result =
                    calculateDamage({

                        attacker,
                        target
                    });

                expect(
                    result.totalArmor
                ).toBe(500);

                expect(
                    result.totalPenetration
                ).toBe(300);

                expect(
                    result.effectiveArmor
                ).toBe(200);
            }
        );


        test(
            "penetration can fully negate armor",
            () => {

                const attacker =
                    createRuntimeUnit({

                        runtimeUnitId:
                            "attacker_1",

                        shipTemplateId:
                            "destroyer",

                        unitCount: 20
                    });

                const target =
                    createRuntimeUnit({

                        runtimeUnitId:
                            "defender_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 1
                    });

                const result =
                    calculateDamage({

                        attacker,
                        target
                    });

                expect(
                    result.effectiveArmor
                ).toBe(0);
            }
        );


        test(
            "effective armor never becomes negative",
            () => {

                const attacker =
                    createRuntimeUnit({

                        runtimeUnitId:
                            "attacker_1",

                        shipTemplateId:
                            "destroyer",

                        unitCount: 999
                    });

                const target =
                    createRuntimeUnit({

                        runtimeUnitId:
                            "defender_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 1
                    });

                const result =
                    calculateDamage({

                        attacker,
                        target
                    });

                expect(
                    result.effectiveArmor
                ).toBeGreaterThanOrEqual(
                    0
                );
            }
        );


        test(
            "never creates negative damage",
            () => {

                const attacker =
                    createRuntimeUnit({

                        runtimeUnitId:
                            "attacker_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 1
                    });

                const target =
                    createRuntimeUnit({

                        runtimeUnitId:
                            "defender_1",

                        shipTemplateId:
                            "destroyer",

                        unitCount: 100
                    });

                const result =
                    calculateDamage({

                        attacker,
                        target
                    });

                expect(
                    result.finalDamage
                ).toBe(0);
            }
        );


        test(
            "returns null for invalid attacker",
            () => {

                const target =
                    createRuntimeUnit({

                        runtimeUnitId:
                            "defender_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 10
                    });

                const result =
                    calculateDamage({

                        attacker: null,
                        target
                    });

                expect(result)
                    .toBeNull();
            }
        );


        test(
            "returns null for invalid target",
            () => {

                const attacker =
                    createRuntimeUnit({

                        runtimeUnitId:
                            "attacker_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 10
                    });

                const result =
                    calculateDamage({

                        attacker,
                        target: null
                    });

                expect(result)
                    .toBeNull();
            }
        );


        test(
            "same input always produces same output",
            () => {

                const attacker =
                    createRuntimeUnit({

                        runtimeUnitId:
                            "attacker_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 10
                    });

                const target =
                    createRuntimeUnit({

                        runtimeUnitId:
                            "defender_1",

                        shipTemplateId:
                            "fighter",

                        unitCount: 10
                    });

                const resultA =
                    calculateDamage({

                        attacker,
                        target
                    });

                const resultB =
                    calculateDamage({

                        attacker,
                        target
                    });

                expect(
                    resultA
                ).toEqual(
                    resultB
                );
            }
        );

    }
);