// ==================================================
// report/dto/AdvantageCategoryData.js
// ==================================================

class AdvantageCategoryData {

    constructor({

        damage = 1,

        armor = 1,

        penetration = 1,

        hp = 1

    } = {}) {

        this.damage =
            damage;

        this.armor =
            armor;

        this.penetration =
            penetration;

        this.hp =
            hp;
    }
}

export default
    AdvantageCategoryData;