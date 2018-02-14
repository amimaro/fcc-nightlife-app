const Controller = require('../../lib/controller');
const yelpFacade = require('./facade');
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API);

class YelpController extends Controller {

  search(req, res, next) {

    client.search({
      location: req.body.location
    }).then(data => {
      console.log(data);
      res.status(201).json(data.jsonBody)
    }).catch(err => {
      console.log(err);
      res.status(404)
    });
  }

}

module.exports = new YelpController(yelpFacade);
