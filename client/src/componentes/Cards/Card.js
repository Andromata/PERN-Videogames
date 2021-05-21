import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../Styles/card.scss";

const Card = ({ juego }) => {
  return (
    <Fragment>
      <div className="game" key={juego.id}>
        <div className="rating">{juego.rating}</div>
        <div className="front">
          <img src={juego.background_image} alt="" />
          <h4 className="name">{juego.name}</h4>
          <div className="stats">
            <div className="released">
              <p>Released</p>
              <span>{juego.released}</span>
            </div>
            <div className="streamers">
              {juego.platforms.map((g, index) => {
                if (index < 3) {
                  if (g.name === "PC") {
                    const icon = "fas fa-desktop";
                    return (
                      <div className="tooltip">
                        <div className="img">
                          <i className={icon}></i>
                          <span className="tooltiptext">{g.name}</span>
                        </div>
                      </div>
                    );
                  }
                  const icon = "fab fa-" + g.name.split(" ")[0].toLowerCase();

                  return (
                    <div className="tooltip">
                      <div className="img">
                        <i className={icon}></i>
                        <span className="tooltiptext">{g.name}</span>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="back">
          <div className="game-info">
            <div className="genres">
              {juego.genres.map((g, index) => {
               while (index < 3) return <div className="genre">{g.name} </div>;
              })}
            </div>
          </div>
          <Link to={"/index/description/" + juego.id}>
            <button className="btn">See more</button>
          </Link>
        </div>
        <div className="background"></div>
      </div>
    </Fragment>
  );
};

export default Card;
