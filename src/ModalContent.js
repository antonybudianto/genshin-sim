import React, { useState } from "react";

import { toListText } from "./util";

const ModalContent = ({ bag = [] }) => {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState(false);
  const MAX_PAGE = Math.ceil(bag.length / 10 || 1) - 1;

  const handleNext = () => {
    setPage(Math.min(page + 1, MAX_PAGE));
  };

  const handlePrev = () => {
    setPage(Math.max(0, page - 1));
  };

  const handleSort = () => {
    setSort(!sort);
    setPage(0);
  };

  return (
    <div>
      <h3>
        Bag (page {page + 1} of {MAX_PAGE + 1})
      </h3>
      <div>
        <button onClick={handleSort} type="button" className="btn">
          sort by {sort ? "date" : "rarity"}
        </button>
      </div>
      {bag.length === 0 ? (
        <div style={{ margin: "20px 0px" }}>
          -- No gacha data, let's gacha! --
        </div>
      ) : null}
      <ul className="gacha-list">
        {[...bag]
          .sort((a, b) => {
            if (!sort) return false;
            return b.itemRarity[1] - a.itemRarity[1];
          })
          .slice(page * 10, page * 10 + 10)
          .map((b, i) => {
            return (
              <li className={`li-${b.itemRarity}`} key={i}>
                {toListText(b)}
              </li>
            );
          })}
      </ul>
      <div>
        <button type="button" className="btn" onClick={() => setPage(0)}>
          {" "}
          {"|< "} first{" "}
        </button>
        <button type="button" className="btn" onClick={handlePrev}>
          prev {"<"}{" "}
        </button>
        <button type="button" className="btn" onClick={handleNext}>
          next {">"}{" "}
        </button>
        <button type="button" className="btn" onClick={() => setPage(MAX_PAGE)}>
          last {">|"}{" "}
        </button>
      </div>
    </div>
  );
};

export default ModalContent;
