/**
*
*/

var OlhoAberto;

// Constructor


OlhoAberto = function() {
  // set interval between requests
}

// Retrieves information from route
OlhoAberto.getRoutePositions = function(routeId) {
  // return a array of bus positions
}

OlhoAberto.lastPositions = {}

// If a bus positions for a route is changed, return movement vector in array
OlhoAberto.checkForMovementsVectors = function(routeId) {
  var movements = [],
      positions = this.getRoutePositions(routeId);
  
  // if route hasn't been updated yet, just save positions
  if (!lastPositions['routeId']) {
    lastPositions['routeId'] = positions;
  } else {
    // for each position, check if unit has a prior position
    _.each(positions, function(position){
      if (!lastPositions['routeId'][position.vehicle_id]) {
        lastPositions['routeId'][position.vehicle_id] = position
      } else {
        // if position for unit has changed, create a movement vector
        var priorCoordinates = lastPositions['routeId'][position.vehicle_id].coordinates;
        if (position.coordinates != priorCoordinates) {
          movements << new Movement(position, priorPosition);
        }
      }
    });
  }

  return movements;
}