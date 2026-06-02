import shipTemplates
    from "./shipTemplates.js";

function getShipTemplate(
    unitTypeId
) {

    if (
        typeof unitTypeId !==
        "string"
    ) {
        return null;
    }

    const template =
        shipTemplates[
        unitTypeId
        ];

    if (
        !template
    ) {
        return null;
    }

    return JSON.parse(
        JSON.stringify(
            template
        )
    );
}

export default
    getShipTemplate;