import React from "react";
import "./cardlayout.css";

const CategoryLayout = ({ left, right, navOpen }) => {
  return (
    <div className="catlay--container">
      <div
        className={`catlay--navigation ${
          navOpen ? "catlay--navigation--open" : "catlay--navigation--closed"
        }`}
      >
        {left}
      </div>
      <div className="catlay--content">{right}</div>
    </div>
  );
};

export default CategoryLayout;
