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
            <i class="fas fa-sort-alpha-down"></i>
          </button>
          <button
            className="filter-btn"
            onClick={() => dispatch(filterOrder("za"))}
          >
            <i class="fas fa-sort-alpha-down-alt"></i>
          </button>
          <button
            className="filter-btn"
            onClick={() => dispatch(filterOrder("asc"))}
          >
            <i class="fas fa-star"></i> ↑
          </button>
          <button
            className="filter-btn"
            onClick={() => dispatch(filterOrder("des"))}
          >
            <i class="fas fa-star"></i> ↓
          </button>
        </div>
    </Fragment>
  );
};

export default Btnfilters;
