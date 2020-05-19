const express = require('express');
const path = require('path')

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static(path.resolve( __dirname, 'src/public' )))
app.use(require('./src/routes/routes'))

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})