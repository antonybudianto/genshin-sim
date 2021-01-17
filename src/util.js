import data from "./data";

export const primoToCurrency = primo => {
  let total = 0;
  for (let i = 0; i < data.primoPrice.length; i++) {
    const [prm, price] = data.primoPrice[i];
    if (primo >= prm) {
      const qty = Math.floor(primo / prm);
      primo = primo %= prm;
      total += qty * price;
    }
  }

  // leftover primo must be deducted by buying lowest price primo package
  if (primo > 0) {
    const [_, price] = data.primoPrice[data.primoPrice.length - 1];
    total += price;
    primo = 0;
  }

  return total;
};

export const parseMeta = str => {
  const [rarity, name, isPity, pityCount] = str.split(";");
  return { rarity, name, isPity, pityCount };
};

export const toListText = d => {
  const isPityb4 = d.isPity && d.rarity === "b4";
  const isPityb5 = d.isPity && d.rarity === "b5";
  let label = isPityb4 && d.rarity === "b4" ? ` (pity)` : "";
  if (d.rarity === "b5") {
    label = ` (pity ${d.pityCount})`;
    if (isPityb5) {
      label = ` (pity max)`;
    }
  }
  return `${data.rarityTextMap[d.rarity]} ${d.name} - ${label}`;
};
