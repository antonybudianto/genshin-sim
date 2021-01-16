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

const gacha = (n, charBanner = true) => {
  const result = [];

  for (let i = 1; i <= n; i++) {
    let itemRarity = chance.weighted(["b3", "b4", "b5"], [94.3, 5.1, 0.6]);
    let item = chance.pickone(data.bannerCharPool[itemRarity]);

    if (itemRarity === "b3") {
      pityb4++;
      pityb5++;
      if (pityb4 >= data.pityb4) {
        pityb5--;
      }
    }

    let lastPityB4 = pityb4;
    let lastPityB5 = pityb5;
    const isPityb4 = pityb4 >= data.pityb4;
    const isPityb5 = pityb5 >= data.pityb5;

    // reset the pity
    if (itemRarity === "b4" || pityb4 >= data.pityb4) {
      itemRarity = "b4";
      pityb4 = 0;
      const gotFeatured = chance.bool();

      item = chance.pickone(data.bannerCharPool.b4);
      pityb5++;

      if (charBanner) {
        if (gotFeatured || flagNotFeaturedB4) {
          item = chance.pickone(data.bannerCharPool.ftb4);
          flagNotFeaturedB4 = false;
        } else {
          item = chance.pickone(data.getNonFeatB4());
          flagNotFeaturedB4 = true;
        }
      } else {
        item = chance.pickone(data.bannerCharPool.b4);
      }
    }

    if (itemRarity === "b5" || pityb5 >= data.pityb5) {
      itemRarity = "b5";
      pityb5 = 0;
      const gotFeatured = chance.bool();

      if (charBanner) {
        if (gotFeatured || flagNotFeaturedB5) {
          item = chance.pickone(data.bannerCharPool.ftb5);
          flagNotFeaturedB5 = false;
        } else {
          item = chance.pickone(data.getNonFeatB5());
          flagNotFeaturedB5 = true;
        }
      } else {
        item = chance.pickone(data.bannerCharPool.b5);
      }
    }

    let label = isPityb4 && itemRarity === "b4" ? ` (pity)` : "";
    if (itemRarity === "b5") {
      label = ` (pity ${lastPityB5})`;
      // if (isPityb5) {
      //   label = ` (pity)`;
      // }
    }
    result.push(itemRarity + " - " + item + label);
  }

  console.log(pityb5);
  return result.sort((it1, it2) => it2[1] - it1[1]);
};

export default gacha;
