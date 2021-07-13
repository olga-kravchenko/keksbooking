const path = require(`path`);

module.exports = {
  entry: [
    `./js/modules/backend.js`,
    `./js/modules/util-form.js`,
    `./js/modules/util.js`,
    `./js/modules/pin.js`,
    `./js/modules/card.js`,
    `./js/modules/filter-form.js`,
    `./js/modules/pin-moving.js`,
    `./js/modules/map.js`,
    `./js/modules/preview.js`,
    `./js/modules/form.js`,
    `./js/modules/main.js`,
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: "eval"
}
