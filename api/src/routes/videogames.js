const { Router } = require("express");
const router = Router();
require("dotenv").config();
const axios = require("axios");
const { APY_KEY } = process.env;
const { Genres, Platforms, Videogames } = require("../db");
const { v4: uuidv4 } = require("uuid");
const { Sequelize, Op } = require("sequelize");

router.get('/released', async (req, res) => {
try {
  const lastReleased = await axios.get(`https://api.rawg.io/api/games?key=${APY_KEY}&ordering=released`)
  res.status(200).json(lastReleased.data)
} catch (error) {
 console.error(error) 
}
})

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  if (id.includes("-")) {
    Videogames.findByPk(id, {
      include: [
        {
          model: Genres,
          through: {
            attributes: [],
          },
        },
        {
          model: Platforms,
          through: {
            attributes: [],
          },
        },
      ],
    }).then((resp) => {
      return res.json(resp);
    });
  } else {
    const { data } = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${APY_KEY}`
    );

    let platforms = data.platforms.map((p) => {
      return p.platform;
    });

    let format = {
      id: data.id,
      name: data.name,
      description: data.description,
      released: data.released,
      background_image: data.background_image,
      rating: data.rating,
      genres: data.genres,
      platforms: platforms,
    };
    if (format) {
      return res.json(format);
    }
  }
});

router.get("/", async (req, res) => {
  const search = req.query.search;
  let vgData = [];
  if (search !== undefined) {
    try {
      const resp = await axios.get(
        `https://api.rawg.io/api/games?key=${APY_KEY}&search=${search}`
      );

      const videogames = resp.data.results;
      let format = videogames.map((game) => {
        let platforms = game.platforms.map((p) => {
          return p.platform;
        });

        let formatGame = {
          id: game.id,
          name: game.name,
          released: game.released,
          background_image: game.background_image,
          rating: game.rating,
          genres: game.genres,
          platforms: platforms,
        };
        return formatGame;
      });
      vgData = vgData.concat(format);
    } catch (error) {
      console.error(error.message);
    }
    Videogames.findAll({
      where: {
        name: { [Op.like]: `%${search}%` },
      },
      attributes: ["id", "name", "released", "background_image", "rating"],
      include: [
        {
          model: Genres,
          through: {
            attributes: [],
          },
        },
        {
          model: Platforms,
          through: {
            attributes: [],
          },
        },
      ],
    }).then((resp) => {
      vgData = vgData.concat(resp);
      console.log(vgData);
      return res.json(vgData);
    });
  } else {
    const pages = [`https://api.rawg.io/api/games?key=${APY_KEY}`];

    try {
      for (let i = 0; i < 5; i++) {
        const resp = await axios.get(`${pages[i]}`);
        pages.push(resp.data.next);

        let format = resp.data.results.map((game) => {
          let platforms = game.platforms.map((p) => {
            return p.platform;
          });

          let a = {
            id: game.id,
            name: game.name,
            released: game.released,
            background_image: game.background_image,
            rating: game.rating,
            genres: game.genres,
            platforms: platforms,
          };
          return a;
        });

        vgData = vgData.concat(format);
      }
      Videogames.findAll({
        attributes: ["id", "name", "released", "background_image", "rating"],
        include: [
          {
            model: Genres,
            through: {
              attributes: [],
            },
          },
          {
            model: Platforms,
            through: {
              attributes: [],
            },
          },
        ],
      }).then((resp) => {
        vgData = vgData.concat(resp);

        res.json(vgData);
      });
    } catch (error) {
      console.error(error.message);
    }
  }
});

router.post("/", async (req, res) => {

  const { name, description, released, imgUrl, rating, platforms, genres } =
    req.body;

  Videogames.findOrCreate({
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
});

module.exports = router;
