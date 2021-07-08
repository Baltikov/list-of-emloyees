const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static('./triton'))
app.use(bodyParser.json())

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server started: ${port}`)
})