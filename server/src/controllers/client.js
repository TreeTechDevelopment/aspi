const path = require('path')

const handleClient = (req, res) => {
    res.sendFile(path.join( __dirname, '..', 'public', 'index.html' ))
}

module.exports ={
    handleClient
}