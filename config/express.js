
/**
 * Module dependencies.
 */

var 
  express = require('express'),
  pkg = require('../package.json'),
  compression = require('compression'),
  bodyParser = require('body-parser'),
  errorHandler = require('errorhandler'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session);


var env = process.env.NODE_ENV || 'development'

module.exports = function (app, config) {

  app.set('showStackError', true)

  // should be placed before express.static
  app.use(compression());

  app.use(express.static(config.root + '/public'))


  // set views path, template engine and default layout
  app.set('views', config.root + '/views')
  app.set('view engine', 'jade')


  // expose package.json to views
  app.use(function (req, res, next) {
    res.locals.pkg = pkg
    next()
  })
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())
  
  app.use(errorHandler())

  if (process.env.NODE_ENV === 'development') {
    app.locals.pretty = true
  }

}