import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterGenre, filterPlatform } from "../../Redux/actions/action";

const Genfilter = () => {
  const dispatch = useDispatch();
  const [optionGenre, setOptionGenre] = useState("");
  const [optionPlatform, setoptionPlatform] = useState("");
  const { genres, platforms, filters } = useSelector((store) => store);

  useEffect(() => {
    setOptionGenre(filters.genre);
    setoptionPlatform(filters.platform);
  }, [filters]);

  return (
    <Fragment>
        <div className="selects">
        <select
         className="filter-select"
          value={optionGenre}
          onChange={(e) => dispatch(filterGenre(e.target.value))}
        >
          <option value="" disabled>
            Genre
          </option>
          <option value="all">All</option>
          {genres.map((genre) => {
            return <option value={genre.name}>{genre.name} </option>;
          })}

        </select>
        <select
          className="filter-select"
          value={optionPlatform}
          onChange={(e) => dispatch(filterPlatform(e.target.value))}
        >
          <option value="" disabled>
            Platforms
          </option>
          <option value="all">All</option>
          {platforms.map((platform) => {
            return <option value={platform.name}>{platform.name} </option>;
          })}
        </select>
        </div>
    </Fragment>
  );
};

export default Genfilter;
