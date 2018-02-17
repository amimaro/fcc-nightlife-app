const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const yelpSchema = new Schema({
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  location: String,
  created_at: Date,
});


module.exports = mongoose.model('Yelp', yelpSchema);
