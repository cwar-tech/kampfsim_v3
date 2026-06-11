// ==================================================
// report/dto/ExportData.js
// ==================================================

class ExportData {

    constructor({

        type,

        version

    } = {}) {

        this.type =
            type;

        this.version =
            version;
    }
}

export default
    ExportData;