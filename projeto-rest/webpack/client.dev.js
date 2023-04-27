const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../config/dev.json');

var hasModuloAtendimento = false;
var hasModuloRelatorio = false;
var hasModuloUsuario = false;
var imagesPath = null;
var buildVersion = null;
var saasPath = 'default';

const npmConfigArgv = JSON.parse(process.env.npm_config_argv);
npmConfigArgv.original.forEach(o => {
  if (o.includes('build=')) {
    buildVersion = o.split('=')[1];
  }
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
module.exports = {
  name: 'client',
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    hot: true
  },
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, '../src/index.js')
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
      use: [
        'file-loader'
      ]
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }]
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
      include: path.resolve(__dirname, '../')
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: [
        'style-loader',
        {
          loader: 'css-loader',
          query: {
            modules: true,
            sourceMap: true,
            importLoaders: 1,
            camelCase: 'dashes',
            localIdentName: '[name]__[local]--[hash:base64:5]'
          }
        },
        {
          loader: 'sass-loader',
          options: {
            data: '@import "' + saasPath + '/_variables.scss";',
            includePaths: [path.resolve('./src/sass/custom')],
            sourceMap: true
          }
        }
      ]
    }
    ]
  },
  resolve: {
    alias: {
      api: path.resolve('src/api'),
      components: path.resolve('src/components'),
      layout: path.resolve('src/components/layout'),
      containers: path.resolve('src/containers'),
      sass: path.resolve('src/sass'),
      img: path.resolve(imagesPath ? 'src/images/' + imagesPath : 'src/images'),
      imgkiman: path.resolve('src/images/'),
      modules: path.resolve('node_modules'),
      services: path.resolve('src/services'),
      _redux: path.resolve('src/redux')
    },
    modules: [path.resolve('src/'), 'node_modules'],
    extensions: ['.js', '.css', '.scss']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      ENV: 'development',
      ATENDIMENTO: hasModuloAtendimento,
      RELATORIO: hasModuloRelatorio,
      USUARIO: hasModuloUsuario,
      BUILD_VERSION: JSON.stringify(buildVersion)
    })
  ]
};
