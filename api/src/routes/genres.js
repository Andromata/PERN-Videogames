const { Router } = require("express");
const router = Router();
const { Genres } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    Genres.findAll({
      attributes: ["id", "name"],
    }).then((resp) => {
      res.json(resp);
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
