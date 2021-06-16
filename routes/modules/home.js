const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurants')

router.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .sort({ _id: 'asc'})
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))

})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  if (keyword === "") {
    return res.redirect('/')
  }
  return Restaurants.find()
    .lean()
    .then((restaurants) => {
      const restaurantSearch = restaurants.filter(item => {
        return item.name.toLowerCase().includes(keyword) || item.category.toLowerCase().includes(keyword)
      })
      console.log(keyword)
      res.render('index', { restaurants: restaurantSearch, keyword: keyword })
      console.log(keyword)
    })
    .catch(error => console.log(error))

})

module.exports = router