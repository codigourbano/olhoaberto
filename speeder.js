

// sample data
var ways_coordinates = [
	[[1,1],[1,3]],
	[[1,3],[4,3],[5,6],[10,11]],
	[[10,11],[10,15],[12,13],[14,23]],
	[[14,23],[15,17],[16,18],[23,20]],
	[[23,20],[27,31],[29,30],[34,23]],
	[[34,23],[37,24],[28,30],[32,30]],
	[[32,30],[35,27],[37,30],[40,31]],
	[[40,31],[49,33],[57,37],[60,32]]
]


// auxiliary functions
var way_length = function (points_array) {
  var length = x0 = y0 = x1 = y1 = 0;
  console.log(points_array);
  for (var i = 1; i < points_array.length; i++) {
    x0 = points_array[i-1][0];
    y0 = points_array[i-1][1];
    x1 = points_array[i][0];
    y1 = points_array[i][1];
    length += Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0))
  }
  return length;
}

var ways = {}

// build ways
for (var i = 0; i< ways_coordinates.length; i++) {
  ways[i] = {};
  ways[i].geometry = ways_coordinates[i];
  ways[i].length = way_length(ways[i].geometry) 
};


var vector1 = {
  geometry: [[1,1],[5,6]],
  time: 5 
}
