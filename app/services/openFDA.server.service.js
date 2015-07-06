var util = require('util');
var graphService = require('./graphOfda.server.service');
var tableService = require('./tableOfda.server.service');

/*util.inherits(this, mapService);
util.inherits(this, graphService);*/

graphService.__proto__ = tableService;
this.__proto__ = graphService;


