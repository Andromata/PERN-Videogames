const {Sequelize} = require('sequelize'); 
const fs = require('fs'); 
const path = require('path'); 
const { dbName, dbHost, dbPassword, dbUser } = require('../utils/config/index')

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`, {
  logging: false, 
  native: false, 
});

const basename = path.basename(__filename);

const modelDefiners = []; 

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize)); 

let entries = Object.entries(sequelize.models); 

let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);

sequelize.models = Object.fromEntries(capsEntries);

const { Genres, Platforms, Videogames } = sequelize.models;

Videogames.belongsToMany(Genres, { through: 'videogames_genres' });
Genres.belongsToMany(Videogames, { through: 'videogames_genres' });

Videogames.belongsToMany(Platforms, {through: 'videogames_platforms'});
Platforms.belongsToMany(Videogames, {through: 'videogames_platforms'});

module.exports = { 
  ...sequelize.models, 
  conn: sequelize,     
};
