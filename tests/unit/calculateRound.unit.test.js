// ==================================================
// tests/unit/calculateRound.unit.test.js
// ==================================================

import { calculateRound }
  from "../../app/combat/calculateRound.js";


// ==================================================
// TEST DATA
// ==================================================

function createValidFleet() {

  return {

    totalDamage: 50,
    totalHp: 100,
    totalUnits: 10,
    totalVolume: 100,

    units: [

      {
        dmgPerUnit: 5,
        hpPerUnit: 10,
        volumePerUnit: 10
      }

    ]
  };
}


// ==================================================
// COMBAT FLEET CONTRACT
// ==================================================

describe(
  "CombatFleetContract",
  () => {

    test(
      "accepts a valid fleet structure",
      () => {

        const attackerFleet =
          createValidFleet();

        const defenderFleet =
          createValidFleet();

        const result =
          calculateRound(
            attackerFleet,
            defenderFleet
          );

        expect(result)
          .toBeDefined();
      }
    );


    test(
      "throws when totalDamage is missing",
      () => {

        const attackerFleet =
          createValidFleet();

        delete attackerFleet.totalDamage;

        const defenderFleet =
          createValidFleet();

        expect(() => {

          calculateRound(
            attackerFleet,
            defenderFleet
          );

        }).toThrow(
          "attackerFleet missing attribute: totalDamage"
        );
      }
    );


    test(
      "throws when totalHp is missing",
      () => {

        const attackerFleet =
          createValidFleet();

        delete attackerFleet.totalHp;

        const defenderFleet =
          createValidFleet();

        expect(() => {

          calculateRound(
            attackerFleet,
            defenderFleet
          );

        }).toThrow(
          "attackerFleet missing attribute: totalHp"
        );
      }
    );


    test(
      "throws when totalUnits is missing",
      () => {

        const attackerFleet =
          createValidFleet();

        delete attackerFleet.totalUnits;

        const defenderFleet =
          createValidFleet();

        expect(() => {

          calculateRound(
            attackerFleet,
            defenderFleet
          );

        }).toThrow(
          "attackerFleet missing attribute: totalUnits"
        );
      }
    );


    test(
      "throws when totalVolume is missing",
      () => {

        const attackerFleet =
          createValidFleet();

        delete attackerFleet.totalVolume;

        const defenderFleet =
          createValidFleet();

        expect(() => {

          calculateRound(
            attackerFleet,
            defenderFleet
          );

        }).toThrow(
          "attackerFleet missing attribute: totalVolume"
        );
      }
    );


    test(
      "throws when units is missing",
      () => {

        const attackerFleet =
          createValidFleet();

        delete attackerFleet.units;

        const defenderFleet =
          createValidFleet();

        expect(() => {

          calculateRound(
            attackerFleet,
            defenderFleet
          );

        }).toThrow(
          "attackerFleet missing attribute: units"
        );
      }
    );


    test(
      "throws when units is not an array",
      () => {

        const attackerFleet =
          createValidFleet();

        attackerFleet.units = {};

        const defenderFleet =
          createValidFleet();

        expect(() => {

          calculateRound(
            attackerFleet,
            defenderFleet
          );

        }).toThrow(
          "attackerFleet.units must be an array"
        );
      }
    );


    test(
      "throws when units array is empty",
      () => {

        const attackerFleet =
          createValidFleet();

        attackerFleet.units = [];

        const defenderFleet =
          createValidFleet();

        expect(() => {

          calculateRound(
            attackerFleet,
            defenderFleet
          );

        }).toThrow(
          "attackerFleet.units must contain at least one unit"
        );
      }
    );


    test(
      "supports multiple unit groups",
      () => {

        const attackerFleet =
          createValidFleet();

        attackerFleet.units.push({

          dmgPerUnit: 2,
          hpPerUnit: 20,
          volumePerUnit: 5

        });

        const defenderFleet =
          createValidFleet();

        const result =
          calculateRound(
            attackerFleet,
            defenderFleet
          );

        expect(result)
          .toBeDefined();
      }
    );

  }
);


// ==================================================
// COMBAT UNIT GROUP CONTRACT
// ==================================================

describe(
  "CombatUnitGroupContract",
  () => {

    test(
      "throws when dmgPerUnit is missing",
      () => {

        const attackerFleet =
          createValidFleet();

        delete attackerFleet
          .units[0]
          .dmgPerUnit;

        const defenderFleet =
          createValidFleet();

        expect(() => {

          calculateRound(
            attackerFleet,
            defenderFleet
          );

        }).toThrow(
          "attackerFleet.units missing attribute: dmgPerUnit"
        );
      }
    );


    test(
      "throws when hpPerUnit is missing",
      () => {

        const attackerFleet =
          createValidFleet();

        delete attackerFleet
          .units[0]
          .hpPerUnit;

        const defenderFleet =
          createValidFleet();

        expect(() => {

          calculateRound(
            attackerFleet,
            defenderFleet
          );

        }).toThrow(
          "attackerFleet.units missing attribute: hpPerUnit"
        );
      }
    );


    test(
      "throws when volumePerUnit is missing",
      () => {

        const attackerFleet =
          createValidFleet();

        delete attackerFleet
          .units[0]
          .volumePerUnit;

        const defenderFleet =
          createValidFleet();

        expect(() => {

          calculateRound(
            attackerFleet,
            defenderFleet
          );

        }).toThrow(
          "attackerFleet.units missing attribute: volumePerUnit"
        );
      }
    );

  }
);


// ==================================================
// REMAINING HP CONTRACT
// ==================================================

