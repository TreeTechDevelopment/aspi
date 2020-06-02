const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const User = require('../db/models/users')

const login = async (req, res) => {
    try{
        const { userName, password } = req.body
        const user = await User.findOne({ 'userName': userName })
        if(!user){ return res.status(400).json({ ok: false, message: "Usuario o contraseña incorrectos" }) }
        if(!bcrypt.compareSync( password, user.password )){ 
            return res.status(400).json({ ok: false, message: "Usuario o contraseña incorrectos" }) 
        }
        const userResponse = { userName: user.userName }
        const token = jwt.sign(userResponse, process.env.JWT_KEY, { expiresIn: "2d" })
        res.json({ ok: true, user: userResponse, token })
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

module.exports = {
    login
}