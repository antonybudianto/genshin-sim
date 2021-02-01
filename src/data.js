import { difference } from "lodash";

const rarityTextMap = {
  b3: "⭑3",
  b4: "⭑4",
  b5: "⭑5"
};

const b3 = [
  "slingshot",
  "raven bow",
  "thriling tales of dragon slayers",
  "black tassel",
  "bloodstained greatsword",
  "skyrider sword",
  "cool steel",
  "sharpshooter's oath",
  "emerald orb",
  "magic guide",
  "debate club",
  "ferrous shadow",
  "harbinger of dawn"
];

const b4Char = [
  "noelle",
  "xingqiu",
  "xiangling",
  "xinyan",
  "diona",
  "razor",
  "chongyun",
  "ningguang",
  "fischl",
  "bennett",
  "sucrose",
  "beidou",
  "barbara"
];

const b4Weapon = [
  "rust",
  "the stringless",
  "eye of perception",
  "the widsith",
  "favonius lance",
  "rainslasher",
  "the bell",
  "lion's roar",
  "the flute",
  "favonius sword",
  "sacrificial sword",
  "favonius greatsword",
  "sacrificial greatsword",
  "dragon's bane",
  "favonius codex",
  "sacrificial fragments",
  "favonius warbow",
  "sacrificial bow"
];

const b5Char = ["diluc", "mona", "keqing", "qiqi", "jean"];

const b5Weapon = [
  "skyward blade",
  "skyward pride",
  "skyward harp",
  "skyward spine",
  "skyward atlas",
  "amos' bow",
  "aquila favonia",
  "primodial jade winged spear",
  "lost prayer to the sacred wind",
  "wolf gravestone"
];

const data = {
  rarityTextMap,
  gachaPrimo: 160,
  currency: "IDR",
  pityb4: 10,

  // pityb5 is -10 since default said pity is never reach due to softpity
  pityb5char: 80,
  pityb5weapon: 70,
  primoPrice: [
    [8080, 1599000],
    [3880, 799000],
    [2240, 479000],
    [1090, 249000],
    [330, 79000],
    [60, 16000]
  ],
  getNonFeatB4(banner) {
    const pool = this[banner + "Pool"];
    return difference(pool.b4, pool.ftb4);
  },
  getNonFeatB5(banner) {
    const pool = this[banner + "Pool"];
    return difference(pool.b5, pool.ftb5);
  },
  charPool: {
    ftb5: ["xiao"],
    ftb4: ["diona", "beidou", "xinyan"],
    b5: [...b5Char],
    b4: [...b4Char, ...b4Weapon],
    b3: [...b3]
  },
  weaponPool: {
    ftb5: ["primodial jade winged spear", "primodial jade cutter"],
    ftb4: [
      "sacrificial sword",
      "the bell",
      "dragon's bane",
      "eye of perception",
      "favonius warbow"
    ],
    b5: [...b5Weapon],
    b4: [...b4Char, ...b4Weapon],
    b3: [...b3]
  }
};

export default data;
