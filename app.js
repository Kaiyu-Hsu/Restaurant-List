const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')

// require express-handlebars here
const exphbs = require('express-handlebars')

//告訴 Express 靜態檔案是放在名為 public 的資料夾中
app.use(express.static('public'))

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting router 首頁
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// 更多內容 => 餐廳資訊
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id )
  res.render('show', { restaurant: restaurant })
})

// search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.listen( port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})