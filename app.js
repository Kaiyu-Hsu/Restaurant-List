const express = require('express')
const Restaurants = require('./models/restaurants')
const mongoose = require('mongoose') // 載入 mongoose
const bodyParser = require('body-parser')

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true}) // 設定連線到 mongoDB
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// require express-handlebars here
const exphbs = require('express-handlebars')

//告訴 Express 靜態檔案是放在名為 public 的資料夾中
app.use(express.static('public'))

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting router 首頁
app.get('/', (req, res) => {
  // res.render('index', { restaurants: Restaurants.results })
  Restaurants.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }) )
    .catch(error => console.log(error))
  
})

// create 
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
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
    name, name_en, category, image, location, phone, google_map, rating, description})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
  
})

// 更多內容 => 餐廳資訊
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  
  return Restaurants.findById(id)
    .lean()
    .then((restaurants) => res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

// update
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurants.findById(id)
    .lean()
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
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
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = Restaurants.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.listen( port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})