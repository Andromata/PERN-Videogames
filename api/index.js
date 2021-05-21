//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const { default: axios } = require('axios');
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Genres, Platforms } = conn.models;

//APIKEY
require('dotenv').config();
const { APY_KEY } = process.env;

const getGenres = async () => {
  try {
   let allGenres = await axios.get(`https://api.rawg.io/api/genres?key=${APY_KEY}`)

    allGenres.data.results.forEach(elm => {
      Genres.findOrCreate({
        where: {
          name: elm.name
        }

      })
    });
  } catch (error) {
    console.error(error.message)
  }
};

const getPlatforms = async () => {
  try {
    platforms = await axios.get(`https://api.rawg.io/api/platforms?key=${APY_KEY}`)
    platforms.data.results.forEach(elm => {
      Platforms.findOrCreate({
        where: {
          name: elm.name
        }

      })
    });
  } catch (error) {
    console.error(error.message)
  }
};

conn.sync({ truncate: null }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); 
  });
  
  getGenres();
  getPlatforms()

});