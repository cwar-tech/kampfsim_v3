// ==================================================
// report/dto/TechnicalData.js
// ==================================================

class TechnicalData {

    constructor({

        damageEvents = [],

        overflowEvents = [],

        resolverData = [],

        exports = []

    } = {}) {

        this.damageEvents =
            damageEvents;

        this.overflowEvents =
            overflowEvents;

        this.resolverData =
            resolverData;

        this.exports =
            exports;
    }
}

export default
    TechnicalData;