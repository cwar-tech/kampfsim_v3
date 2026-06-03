import createRuntimeUnit
    from "./createRuntimeUnit.js";



function createRuntimeFleet({

    fleetId =
    "fleet_1",

    units = [

        createRuntimeUnit(),

        createRuntimeUnit({

            runtimeUnitId:
                "unit_2",

            damage:
                1200,

            unitCount:
                3
        })
    ]
} = {}) {

    return {

        fleetId,

        totalDamage:
            units.reduce(

                (
                    sum,
                    unit
                ) =>

                    sum +
                    unit.totalDamage,

                0
            ),

        totalUnits:
            units.reduce(

                (
                    sum,
                    unit
                ) =>

                    sum +
                    unit.remainingUnits,

                0
            ),

        fleetPower:
            units.reduce(

                (
                    sum,
                    unit
                ) =>

                    sum +
                    unit.totalDamage,

                0
            ),

        units
    };
}

export default
    createRuntimeFleet;