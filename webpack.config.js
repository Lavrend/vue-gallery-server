const { join, resolve } = require('path');
const { readdirSync } = require('fs');

const nodeModules = {};
readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = `commonjs ${mod}`);

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: join(__dirname, 'src/app.js'),

  output: {
    path: join(__dirname, 'dist'),
    filename: 'app.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },

  externals: nodeModules,

  resolve: {
    extensions: [
      '.js',
      '.json',
    ],

    modules: [
      resolve('./src/'),
      resolve('./node_modules'),
    ],

    alias: {
      '@': join(__dirname, 'src'),
      '@root': __dirname,
    },
  },
};
