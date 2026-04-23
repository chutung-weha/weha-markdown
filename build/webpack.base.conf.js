var path = require('path')
var webpack = require('webpack')
var utils = require('./utils')
var config = require('../config')
var VueLoaderPlugin = require('vue-loader/lib/plugin')
var vueLoaderConfig = require('./vue-loader.conf')
var StylelintPlugin = require('stylelint-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/'
  },
  node: {
    // For mermaid
    fs: 'empty' // jison generated code requires 'fs'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      mermaid: 'mermaid/dist/mermaid.core.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // We can't pass graphlibrary to babel
      {
        test: /\.js$/,
        loader: 'string-replace-loader',
        include: [
          resolve('node_modules/graphlibrary')
        ],
        options: {
          search: '^\\s*(?:let|const) ',
          replace: 'var ',
          flags: 'gm'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/mermaid'),
          resolve('node_modules/d3-scale-chromatic'),
          resolve('node_modules/d3-interpolate'),
          resolve('node_modules/d3-color'),
          resolve('node_modules/d3-scale'),
          resolve('node_modules/d3-array'),
          resolve('node_modules/d3-format'),
          resolve('node_modules/d3-time'),
          resolve('node_modules/d3-time-format'),
          resolve('node_modules/d3-selection'),
          resolve('node_modules/d3-axis'),
          resolve('node_modules/d3-brush'),
          resolve('node_modules/d3-chord'),
          resolve('node_modules/d3-contour'),
          resolve('node_modules/d3-delaunay'),
          resolve('node_modules/d3-dispatch'),
          resolve('node_modules/d3-drag'),
          resolve('node_modules/d3-dsv'),
          resolve('node_modules/d3-ease'),
          resolve('node_modules/d3-fetch'),
          resolve('node_modules/d3-force'),
          resolve('node_modules/d3-geo'),
          resolve('node_modules/d3-hierarchy'),
          resolve('node_modules/d3-path'),
          resolve('node_modules/d3-polygon'),
          resolve('node_modules/d3-quadtree'),
          resolve('node_modules/d3-random'),
          resolve('node_modules/d3-shape'),
          resolve('node_modules/d3-timer'),
          resolve('node_modules/d3-transition'),
          resolve('node_modules/d3-zoom'),
          resolve('node_modules/d3'),
          resolve('node_modules/internmap'),
          resolve('node_modules/delaunator'),
          resolve('node_modules/robust-predicates')
        ],
        exclude: [
          resolve('node_modules/mermaid/src/diagrams/class/parser'),
          resolve('node_modules/mermaid/src/diagrams/flowchart/parser'),
          resolve('node_modules/mermaid/src/diagrams/gantt/parser'),
          resolve('node_modules/mermaid/src/diagrams/git/parser'),
          resolve('node_modules/mermaid/src/diagrams/sequence/parser')
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(ttf|eot|otf|woff2?)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(md|yml|html)$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new StylelintPlugin({
      files: ['**/*.vue', '**/*.scss']
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('../package.json').version)
    })
  ]
}
