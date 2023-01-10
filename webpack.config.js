const path = require('path');

module.exports = {
  mode: 'development',

  // Path to the entry file, change it according to the path you have
  entry: path.join(__dirname, 'App.tsx'),

  // Path for the output files
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },

  // Enable source map support
  devtool: 'source-map',

  // Loaders and resolver config
  module: {
    rules: [

    ],
  },
  resolve: {

  },
  // Development server config
  devServer: {
    contentBase: [path.join(__dirname, 'public')],
    historyApiFallback: true,
  },
};
