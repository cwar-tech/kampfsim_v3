class CombatFleetRuntime {
    constructor({
        combatFleetId,

        worldFleetId,

        ownerPlayerId,
        ownerGuildId,

        side,

        units,

        totalDamage,
        totalVolume,

        receivedDamage,
        dealtDamage,

        defeated
    }) {
        this.combatFleetId = combatFleetId;

        this.worldFleetId = worldFleetId;

        this.ownerPlayerId = ownerPlayerId;
        this.ownerGuildId = ownerGuildId;

        this.side = side;

        this.units = units;

        this.totalDamage = totalDamage;
        this.totalVolume = totalVolume;

        this.receivedDamage = receivedDamage;
        this.dealtDamage = dealtDamage;

        this.defeated = defeated;
    }
}

module.exports = CombatFleetRuntime;