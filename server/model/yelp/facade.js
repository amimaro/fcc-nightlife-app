const Facade = require('../../lib/facade');
const yelpSchema = require('./schema');
const dateTime = require('node-datetime');

class YelpFacade extends Facade {

  going(...args) {
    let dt = dateTime.create();
    let formatted = dt.format('Y-m-d H:M:S');
    args[1].created_at = formatted;

    return this.model
      .update(...args)
      .exec();
  }

}

module.exports = new YelpFacade(yelpSchema);
