const { Op } = require("sequelize");
const { Videogame, Genre, Platform } = require("../db");
const { APYKEY } = require("../../utils/config/index");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

async function getNewReleases(req, res, next) {
  try {
    const lastReleased = await axios.get(
      `https://api.rawg.io/api/games?key=${APYKEY}&ordering=released`
    );
    res.status(200).json(lastReleased.data);
  } catch (error) {
    next(error);
  }
}

async function getVideogameById(req, res, next) {
  const id = req.params.id;

  if (id.includes("-")) {
    try {
      const game = await Videogame.findByPk(id, {
        include: [
          {
            model: Genre,
            through: {
              attributes: [],
            },
          },
          {
            model: Platform,
            through: {
              attributes: [],
            },
          },
        ],
      });
      return res.status(200).json(game);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const { data } = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${APYKEY}`
      );
      console.log("DATAAAAAAAAA", data);
      let platforms = data.platforms.map((p) => {
        return p.platform;
      });

      let game = {
        id: data.id,
        name: data.name,
        description: data.description,
        released: data.released,
        background_image: data.background_image,
        rating: data.rating,
        genres: data.genres,
        platforms: platforms,
      };
      return res.status(200).json(game);
    } catch (error) {
      next(error);
    }
  }
}

async function searchVideogameByName(req, res, next) {
  const search = req.query.search;
  let vgData = [];

  //search in API
  try {
    const resp = await axios.get(
      `https://api.rawg.io/api/games?key=${APYKEY}&search=${search}`
    );
    const apiGames = resp.data.results;

    let formatedApiGames = apiGames.map((game) => {
      let formatGame = {
        id: game.id,
        name: game.name,
        released: game.released,
        background_image: game.background_image,
        rating: game.rating,
        genres: game.genres,
        platforms: game.platforms.map((p) => {
          return p.platform;
        }),
      };
      return formatGame;
    });
    vgData = vgData.concat(formatedApiGames);
  } catch (error) {
    next(error);
  }

  //search in DB
  try {
    const dbGames = await Videogame.findAll({
      where: {
        name: { [Op.like]: `%${search}%` },
      },
      attributes: ["id", "name", "released", "background_image", "rating"],
      include: [
        {
          model: Genre,
          through: {
            attributes: [],
          },
        },
        {
          model: Platform,
          through: {
            attributes: [],
          },
        },
      ],
    });
    vgData = vgData.concat(dbGames);
    return res.status(200).json(vgData);
  } catch (error) {
    next(error);
  }
}

async function getAllVideogames(req, res, next) {
  let vgData = [];
  const pages = [`https://api.rawg.io/api/games?key=${APYKEY}`];
  try {
    for (let i = 0; i < 5; i++) {
      const resp = await axios.get(`${pages[i]}`);
      pages.push(resp.data.next);

      let formatedApiGame = resp.data.results.map((game) => {
        let formatedGame = {
          id: game.id,
          name: game.name,
          released: game.released,
          background_image: game.background_image,
          rating: game.rating,
          genres: game.genres,
          platforms: game.platforms.map((p) => {
            return p.platform;
          }),
        };
        return formatedGame;
      });

      vgData = vgData.concat(formatedApiGame);
    }
    const dbGames = await Videogame.findAll({
      attributes: ["id", "name", "released", "background_image", "rating"],
      include: [
        {
          model: Genre,
          through: {
            attributes: [],
          },
        },
        {
          model: Platform,
          through: {
            attributes: [],
          },
        },
      ],
    });
    vgData = vgData.concat(dbGames);
    res.status(200).json(vgData);
  } catch (error) {
    next(error);
  }
}

function createVideogame(req, res) {
  const { name, description, released, imgUrl, rating, platforms, genres } =
    req.body;

  Videogame.findOrCreate({
    where: {
      id: uuidv4(),
      name: name,
      description: description,
      released: released,
      background_image: imgUrl,
      rating: rating,
    },
  }).then((newGame) => {
    platforms.forEach((id) => newGame[0].addPlatforms(id));
    genres.forEach((id) => newGame[0].addGenres(id));
  });

  res.redirect("http://localhost:3000/index");
}

module.exports = {
  getNewReleases,
  getVideogameById,
  searchVideogameByName,
  getAllVideogames,
  createVideogame,
};
