const mongoose = require('mongoose')
const Restaurants = require('../restaurants')
const restObj = require('../../restaurant.json')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  const restArray = restObj.results

  for (let i = 0; i < restArray.length; i++) {
    Restaurants.create({
      name: restArray[i].name,
      name_en: restArray[i].name_en,
      category: restArray[i].category,
      image: restArray[i].image,
      location: restArray[i].location,
      phone: restArray[i].phone,
      google_map: restArray[i].google_map,
      rating: restArray[i].rating,
      description: restArray[i].description
    })
  }

  console.log('done!')
})

module.exports = db