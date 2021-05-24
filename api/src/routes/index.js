const { Router } = require('express');

const videogamesRoutes = require('./videogames');
const genresRoutes = require('./genres');
const platformsRoutes = require('./platforms');

const router = Router();

router.use('/videogames', videogamesRoutes);
router.use('/genres', genresRoutes);
router.use('/platforms', platformsRoutes);

module.exports = router;