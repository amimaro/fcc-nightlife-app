const Controller = require('../../lib/controller');
const yelpFacade = require('./facade');
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API);

class YelpController extends Controller {

  search(req, res, next) {

    client.search({
      location: req.body.location,
      categories: 'bars'
    }).then(data => {
      console.log(data);
      res.status(201).json(data.jsonBody.businesses)
    }).catch(err => {
      console.log(err);
      res.status(404)
    });
  }

  going(req, res, next) {
    if (req.isAuthenticated()) {
      req.body = {
        location: req.params.id,
        user: req.user,
      }
      this.facade.update({
          '_creator': req.user._id,
          'location': req.params.id
        }, req.body, {
          upsert: true
        })
        .then((results) => {
          console.log(results)
          if (results.n < 1) {
            return res.sendStatus(404);
          }
          if(result.upserted.length > 0){
            return res.sendStatus(204);
          }
          if (results.nModified < 1) {
            return res.sendStatus(304);
          }
          res.sendStatus(204);
        })
        .catch(err => next(err));
    } else {
      res.redirect('/');
    }
  }

}

module.exports = new YelpController(yelpFacade);
