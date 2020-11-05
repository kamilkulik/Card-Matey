const express = require('express')
const app = express()
const port = 3700

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})

module.exports = app
