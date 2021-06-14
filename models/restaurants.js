const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    require: true, // 這是個必填欄位
  },
  name_en: {
    type: String
  },
  category: {
    type: String,
    require: true
  },
  image: {
    type: String
  },
  location: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  google_map: {
    type: String
  },
  rating: {
    type: Number,
    require: true
  },
  description: {
    type: String
  }
})

module.exports = mongoose.model('Restaurants', restaurantSchema)