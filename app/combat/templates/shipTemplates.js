const shipTemplates = {

    fighter: {

        unitTypeId:
            "fighter",

        type:
            "ship",

        hp: 500,

        damage: 300,

        armor: 50,

        penetration: 20,

        speed: 120,

        volume: 5,

        repairDuration: 60,

        damageMultipliers: []
    },



    destroyer: {

        unitTypeId:
            "destroyer",

        type:
            "ship",

        hp: 2500,

        damage: 1500,

        armor: 300,

        penetration: 100,

        speed: 80,

        volume: 25,

        repairDuration: 300,

        damageMultipliers: []
    }
};

export default
    shipTemplates;