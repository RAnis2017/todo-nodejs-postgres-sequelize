const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
var cors = require('cors')

app.use(cors())
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api',require('./routes'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})