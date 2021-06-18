const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Restaurants = require('./models/restaurants')
require('./config/mongoose')

const routes = require('./routes')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

//告訴 Express 靜態檔案是放在名為 public 的資料夾中
app.use(express.static('public'))

app.use(routes)

app.listen( port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})