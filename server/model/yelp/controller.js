const Controller = require('../../lib/controller');
const yelpFacade = require('./facade');
const yelpAPI = require('yelp-api');
const yelp = new yelpAPI(process.env.YELP_API);

class YelpController extends Controller {

  search(req, res, next) {

    let params = [{ location: req.body.location }];
    yelp.query('businesses/search', params)
      .then(data => {
        console.log(data);
        res.status(201).json(data)
      })
      .catch(err => {
        console.log(err);
        res.status(404)
      });
  }

}

module.exports = new YelpController(yelpFacade);
