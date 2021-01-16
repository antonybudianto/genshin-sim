import React, { useState } from "react";
import Modal from "react-modal";

import "./style.css";
import data from "./data";
import gacha, { clear } from "./gacha";
import { primoToCurrency } from "./util";
import ModalContent from "./ModalContent";
// console.log(data);

Modal.setAppElement("#modal");

const BANNER_IMG = {
  char: "https://i.ibb.co/W53RJJ8/Screen-Shot-2021-01-17-at-00-16-06.png",
  weapon: "https://i.ibb.co/WpGxk4D/Screen-Shot-2021-01-17-at-00-15-57.png"
};

export default function App() {
  const [banner, setBanner] = useState("char");
  const [list, setList] = useState([]);
  const [bag, setBag] = useState([]);
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const listB4 = bag.filter(b => b[1] === "4");
  const listB5 = bag.filter(b => b[1] === "5");
  const totalB4 = listB4.length;
  const totalB5 = listB5.length;

  const handleGacha = n => {
    setCount(count + n);
    const result = gacha(n, banner);
    setList(result);
    setBag([...result, ...bag]);
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

  return (
    <div
      style={{
        width: "70%",
        margin: "auto",
        backgroundRepeat: "no-repeat",
        backgroundSize: "50%",
        backgroundPosition: "100% 40%",
        backgroundImage: `url(${BANNER_IMG[banner]})`
      }}
    >
      <h1>Genshin Impact Gacha Sim</h1>
      <div style={{ marginBottom: "10px" }}>
        Count: {count} / B4: {totalB4} /{" "}
        <span title={listB5.join(",")}>B5: {totalB5}</span> /{" "}
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
        Primos: {totalPrimo.toLocaleString()} / Price:{" IDR "}
        {primoToCurrency(totalPrimo).toLocaleString()}
      </div>
      <div />
      <ul style={{ minHeight: "200px", paddingLeft: "15px" }}>
        {list.map((l, i) => (
          <li className={`li-b${l[1]}`} key={i}>
            {l}
          </li>
        ))}
      </ul>
      <div style={{ textAlign: "right" }}>
        <select className="select" onChange={handleBanner}>
          <option value="char">Character Banner</option>
          <option value="weapon">Weapon Banner</option>
        </select>
        <button
          className="btn btn-gacha"
          type="button"
          onClick={() => handleGacha(1)}
        >
          gacha 1x
        </button>
        <button
          className="btn btn-gacha"
          type="button"
          onClick={() => handleGacha(10)}
        >
          gacha 10x
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
