const express = require('express')
const app = express()
const port = 3000

//告訴 Express 靜態檔案是放在名為 public 的資料夾中
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen( port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})