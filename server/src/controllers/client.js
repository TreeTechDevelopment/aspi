const path = require('path')

const handleClient = (req, res) => {
    res.sendFile(path.join( __dirname, '..', 'public', 'index.html' ))
}

const isAuthenticated = (req, res, next) => {
    try{
        const isAuthenticated = req.isAuthenticated()
        if(isAuthenticated){ return next() }
        else{
            switch(req.method){
                case 'GET':
                    if(JSON.stringify(req.query) !== "{}" || req.originalUrl === "/services/all" || req.originalUrl === "/services/all"){ return res.sendStatus(401) }
                    return res.redirect('/')
                default:
                    return res.sendStatus(401)
            }
        }
    }catch(e){        
        res.sendStatus(500)
    }
}

const isAuthenticatedAdmin = (req, res, next) => {
    try{ 
        if(req.user && req.user.role === "ADMIN"){ return next() }
        else{
            switch(req.method){
                case 'GET':
                    if(JSON.stringify(req.query) !== "{}" || req.originalUrl === "/services/all" || req.originalUrl === "/services/all"){ return res.sendStatus(401) }
                    return res.redirect('/')
                default:
                    return res.sendStatus(401)
            }
        }
    }catch(e){         
        res.sendStatus(500)
    }
}

const isAuthenticatedStatus = (req, res, next) => {
    try{
        const isAuthenticated = req.isAuthenticated()
        res.json({ isLogged: isAuthenticated, role: req.user ? req.user.role : '' })
    }catch(e){        
        res.sendStatus(500)
    }
}

module.exports ={
    handleClient,
    isAuthenticated,
    isAuthenticatedAdmin,
    isAuthenticatedStatus
}