describe(
  "RemainingHpContract",
  () => {

    test(
      "reduces remaining hp after incoming damage",
      () => {

        const attackerFleet =
          createValidFleet();

        const defenderFleet =
          createValidFleet();

        const result =
          calculateRound(
            attackerFleet,
            defenderFleet
          );

        expect(
          result.defenderFleet.remainingHp
        ).toBe(50);
      }
    );


    test(
      "caps remaining hp at zero after lethal damage",
      () => {

        const attackerFleet =
          createValidFleet();

        attackerFleet.totalDamage = 9999;

        const defenderFleet =
          createValidFleet();

        const result =
          calculateRound(
            attackerFleet,
            defenderFleet
          );

        expect(
          result.defenderFleet.remainingHp
        ).toBe(0);
      }
    );

  }
);


// ==================================================
// DESTROYED UNITS CONTRACT
// ==================================================

describe(
  "DestroyedUnitsContract",
  () => {

    test(
      "calculates destroyed units after damage application",
      () => {

        const attackerFleet =
          createValidFleet();

        const defenderFleet =
          createValidFleet();

        const result =
          calculateRound(
            attackerFleet,
            defenderFleet
          );

        expect(
          result.defenderFleet.destroyedUnits
        ).toBe(5);
      }
    );


    test(
      "caps destroyed units at totalUnits",
      () => {

        const attackerFleet =
          createValidFleet();

        attackerFleet.totalDamage = 9999;

        const defenderFleet =
          createValidFleet();

        const result =
          calculateRound(
            attackerFleet,
            defenderFleet
          );

        expect(
          result.defenderFleet.destroyedUnits
        ).toBeLessThanOrEqual(
          defenderFleet.totalUnits
        );
      }
    );

  }
);


// ==================================================
// REMAINING UNITS CONTRACT
// ==================================================

describe(
  "RemainingUnitsContract",
  () => {

    test(
      "calculates remaining units after destruction",
      () => {

        const attackerFleet =
          createValidFleet();

        const defenderFleet =
          createValidFleet();

        const result =
          calculateRound(
            attackerFleet,
            defenderFleet
          );

        expect(
          result.defenderFleet.remainingUnits
        ).toBe(5);
      }
    );


    test(
      "caps remaining units at zero after lethal damage",
      () => {

        const attackerFleet =
          createValidFleet();

        attackerFleet.totalDamage = 9999;

        const defenderFleet =
          createValidFleet();

        const result =
          calculateRound(
            attackerFleet,
            defenderFleet
          );

        expect(
          result.defenderFleet.remainingUnits
        ).toBe(0);
      }
    );

  }
);


// ==================================================
// VOLUME CONTRACT
// ==================================================

describe(
  "VolumeContract",
  () => {

    test(
      "calculates destroyed volume after unit destruction",
      () => {

        const attackerFleet =
          createValidFleet();

        const defenderFleet =
          createValidFleet();

        const result =
          calculateRound(
            attackerFleet,
            defenderFleet
          );

        expect(
          result.defenderDestroyedVolume
        ).toBe(50);
      }
    );


    test(
      "calculates remaining volume after combat damage",
      () => {

        const attackerFleet =
          createValidFleet();

        const defenderFleet =
          createValidFleet();

        const result =
          calculateRound(
            attackerFleet,
            defenderFleet
          );

        expect(
          result.defenderFleet.remainingVolume
        ).toBe(50);
      }
    );

  }
);


// ==================================================
// WINNER CONTRACT
// ==================================================

describe(
  "WinnerContract",
  () => {

    test(
      "returns attacker as winner with higher remaining hp",
      () => {

        const attackerFleet =
          createValidFleet();

        const defenderFleet =
          createValidFleet();

        defenderFleet.totalHp = 25;

        const result =
          calculateRound(
            attackerFleet,
            defenderFleet
          );

        expect(
          result.winner
        ).toBe("attacker");
      }
    );


    test(
      "returns draw when both fleets have equal remaining hp",
      () => {

        const attackerFleet =
          createValidFleet();

        const defenderFleet =
          createValidFleet();

        const result =
          calculateRound(
            attackerFleet,
            defenderFleet
          );

        expect(
          result.winner
        ).toBe("draw");
      }
    );

  }
);


// ==================================================
// COMBAT STATE CONTRACT
// ==================================================

describe(
  "CombatStateContract",
  () => {

    test(
      "returns attackerVictory when defender reaches zero units",
      () => {

        const attackerFleet =
          createValidFleet();

        attackerFleet.totalDamage = 9999;

        const defenderFleet =
          createValidFleet();

        const result =
          calculateRound(
            attackerFleet,
            defenderFleet
          );

        expect(
          result.combatState
        ).toBe("attackerVictory");
      }
    );


    test(
      "returns mutualDestruction when both fleets are destroyed",
      () => {

        const attackerFleet =
          createValidFleet();

        attackerFleet.totalDamage = 9999;

        const defenderFleet =
          createValidFleet();

        defenderFleet.totalDamage = 9999;

        const result =
          calculateRound(
            attackerFleet,
            defenderFleet
          );

        expect(
          result.combatState
        ).toBe("mutualDestruction");
      }
    );

  }
);


// ==================================================
// ROUND EVENT CONTRACT
// ==================================================

describe(
  "RoundEventContract",
  () => {

    test(
      "creates round events for both fleets",
      () => {

        const attackerFleet =
          createValidFleet();

        const defenderFleet =
          createValidFleet();

        const result =
          calculateRound(
            attackerFleet,
            defenderFleet
          );

        expect(
          result.roundEvents.length
        ).toBe(2);
      }
    );


    test(
      "stores applied damage inside round events",
      () => {

        const attackerFleet =
          createValidFleet();

        const defenderFleet =
          createValidFleet();

        const result =
          calculateRound(
            attackerFleet,
            defenderFleet
          );

        expect(
          result.roundEvents[0]
            .damageApplied
        ).toBeDefined();
      }
    );

  }
);