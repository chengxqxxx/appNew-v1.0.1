'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const express = require('express')
const app = express()
var appData = require('../data.json')
var RECORDS = appData.RECORDS
// var functionlist = appData.functionlist
// var items = appData.items
// var jobs = appData.jobs
// var migrations = appData.migrations
// var orders = appData.orders
// var shipment_suppliers = appData.shipment_suppliers
// var shipments = appData.shipments
// var shopapi = appData.shopapi
// var user = appData.user
// var userfunctionlist = appData.userfunctionlist
var apiRoutes = express.Router()
app.use('/api', apiRoutes)


const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app) {
      app.get('/api/RECORDS', (req, res) => {
        res.json({
          errno:0,
          data: RECORDS
        })
      });
      // app.get('/api/functionlist', (req, res) => {
      //   res.json({
      //     errno:0,
      //     data: functionlist
      //   })
      // });
      // app.get('/api/items', (req, res) => {
      //   res.json({
      //     errno:0,
      //     data: items
      //   })
      // });
      // app.get('/api/jobs', (req, res) => {
      //   res.json({
      //     errno:0,
      //     data: jobs
      //   })
      // });
      // app.get('/api/migrations', (req, res) => {
      //   res.json({
      //     errno:0,
      //     data: migrations
      //   })
      // });
      // app.get('/api/orders', (req, res) => {
      //   res.json({
      //     errno:0,
      //     data: orders
      //   })
      // });
      // app.get('/api/shipment_suppliers', (req, res) => {
      //   res.json({
      //     errno:0,
      //     data: shipment_suppliers
      //   })
      // });
      // app.get('/api/shipments', (req, res) => {
      //   res.json({
      //     errno:0,
      //     data: shipments
      //   })
      // });
      // app.get('/api/shopapi', (req, res) => {
      //   res.json({
      //     errno:0,
      //     data: shopapi
      //   })
      // });
      // app.get('/api/user', (req, res) => {
      //   res.json({
      //     errno:0,
      //     data: user
      //   })
      // });
      // app.get('/api/userfunctionlist', (req, res) => {
      //   res.json({
      //     errno:0,
      //     data: userfunctionlist
      //   })
      // });
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
