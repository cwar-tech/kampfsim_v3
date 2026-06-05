// ==================================================
// tests/unit/resolveFleet.unit.test.js
// ==================================================

import fs from "fs";

import { resolveFleet }
    from "../../app/combat/resolveFleet.js";


// ==================================================
// TEST DATA
// ==================================================

const shipsData = JSON.parse(
    fs.readFileSync("./app/ships.json")
);

const firstShip =
    shipsData[0];

const secondShip =
    shipsData[1];


// ==================================================
// TEST SUITE
// ==================================================

describe(
    "ResolveFleetContract",
    () => {

        test(
            "creates valid unit group attributes from ship data",
            () => {

                const fleetInput = [

                    {
                        unitTypeId: firstShip.id,
                        count: 10
                    }

                ];

                const fleet =
                    resolveFleet(
                        fleetInput,
                        shipsData
                    );

                expect(
                    fleet.units[0].dmgPerUnit
                ).toBe(
                    firstShip.damage
                );

                expect(
                    fleet.units[0].hpPerUnit
                ).toBe(
                    firstShip.hp
                );

                expect(
                    fleet.units[0].volumePerUnit
                ).toBe(
                    firstShip.volume
                );

            }
        );


        test(
            "calculates totalDamage from all ship groups",
            () => {

                const fleetInput = [

                    {
                        unitTypeId: firstShip.id,
                        count: 10
                    }

                ];

                const fleet =
                    resolveFleet(
                        fleetInput,
                        shipsData
                    );

                expect(
                    fleet.totalDamage
                ).toBe(
                    firstShip.damage * 10
                );

            }
        );


        test(
            "calculates totalHp from all ship groups",
            () => {

                const fleetInput = [

                    {
                        unitTypeId: firstShip.id,
                        count: 10
                    }

                ];

                const fleet =
                    resolveFleet(
                        fleetInput,
                        shipsData
                    );

                expect(
                    fleet.totalHp
                ).toBe(
                    firstShip.hp * 10
                );

            }
        );


        test(
            "calculates totalUnits from all ship groups",
            () => {

                const fleetInput = [

                    {
                        unitTypeId: firstShip.id,
                        count: 10
                    }

                ];

                const fleet =
                    resolveFleet(
                        fleetInput,
                        shipsData
                    );

                expect(
                    fleet.totalUnits
                ).toBe(10);

            }
        );


        test(
            "calculates totalVolume from all ship groups",
            () => {

                const fleetInput = [

                    {
                        unitTypeId: firstShip.id,
                        count: 10
                    }

                ];

                const fleet =
                    resolveFleet(
                        fleetInput,
                        shipsData
                    );

                expect(
                    fleet.totalVolume
                ).toBe(
                    firstShip.volume * 10
                );

            }
        );


        test(
            "supports multiple ship groups",
            () => {

                const fleetInput = [

                    {
                        unitTypeId: firstShip.id,
                        count: 10
                    },

                    {
                        unitTypeId: secondShip.id,
                        count: 5
                    }

                ];

                const fleet =
                    resolveFleet(
                        fleetInput,
                        shipsData
                    );

                expect(
                    fleet.units.length
                ).toBe(2);

            }
        );


        test(
            "aggregates totalDamage across multiple ship groups",
            () => {

                const fleetInput = [

                    {
                        unitTypeId: firstShip.id,
                        count: 10
                    },

                    {
                        unitTypeId: secondShip.id,
                        count: 5
                    }

                ];

                const fleet =
                    resolveFleet(
                        fleetInput,
                        shipsData
                    );

                const expectedDamage =

                    (firstShip.damage * 10)
                    +
                    (secondShip.damage * 5);

                expect(
                    fleet.totalDamage
                ).toBe(
                    expectedDamage
                );

            }
        );


        test(
            "aggregates totalHp across multiple ship groups",
            () => {

                const fleetInput = [

                    {
                        unitTypeId: firstShip.id,
                        count: 10
                    },

                    {
                        unitTypeId: secondShip.id,
                        count: 5
                    }

                ];

                const fleet =
                    resolveFleet(
                        fleetInput,
                        shipsData
                    );

                const expectedHp =

                    (firstShip.hp * 10)
                    +
                    (secondShip.hp * 5);

                expect(
                    fleet.totalHp
                ).toBe(
                    expectedHp
                );

            }
        );


        test(
            "aggregates totalVolume across multiple ship groups",
            () => {

                const fleetInput = [

                    {
                        unitTypeId: firstShip.id,
                        count: 10
                    },

                    {
                        unitTypeId: secondShip.id,
                        count: 5
                    }

                ];

                const fleet =
                    resolveFleet(
                        fleetInput,
                        shipsData
                    );

                const expectedVolume =

                    (firstShip.volume * 10)
                    +
                    (secondShip.volume * 5);

                expect(
                    fleet.totalVolume
                ).toBe(
                    expectedVolume
                );

            }
        );


        test(
            "creates one unit group per fleet entry",
            () => {

                const fleetInput = [

                    {
                        unitTypeId: firstShip.id,
                        count: 10
                    },

                    {
                        unitTypeId: secondShip.id,
                        count: 5
                    }

                ];

                const fleet =
                    resolveFleet(
                        fleetInput,
                        shipsData
                    );

                expect(
                    fleet.units[0].unitTypeId
                ).toBe(
                    firstShip.id
                );

                expect(
                    fleet.units[1].unitTypeId
                ).toBe(
                    secondShip.id
                );

            }
        );


        test(
            "throws when unitTypeId is missing",
            () => {

                const fleetInput = [

                    {
                        count: 10
                    }

                ];

                expect(() => {

                    resolveFleet(
                        fleetInput,
                        shipsData
                    );

                }).toThrow(
                    "[FLEET-002]"
                );

            }
        );


        test(
            "throws when count is missing",
            () => {

                const fleetInput = [

                    {
                        unitTypeId:
                            firstShip.id
                    }

                ];

                expect(() => {

                    resolveFleet(
                        fleetInput,
                        shipsData
                    );

                }).toThrow(
                    "[FLEET-003]"
                );

            }
        );


        test(
            "throws when ship does not exist",
            () => {

                const fleetInput = [

                    {
                        unitTypeId:
                            "INVALID_SHIP",

                        count: 1
                    }

                ];

                expect(() => {

                    resolveFleet(
                        fleetInput,
                        shipsData
                    );

                }).toThrow(
                    "[FLEET-004]"
                );

            }
        );


        test(
            "throws when fleet input is invalid",
            () => {

                expect(() => {

                    resolveFleet(
                        {},
                        shipsData
                    );

                }).toThrow(
                    "[FLEET-001]"
                );

            }
        );

    }
);