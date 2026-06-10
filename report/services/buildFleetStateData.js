// ==================================================
// report/builders/buildFleetStateData.js
// ==================================================

import FleetStateData
    from "../dto/FleetStateData.js";

import FleetSideData
    from "../dto/FleetSideData.js";

import FleetUnitStateData
    from "../dto/FleetUnitStateData.js";

import getReportShipData
    from "./getReportShipData.js";

function buildFleetStateData(
    combatResult
) {

    if (
        !combatResult
    ) {

        throw new Error(

            "[REPORT-002] combatResult missing"
        );
    }

    return new FleetStateData({

        attacker:
            buildFleetSideData(
                combatResult.attackerFleet
            ),

        defender:
            buildFleetSideData(
                combatResult.defenderFleet
            )
    });
}

function buildFleetSideData(
    fleet
) {

    if (
        !fleet
    ) {

        throw new Error(

            "[REPORT-003] fleet missing"
        );
    }

    const startVolume =
        fleet.totalVolume;

    const activeVolume =
        fleet.units.reduce(

            (
                sum,
                unit
            ) =>

                sum +
                unit.remainingVolume,

            0
        );

    const permanentLossVolume =
        startVolume -
        activeVolume;

    const recoveryVolume =
        0;

    const units =
        fleet.units.map(

            unit => {

                const shipData =
                    getReportShipData(
                        unit.unitTypeId
                    );

                return new FleetUnitStateData({

                    unitTypeId:
                        unit.unitTypeId,

                    name:
                        shipData.name,

                    image:
                        shipData.image,

                    volumePerUnit:
                        unit.volumePerUnit,

                    hpPerUnit:
                        unit.hpPerUnit,

                    dmgPerUnit:
                        unit.dmgPerUnit,

                    startCount:
                        unit.unitCount,

                    activeCount:
                        unit.remainingUnits,

                    recoveryCount:
                        0,

                    permanentLossCount:
                        unit.unitCount -
                        unit.remainingUnits
                });
            }
        );

    return new FleetSideData({

        startVolume,

        activeVolume,

        recoveryVolume,

        permanentLossVolume,

        units
    });
}

export default
    buildFleetStateData;