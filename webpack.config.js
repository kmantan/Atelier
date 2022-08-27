const Dotenv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');
const dotEnv = require('dotenv-webpack');

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "/client/src/index.jsx"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/client/dist/"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  plugins: [
    new dotEnv({
      ignoreStub: true,
    })
  ]
};
