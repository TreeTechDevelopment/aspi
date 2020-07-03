const path = require('path')

const handleClient = (req, res) => {
    res.sendFile(path.join( __dirname, '..', 'public', 'index.html' ))
}

const isAuthenticated = (req, res, next) => {
    try{
        const isAuthenticated = req.isAuthenticated()
        if(isAuthenticated){ return next() }
        res.redirect('/')
    }catch(e){        
        res.sendStatus(500)
    }
}

const isAuthenticatedAdmin = (req, res, next) => {
    try{        
        if(req.user && req.user.role === "ADMIN"){ return next() }
        res.redirect('/')
    }catch(e){         
        res.sendStatus(500)
    }
}

module.exports ={
    handleClient,
    isAuthenticated,
    isAuthenticatedAdmin
}