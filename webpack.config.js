const path = require(`path`);

module.exports = {
  entry: [
    `./js/constants.js`,
    `./js/backend.js`,
    `./js/util-form.js`,
    `./js/util.js`,
    `./js/pin.js`,
    `./js/card.js`,
    `./js/map.js`,
    `./js/form.js`,
    `./js/main.js`,
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: "eval"
}
