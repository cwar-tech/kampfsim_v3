// ==================================================
// app/combat/resolver/findBestTarget.js
// ==================================================

import getCounterPercent
    from "./getCounterPercent.js";

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
        !Array.isArray(targets)
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

    const ships =
        aliveTargets.filter(

            target =>

                target.unitCategory ===
                "ship"
        );

    const candidateTargets =

        defenses.length > 0

            ? defenses

            : ships;



    // ==========================================
    // TARGET SCORING
    // ==========================================

    const rankedTargets =

        candidateTargets.map(

            target => {

                const counterPercent =

                    getCounterPercent(

                        attacker,

                        target
                    );

                const baseDamage =

                    attacker.totalDamage || 0;

                const targetVolume =

                    target.remainingVolume ||

                    target.volume ||

                    0;

                return {

                    target,

                    counterPercent,

                    baseDamage,

                    targetVolume
                };
            }
        );



    // ==========================================
    // SORT TARGETS
    // ==========================================

    rankedTargets.sort(

        (a, b) => {

            // ==========================
            // COUNTER %
            // ==========================

            if (
                b.counterPercent !==
                a.counterPercent
            ) {

                return (
                    b.counterPercent -
                    a.counterPercent
                );
            }



            // ==========================
            // BASE DAMAGE
            // ==========================

            if (
                b.baseDamage !==
                a.baseDamage
            ) {

                return (
                    b.baseDamage -
                    a.baseDamage
                );
            }



            // ==========================
            // TARGET VOLUME
            // ==========================

            if (
                b.targetVolume !==
                a.targetVolume
            ) {

                return (
                    b.targetVolume -
                    a.targetVolume
                );
            }

            return 0;
        }
    );



    return rankedTargets[0];
}

export default
    findBestTarget;