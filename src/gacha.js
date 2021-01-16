import Chance from "chance";

import data from "./data";

const chance = new Chance();
let pityb4 = 0;
let pityb5 = 0;
let flagNotFeaturedB5 = false;
let flagNotFeaturedB4 = false;

export const clear = () => {
  pityb4 = 0;
  pityb5 = 0;
  flagNotFeaturedB5 = false;
  flagNotFeaturedB4 = false;
};

const gacha = (n, banner = "char") => {
  const result = [];
  const nonPermanent = banner !== "permanent";
  let poolKey = banner + "Pool";
  let pool = data[poolKey];
  const datapityb5 = data["pityb5" + banner];

  for (let i = 1; i <= n; i++) {
    let itemRarity = chance.weighted(["b3", "b4", "b5"], [94.3, 5.1, 0.6]);
    let item = chance.pickone(pool[itemRarity]);

    if (itemRarity === "b3") {
      pityb4++;
      pityb5++;
      if (pityb4 >= data.pityb4) {
        pityb5--;
      }
    }

    // let lastPityB4 = pityb4;
    let lastPityB5 = pityb5;
    const isPityb4 = pityb4 >= data.pityb4;
    const isPityb5 = pityb5 >= datapityb5;

    // reset the pity
    if (itemRarity === "b4" || pityb4 >= data.pityb4) {
      itemRarity = "b4";
      pityb4 = 0;
      const gotFeatured = chance.bool();

      item = chance.pickone(pool.b4);
      pityb5++;

      if (nonPermanent) {
        if (gotFeatured || flagNotFeaturedB4) {
          item = chance.pickone(pool.ftb4);
          flagNotFeaturedB4 = false;
        } else {
          item = chance.pickone(data.getNonFeatB4(banner));
          flagNotFeaturedB4 = true;
        }
      } else {
        item = chance.pickone(pool.b4);
      }
    }

    if (itemRarity === "b5" || pityb5 >= datapityb5) {
      itemRarity = "b5";
      pityb5 = 0;
      const gotFeatured = chance.bool();

      if (nonPermanent) {
        if (gotFeatured || flagNotFeaturedB5) {
          item = chance.pickone(pool.ftb5);
          flagNotFeaturedB5 = false;
        } else {
          item = chance.pickone(data.getNonFeatB5(banner));
          flagNotFeaturedB5 = true;
        }
      } else {
        item = chance.pickone(pool.b5);
      }
    }

    let label = isPityb4 && itemRarity === "b4" ? ` (pity)` : "";
    if (itemRarity === "b5") {
      label = ` (pity ${lastPityB5})`;
      if (isPityb5) {
        label = ` (pity max 80)`;
      }
    }
    result.push(itemRarity + " - " + item + label);
  }

  console.log("pityb5:", pityb5);
  return result.sort((it1, it2) => it2[1] - it1[1]);
};

export default gacha;
