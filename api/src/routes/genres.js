const { Router } = require("express");
const router = Router();
const { Genre } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    Genre.findAll({
      attributes: ["id", "name"],
    }).then((resp) => {
      res.json(resp);
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
