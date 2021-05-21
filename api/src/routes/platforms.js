const { Router } = require("express");
const router = Router();
const { Platforms } = require("../db");

router.get("/", async (req, res) => {
  try {
    Platforms.findAll({
      attributes: ["id", "name"],
    }).then((resp) => {
      res.json(resp);
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
