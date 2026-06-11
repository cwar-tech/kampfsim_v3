// ==================================================
// report/dto/TechnicalData.js
// ==================================================

class TechnicalData {

    constructor({

        damageEvents,

        overflowEvents,

        resolverData,

        validation,

        exports

    } = {}) {

        this.damageEvents =
            damageEvents;

        this.overflowEvents =
            overflowEvents;

        this.resolverData =
            resolverData;

        this.validation =
            validation;

        this.exports =
            exports;
    }
}

export default
    TechnicalData;
