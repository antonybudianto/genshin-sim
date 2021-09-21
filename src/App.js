import React, { useState, useCallback } from 'react';
import Modal from 'react-modal';

import './style.css';
import data from './data';
import gacha, { clear } from './gacha';
import { primoToCurrency, toListText } from './util';
import ModalContent from './ModalContent';

Modal.setAppElement('#modal');

const BANNER_IMG = {
  char: 'https://pbs.twimg.com/media/E_jpQ8qVQAAaVe_?format=jpg&name=medium',
  weapon: 'https://pbs.twimg.com/media/E_jpdZLVUAUCjrO?format=jpg&name=medium',
};

// C6 max with worst-case scenario
// 8 times 10 roll = 1 const with max pity
// 6 * 2, 6 conste, times 2 for worst case
const MAX_GACHA_RETRY = 8 * (6 * 2);

export default function App() {
  const [banner, setBanner] = useState('char');
  const [list, setList] = useState([]);
  const [bag, setBag] = useState([]);
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const listB4 = bag.filter((b) => b.itemRarity === 'b4');
  const listB5 = bag.filter((b) => b.itemRarity === 'b5');
  const totalB4 = listB4.length;
  const totalB5 = listB5.length;

  const handleGacha = (n) => {
    const result = gacha(n, banner);
    setCount((curCount) => curCount + n);
    setBag((curBag) => [...result, ...curBag]);
    setList(result);

    const listEl = document.querySelector('.gacha-list');
    listEl.classList.remove('anim-slide');
    void listEl.offsetWidth;
    listEl.classList.add('anim-slide');

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

  const handleBanner = (e) => {
    handleClear();
    setBanner(e.target.value);
  };

  const handleCons = async () => {
    handleClear();
    let targetConste = data[banner + 'Pool'].ftb5[0];
    let cons = window.prompt('Input constellation count (1-6, default 6)');

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
      await new Promise((res) => {
        setTimeout(() => {
          res();
        }, 20);
      });
    }
  };

  const handleCons2 = useCallback(handleCons, [bag]);

  return (
    <div
      className="main container mx-auto px-2 py-5"
      style={{
        backgroundImage: `url(${BANNER_IMG[banner]})`,
      }}
    >
      <h1 className="font-extrabold text-2xl text-red-400">
        Genshin Impact Gacha Sim
      </h1>
      <div className="gacha-panel1 flex items-center mt-5">
        <div className="mr-3">
          Count: {count} / 4⭑: {totalB4} /{' '}
          <span title={listB5.join(',')}>5⭑: {totalB5}</span> /{' '}
        </div>
        <button
          className="bg-red-50 hover:bg-red-100 text-gray-500 px-3 py-2 mr-1 rounded"
          type="button"
          onClick={handleClear}
        >
          clear
        </button>
        <button
          className="bg-red-50 hover:bg-red-100 text-gray-500 px-3 py-2 mr-1 rounded"
          type="button"
          onClick={() => setShowModal(true)}
        >
          open bag
        </button>
      </div>
      <div className="flex w-5/12 mb-5 bg-white bg-opacity-50 text-gray-500 items-center">
        <div className="flex items-center">
          <img
            src="https://ih1.redbubble.net/image.1816083712.5142/st,small,507x507-pad,600x600,f8f8f8.jpg"
            width="30"
            height="30"
          />{' '}
          {totalPrimo.toLocaleString()}
        </div>
        <div className="ml-1">
          / {'Rp '}
          {primoToCurrency(totalPrimo).toLocaleString()}
        </div>
      </div>
      <ul
        className="gacha-list bg-white bg-opacity-90 shadow"
        style={{
          visibility: list.length ? 'visible' : 'hidden',
        }}
      >
        {list.map((l, i) => (
          <li className={`li-${l.itemRarity}`} key={i}>
            {toListText(l)}
          </li>
        ))}
      </ul>
      <div className="mt-2 flex justify-end">
        <select className="select border shadow" onChange={handleBanner}>
          <option value="char">Character Banner</option>
          <option value="weapon">Weapon Banner</option>
        </select>
        {banner === 'char' ? (
          <button
            className="btn btn-gacha shadow"
            type="button"
            onClick={handleCons2}
          >
            Const. Wish
          </button>
        ) : null}
        <button
          className="btn btn-gacha shadow"
          type="button"
          onClick={() => handleGacha(1)}
        >
          Wish x1
        </button>
        <button
          className="btn btn-gacha shadow"
          type="button"
          onClick={() => handleGacha(10)}
        >
          Wish x10
        </button>
      </div>
      <div
        style={{
          fontSize: '8pt',
          marginTop: '30px',
          textAlign: 'right',
          color: 'gray',
        }}
      >
        GI Sim v2.0 &copy; Antony Budianto.
      </div>
      <Modal
        isOpen={showModal}
        shouldCloseOnOverlayClick
        onRequestClose={closeModal}
        contentLabel="Gacha Bag"
        className="w-10/12 sm:w-6/12 m-auto mt-5 lg:mt-20 px-5 py-5 shadow bg-white"
      >
        <ModalContent bag={bag} />
      </Modal>
    </div>
  );
}
