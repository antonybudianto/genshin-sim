import { difference } from "lodash";

const data = {
  gachaPrimo: 160,
  currency: "IDR",
  pityb4: 10,
  pityb5: 80, //should be 90, but this is to simulate softpity lol
  primoPrice: [
    [8080, 1599000],
    [3880, 799000],
    [2240, 479000],
    [1090, 249000],
    [330, 79000],
    [60, 16000]
  ],
  getNonFeatB4() {
    const pool = this.bannerCharPool;
    return difference(pool.b4, pool.ftb4);
  },
  getNonFeatB5() {
    const pool = this.bannerCharPool;
    return difference(pool.b5, pool.ftb5);
  },
  bannerCharPool: {
    ftb5: ["ganyu"],
    ftb4: ["noelle", "xingqiu", "xiangling"],
    b5: ["diluc", "mona", "keqing", "qiqi", "jean"],
    b4: [
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
      "barbara",
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
    ],
    b3: [
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
    ]
  }
};

export default data;
