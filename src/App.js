import React, { useState } from "react";
import Modal from "react-modal";

import "./style.css";
import data from "./data";
import gacha, { clear } from "./gacha";
import { primoToCurrency } from "./util";
import ModalContent from "./ModalContent";
// console.log(data);

Modal.setAppElement("#modal");

export default function App() {
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
    const result = gacha(n);
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

  return (
    <div style={{ width: "80%", margin: "auto" }}>
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
      <ul style={{ minHeight: "300px" }}>
        {list.map((l, i) => (
          <li className={`li-b${l[1]}`} key={i}>
            {l}
          </li>
        ))}
      </ul>
      <div style={{ textAlign: "right" }}>
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
          marginTop: "30px"
        }}
      >
        GI Sim betaV0.1. &copy; Antony Budianto.
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
