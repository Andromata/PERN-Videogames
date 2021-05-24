const { Router } = require("express");
const router = Router();
const { Platform } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    Platform.findAll({
      attributes: ["id", "name"],
    }).then((resp) => {
      res.json(resp);
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
