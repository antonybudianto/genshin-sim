import React, { useState, useCallback } from "react";
import Modal from "react-modal";

import "./style.css";
import data from "./data";
import gacha, { clear } from "./gacha";
import { primoToCurrency, toListText } from "./util";
import ModalContent from "./ModalContent";
// console.log(data);

Modal.setAppElement("#modal");

const BANNER_IMG = {
  char: "https://i.ibb.co/PNC7X6m/Screen-Shot-2021-01-17-at-19-21-04.jpg",
  weapon: "https://i.ibb.co/fNzq54N/Screen-Shot-2021-01-17-at-19-18-47.jpg"
};

// C6 max with worst-case scenario
// 8 times 10 roll = 1 const with max pity
// 6 * 2, 6 conste, times 2 for worst case
const MAX_GACHA_RETRY = 8 * (6 * 2);

export default function App() {
  const [banner, setBanner] = useState("char");
  const [list, setList] = useState([]);
  const [bag, setBag] = useState([]);
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const listB4 = bag.filter(b => b.itemRarity === "b4");
  const listB5 = bag.filter(b => b.itemRarity === "b5");
  const totalB4 = listB4.length;
  const totalB5 = listB5.length;

  const handleGacha = n => {
    const result = gacha(n, banner);
    setCount(curCount => curCount + n);
    setBag(curBag => [...result, ...curBag]);
    setList(result);

    const listEl = document.querySelector(".gacha-list");
    listEl.classList.remove("anim-slide");
    void listEl.offsetWidth;
    listEl.classList.add("anim-slide");

    return result;
  };

  const handleClear = () => {
    setCount(0);
    setBag([]);
    setList([]);
    clear();
  };

  const totalPrimo = count * data.gachaPrimo;

  const closeModal = () => {
    setShowModal(false);
  };

  const handleBanner = e => {
    handleClear();
    setBanner(e.target.value);
  };

  const handleCons = async () => {
    handleClear();
    let targetConste = data[banner + "Pool"].ftb5[0];
    let cons = window.prompt("Input constellation count (1-6, default 6)");

    if (cons === null) {
      return;
    }

    cons = Math.min(parseInt(cons) || 6, 6);

    let consteCount = 0;

    for (let i = 0; i < MAX_GACHA_RETRY; i++) {
      const r = handleGacha(10);
      consteCount += r.reduce(
        (p, c) => (p + c.item.indexOf(targetConste) !== -1 ? 1 : 0),
        0
      );
      if (consteCount >= cons) {
        break;
      }
      await new Promise(res => {
        setTimeout(() => {
          res();
        }, 20);
      });
    }
  };

  const handleCons2 = useCallback(handleCons, [bag]);

  return (
    <div
      className="main"
      style={{
        backgroundImage: `url(${BANNER_IMG[banner]})`
      }}
    >
      <h1>Genshin Impact Gacha Sim</h1>
      <div className="gacha-panel1">
        Count: {count} / 4⭑: {totalB4} /{" "}
        <span title={listB5.join(",")}>5⭑: {totalB5}</span> /{" "}
        <button className="btn" type="button" onClick={handleClear}>
          clear
        </button>
        <button
          className="btn"
          type="button"
          onClick={() => setShowModal(true)}
        >
          open bag
        </button>
      </div>
      <div style={{ marginBottom: "10px" }}>
        Primogems: {totalPrimo.toLocaleString()} / Price:{" IDR "}
        {primoToCurrency(totalPrimo).toLocaleString()}
      </div>
      <div />
      <ul
        className="gacha-list"
        style={{
          visibility: list.length ? "visible" : "hidden"
        }}
      >
        {list.map((l, i) => (
          <li className={`li-${l.itemRarity}`} key={i}>
            {toListText(l)}
          </li>
        ))}
      </ul>
      <div style={{ textAlign: "right" }}>
        <select className="select" onChange={handleBanner}>
          <option value="char">Character Banner</option>
          <option value="weapon">Weapon Banner</option>
        </select>
        {banner === "char" ? (
          <button className="btn btn-gacha" type="button" onClick={handleCons2}>
            Const. Wish
          </button>
        ) : null}
        <button
          className="btn btn-gacha"
          type="button"
          onClick={() => handleGacha(1)}
        >
          Wish x1
        </button>
        <button
          className="btn btn-gacha"
          type="button"
          onClick={() => handleGacha(10)}
        >
          Wish x10
        </button>
      </div>
      <div
        style={{
          fontSize: "8pt",
          marginTop: "30px",
          textAlign: "right",
          color: "gray"
        }}
      >
        GI Sim betaV0.2. &copy; Antony Budianto.
      </div>
      <Modal
        isOpen={showModal}
        shouldCloseOnOverlayClick
        onRequestClose={closeModal}
        contentLabel="Gacha Bag"
      >
        <ModalContent bag={bag} />
      </Modal>
    </div>
  );
}
