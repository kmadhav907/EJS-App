import express from 'express'
import bodyParser from 'body-parser'

import todayDay from './date.js'

const app = express()

app.set('view engine', 'ejs')
const items = ['Buy Food', 'Cook Food', 'Eat Food']
const workItems = []

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', function (req, res) {
  const day = todayDay()
  res.render('list', { listTitle: day, items: items })
})

app.get('/work', function (req, res) {
  res.render('list', { listTitle: 'Work List', items: workItems })
})

app.post('/', function (req, res) {
  const newItem = req.body.newInput
  if (req.body.list === 'Work') {
    workItems.push(newItem)
    res.redirect('/work')
  } else {
    items.push(newItem)
    res.redirect('/')
  }
})

app.get('/about', function (req, res) {
  res.render('about')
})

app.listen(3000, function () {
  console.log('Server is running on Port 3000')
})
