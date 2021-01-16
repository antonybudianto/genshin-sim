import React, { useState } from "react";

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
        <button onClick={handleSort} type="button">
          sort by {sort ? "date" : "rarity"}
        </button>
      </div>
      {bag.length === 0 ? <div>-- no gacha data, start gacha! --</div> : null}
      <ul>
        {[...bag]
          .sort((a, b) => {
            if (!sort) return false;
            return b[1] - a[1];
          })
          .slice(page * 10, page * 10 + 10)
          .map((b, i) => {
            return (
              <li className={`li-b${b[1]}`} key={i}>
                {b}
              </li>
            );
          })}
      </ul>
      <button type="button" onClick={() => setPage(0)}>
        {" "}
        {"|< "} first{" "}
      </button>
      <button type="button" onClick={handlePrev}>
        prev {"<"}{" "}
      </button>
      <button type="button" onClick={handleNext}>
        next {">"}{" "}
      </button>
      <button type="button" onClick={() => setPage(MAX_PAGE)}>
        last {">|"}{" "}
      </button>
    </div>
  );
};

export default ModalContent;
