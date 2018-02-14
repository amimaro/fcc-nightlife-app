const Facade = require('../../lib/facade');
const yelpSchema = require('./schema');

class YelpFacade extends Facade {}

module.exports = new YelpFacade(yelpSchema);
