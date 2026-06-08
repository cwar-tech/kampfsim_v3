// ==================================================
// app/combat/resolver/findBestTarget.js
// ==================================================

import getDamageMultiplier
    from "./getDamageMultiplier.js";

// ==================================================
// TARGET PRIORITY RULES
// ==================================================
//
// findBestTarget() bestimmt ausschließlich,
// welches Ziel als nächstes angegriffen wird.
//
// Die Funktion berechnet KEINEN Schaden.
//
// Verantwortlichkeiten:
//
// - keine Armorberechnung
// - keine Penetrationsberechnung
// - keine Forschungsboni
// - keine VIP-Boni
// - keine Energon-Boni
// - keine Gildenboni
// - keine Eventboni
// - keine Overflowberechnung
//
// Diese Funktion bewertet lediglich die
// Zielpriorität anhand der Kampfregeln.
//
// Priorisierung:
//
// 1.
// Existieren Counterziele
// (damageMultiplier > 1)?
//
// → Nur Counterziele betrachten
//
// 2.
// Höchster Counter zuerst
//
// Beispiel:
//
// 3.5x > 3.0x > 2.0x > 1.5x
//
// 3.
// Bei gleichem Counter
// größtes Zielvolumen zuerst
//
// 4.
// Falls keine Counterziele existieren
// größtes Zielvolumen zuerst
//
// Ziel:
//
// Die Funktion beantwortet ausschließlich:
//
// "Welches Ziel würde ein Angreifer
// gemäß der aktuellen Zielpriorität
// als nächstes auswählen?"
//
// Die eigentliche Schadensberechnung erfolgt
// ausschließlich in calculateDamage().
//
// ==================================================

function findBestTarget(
    attacker,
    targets
) {

    if (
        !attacker
    ) {
        return null;
    }

    if (
        !Array.isArray(
            targets
        )
    ) {
        return null;
    }

    // ==========================================
    // ALIVE TARGETS ONLY
    // ==========================================

    const aliveTargets =
        targets.filter(

            target =>

                target &&

                typeof target.remainingHp ===
                "number" &&

                target.remainingHp > 0
        );

    if (
        aliveTargets.length === 0
    ) {
        return null;
    }

    // ==========================================
    // DEFENSE PRIORITY
    // ==========================================

    const defenses =
        aliveTargets.filter(

            target =>

                target.unitCategory ===
                "defense"
        );

    const candidateTargets =

        defenses.length > 0

            ? defenses

            : aliveTargets;

    // ==========================================
    // COUNTER TARGETS
    // ==========================================

    const counterTargets =
        candidateTargets.filter(

            target =>

                getDamageMultiplier(
                    attacker,
                    target
                ) > 1
        );

    const finalTargets =

        counterTargets.length > 0

            ? counterTargets

            : candidateTargets;

    // ==========================================
    // SORT TARGETS
    // ==========================================

    finalTargets.sort(

        (a, b) => {

            const aCounter =
                getDamageMultiplier(
                    attacker,
                    a
                );

            const bCounter =
                getDamageMultiplier(
                    attacker,
                    b
                );

            // ==========================
            // HIGHER COUNTER FIRST
            // ==========================

            if (
                bCounter !==
                aCounter
            ) {

                return (
                    bCounter -
                    aCounter
                );
            }

            // ==========================
            // HIGHER VOLUME FIRST
            // ==========================

            const aVolume =

                a.remainingVolume ||

                a.totalVolume ||

                0;

            const bVolume =

                b.remainingVolume ||

                b.totalVolume ||

                0;

            return (
                bVolume -
                aVolume
            );
        }
    );

    return {

        target:
            finalTargets[0]
    };
}

export default
    findBestTarget;