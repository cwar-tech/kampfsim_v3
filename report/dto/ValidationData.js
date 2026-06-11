class ValidationData {

    constructor({

        expectedAttacks,

        executedAttacks,

        allUnitsAttacked,

        duplicateAttacks

    } = {}) {

        this.expectedAttacks =
            expectedAttacks;

        this.executedAttacks =
            executedAttacks;

        this.allUnitsAttacked =
            allUnitsAttacked;

        this.duplicateAttacks =
            duplicateAttacks;
    }
}

export default
    ValidationData;
