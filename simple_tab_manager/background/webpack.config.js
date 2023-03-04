const path = require('path');

const config = {
  mode: process.env.NODE_ENV,
  entry: {
    background: path.join(__dirname, 'src/background.ts'),
  },
  output: {
    path: path.join(__dirname, '../extensions/background_dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

module.exports = config;
