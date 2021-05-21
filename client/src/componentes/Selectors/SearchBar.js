import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
  searchGame,
  loadingGame,
  clearSearch,
  resetFilters,
} from "../../Redux/actions/action";
import * as AiIcons from 'react-icons/ai'
import "./searchBar.css";


const SearchBar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <Fragment>
      <div className="search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(loadingGame(true));
            if (search.length > 0) {
              dispatch(searchGame(search));
              dispatch(resetFilters());
            } else {
              dispatch(clearSearch([]));
              dispatch(resetFilters());
            }
            setSearch("");
            dispatch(loadingGame(false));
          }}
        >
          <input
            type="text"
            name="search"
            className="buscar-txt"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => handleInputChange(e)}
          />
          <button className="btn-search" type="submit">
            <AiIcons.AiOutlineSearch/>
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default SearchBar;
