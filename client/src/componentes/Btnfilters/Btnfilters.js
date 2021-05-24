import React, { Fragment } from "react";
import { filterOrder } from "../../Redux/actions/action";
import { useDispatch } from "react-redux";

const Btnfilters = () => {
  const dispatch = useDispatch();
  return (
    <Fragment>
      <div className="filters">
          <button
            className="filter-btn"
            onClick={() => dispatch(filterOrder("az"))}
          >
            <i className="fas fa-sort-alpha-down"></i>
          </button>
          <button
            className="filter-btn"
            onClick={() => dispatch(filterOrder("za"))}
          >
            <i className="fas fa-sort-alpha-down-alt"></i>
          </button>
          <button
            className="filter-btn"
            onClick={() => dispatch(filterOrder("asc"))}
          >
            <i className="fas fa-star"></i> ↑
          </button>
          <button
            className="filter-btn"
            onClick={() => dispatch(filterOrder("des"))}
          >
            <i className="fas fa-star"></i> ↓
          </button>
        </div>
    </Fragment>
  );
};

export default Btnfilters;
