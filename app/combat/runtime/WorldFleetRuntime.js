class WorldFleetRuntime {
    constructor({
        fleetId,

        ownerPlayerId,
        ownerGuildId,

        fleetName,

        position,

        targetPosition,

        movementState,

        departureTimestamp,
        arrivalTimestamp,

        visibilityState,

        units,

        cargo,

        fuel,

        isReturning,
        isDestroyed
    }) {
        this.fleetId = fleetId;

        this.ownerPlayerId = ownerPlayerId;
        this.ownerGuildId = ownerGuildId;

        this.fleetName = fleetName;

        this.position = position;

        this.targetPosition = targetPosition;

        this.movementState = movementState;

        this.departureTimestamp = departureTimestamp;
        this.arrivalTimestamp = arrivalTimestamp;

        this.visibilityState = visibilityState;

        this.units = units;

        this.cargo = cargo;

        this.fuel = fuel;

        this.isReturning = isReturning;
        this.isDestroyed = isDestroyed;
    }
}

module.exports = WorldFleetRuntime;