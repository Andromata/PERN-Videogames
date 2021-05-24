const { Router } = require("express");
const router = Router();
const {
  getNewReleases,
  getVideogameById,
  searchVideogameByName,
  getAllVideogames,
  createVideogame,
} = require("../controllers/videogames");

router.get("/released", getNewReleases);
router.get("/search", searchVideogameByName);
router.get("/:id", getVideogameById);
router.get("/", getAllVideogames);
router.post("/", createVideogame);

module.exports = router;
