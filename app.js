const express = require('express')
const Restaurants = require('./models/restaurants')
const mongoose = require('mongoose') // 載入 mongoose

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

// require express-handlebars here
const exphbs = require('express-handlebars')

//告訴 Express 靜態檔案是放在名為 public 的資料夾中
app.use(express.static('public'))

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting router 首頁
app.get('/', (req, res) => {
  res.render('index', { restaurants: Restaurants.results })
})

// 更多內容 => 餐廳資訊
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = Restaurants.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id )
  res.render('show', { restaurant: restaurant })
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