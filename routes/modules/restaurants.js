const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurants')

// create 
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name //必填
  const name_en = req.body.name_en
  const category = req.body.category //必填
  const image = req.body.image
  const location = req.body.location //必填
  const phone = req.body.phone //必填
  const google_map = req.body.google_map
  const rating = req.body.rating //必填
  const description = req.body.description
  console.log({
    name, name_en, category, image, location, phone, google_map, rating, description
  })

  return Restaurants.create({
    name, name_en, category, image, location, phone, google_map, rating, description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

// detail
router.get('/:id', (req, res) => {
  const id = req.params.id

  return Restaurants.findById(id)
    .lean()
    .then((restaurants) => res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

// update
router.get('/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurants.findById(id)
    .lean()
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurants.findById(id)
    .then(restaurants => {
      restaurants.name = name
      restaurants.name_en = name_en
      restaurants.category = category
      restaurants.image = image
      restaurants.location = location
      restaurants.phone = phone
      restaurants.google_map = google_map
      restaurants.rating = rating
      restaurants.description = description
      return restaurants.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// search
// router.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const restaurants = Restaurants.results.filter((restaurant) => {
//     return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
//   })
//   res.render('index', { restaurants: restaurants, keyword: keyword })
// })

module.exports = router