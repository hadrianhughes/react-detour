const path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    react: 'commonjs react'
  }
};
