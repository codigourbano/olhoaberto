/*!
 * Module dependencies.
 */

var async = require('async')

/**
 * Controllers
 */

var routes = require('./controllers/routes')
  , sync = require('./controllers/sync')


/**
 * Expose routes
 */

module.exports = function (app, passport) {

  // home route
  app.get('/', routes.index);

  // sync routs
  app.get('/sync/sptrans', sync.sptrans);  
  app.get('/sync/osm', sync.osm);  

  // route documents
  app.param('id', routes.load)
  app.get('/routes', routes.index)
  app.get('/routes/:id', routes.show)

  // home route
  app.get('/', routes.index)

}