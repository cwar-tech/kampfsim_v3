function createUnit({

    runtimeUnitId =
    crypto.randomUUID(),

    dmgPerUnit = 100,

    hpPerUnit = 500,

    volumePerUnit = 10,

    remainingUnits = 10

} = {}) {

    return {

        runtimeUnitId,

        dmgPerUnit,

        hpPerUnit,

        volumePerUnit,

        remainingUnits
    };
}



function createFleet({

    fleetId = "fleet_1",

    units = [

        createUnit(),

        createUnit({

            dmgPerUnit:
                300,

            remainingUnits:
                5
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

                    (
                        unit.dmgPerUnit *
                        unit.remainingUnits
                    ),

                0
            ),



        totalHp:
            units.reduce(

                (
                    sum,
                    unit
                ) =>

                    sum +

                    (
                        unit.hpPerUnit *
                        unit.remainingUnits
                    ),

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



        totalVolume:
            units.reduce(

                (
                    sum,
                    unit
                ) =>

                    sum +

                    (
                        unit.volumePerUnit *
                        unit.remainingUnits
                    ),

                0
            ),



        units
    };
}



function buildCombatRuntime({

    attackerFleet =
    createFleet({

        fleetId:
            "attacker_fleet"
    }),

    defenderFleet =
    createFleet({

        fleetId:
            "defender_fleet"
    })

} = {}) {

    return {

        attackerFleet,

        defenderFleet
    };
}

export default
    buildCombatRuntime;