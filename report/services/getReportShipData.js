// ==================================================
// report/services/getReportShipData.js
// ==================================================

const SHIP_DATA = {

    ship_light_fighter: {

        name:
            "Leichter Jäger",

        image:
            "light_fighter.webp"
    },

    ship_medium_fighter: {

        name:
            "Mittlerer Jäger",

        image:
            "medium_fighter.webp"
    },

    ship_bomber: {

        name:
            "Bomber",

        image:
            "bomber.webp"
    },

    ship_frigate: {

        name:
            "Fregatte",

        image:
            "frigate.webp"
    },

    ship_ion_carrier: {

        name:
            "Ion Carrier",

        image:
            "ion_carrier.webp"
    }
};

function getReportShipData(
    unitTypeId
) {

    return (
        SHIP_DATA[
        unitTypeId
        ] ||

        {

            name:
                unitTypeId,

            image:
                null
        }
    );
}

export default
    getReportShipData;