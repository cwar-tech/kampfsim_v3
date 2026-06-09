// ==================================================
// app/combat/validation/validateShipTemplate.js
// ==================================================

function validateShipTemplate(
    template
) {

    const errors = [];

    if (
        !template ||
        typeof template !==
        "object"
    ) {

        return {

            valid: false,

            errors: [
                "[SHIP-001] template missing"
            ]
        };
    }

    // ==========================================
    // ID
    // ==========================================

    if (
        typeof template.id !==
        "string" ||
        template.id.length === 0
    ) {

        errors.push(
            "[SHIP-002] invalid id"
        );
    }

    // ==========================================
    // NAME
    // ==========================================

    if (
        typeof template.name !==
        "string" ||
        template.name.length === 0
    ) {

        errors.push(
            "[SHIP-003] invalid name"
        );
    }

    // ==========================================
    // TYPE
    // ==========================================

    if (
        typeof template.type !==
        "string"
    ) {

        errors.push(
            "[SHIP-004] invalid type"
        );
    }

    // ==========================================
    // HP
    // ==========================================

    if (
        typeof template.hp !==
        "number" ||
        template.hp <= 0
    ) {

        errors.push(
            "[SHIP-005] invalid hp"
        );
    }

    // ==========================================
    // DAMAGE
    // ==========================================

    if (
        typeof template.damage !==
        "number" ||
        template.damage < 0
    ) {

        errors.push(
            "[SHIP-006] invalid damage"
        );
    }

    // ==========================================
    // ARMOR
    // ==========================================

    if (
        typeof template.armor !==
        "number" ||
        template.armor < 0
    ) {

        errors.push(
            "[SHIP-007] invalid armor"
        );
    }

    // ==========================================
    // PENETRATION
    // ==========================================

    if (
        typeof template.penetration !==
        "number" ||
        template.penetration < 0
    ) {

        errors.push(
            "[SHIP-008] invalid penetration"
        );
    }

    // ==========================================
    // VOLUME
    // ==========================================

    if (
        typeof template.volume !==
        "number" ||
        template.volume <= 0
    ) {

        errors.push(
            "[SHIP-009] invalid volume"
        );
    }

    // ==========================================
    // DAMAGE MULTIPLIERS
    // ==========================================

    if (
        template.damageMultipliers &&
        !Array.isArray(
            template.damageMultipliers
        )
    ) {

        errors.push(
            "[SHIP-010] damageMultipliers must be array"
        );
    }

    for (
        const multiplier
        of (
            template.damageMultipliers ||
            []
        )
    ) {

        if (
            typeof multiplier.targetId !==
            "string"
        ) {

            errors.push(
                "[SHIP-011] invalid targetId"
            );
        }

        if (
            typeof multiplier.multiplier !==
            "number"
        ) {

            errors.push(
                "[SHIP-012] invalid multiplier"
            );
        }

        if (
            multiplier.multiplier <= 0
        ) {

            errors.push(
                "[SHIP-013] multiplier must be > 0"
            );
        }
    }

    return {

        valid:
            errors.length === 0,

        errors
    };
}

export default
    validateShipTemplate;