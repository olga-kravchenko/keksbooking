const path = require(`path`);

module.exports = {
  entry: [
    `./js/backend.js`,
    `./js/util-form.js`,
    `./js/util.js`,
    `./js/pin.js`,
    `./js/card.js`,
    `./js/filters-form.js`,
    `./js/pin-moving.js`,
    `./js/map.js`,
    `./js/preview.js`,
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
