const passport = require('passport')

const login = async (req, res, next) => {
    try{
        const handler = passport.authenticate('local', {
            successRedirect : '/cross', 
            failureRedirect : '/records'            
        });
        handler(req, res, next);
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const logout = (req, res) => {
    try{
        req.logout()
        res.redirect('/')
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const isAuthenticated = (req, res) => {
    try{
        const isAuthenticated = req.isAuthenticated()
        console.log(isAuthenticated)
        res.json({ authenticated: isAuthenticated })
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

module.exports = {
    login,
    logout,
    isAuthenticated
}