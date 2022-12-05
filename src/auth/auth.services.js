const checkUserCredintials = require('./auth.controller');
const jwtSecret = require('../../config').api.jwtSecret;
const jwt = require('jsonwebtoken');


const postLogin = (req, res) => {

    const { email, password } = req.body

    if(email && password){
        checkUserCredintials(email, password)
            .then((data) => {
                if(data){
                    const token = jwt.sign({
                        id: data.id,
                        email: data.email,
                        role: data.role
                    }, jwtSecret)

                    res.status(200).json({
                        message: 'Correct Credentials',
                        token 
                    })
                } else {
                    res.status(401).json({message: 'Invalid Credentials'})
                }
            })
            .catch((err) => {
                res.status(400).json({message : err.message})
            })
    } else {
        res.status(400).json({message: 'Missing Data', fields: {email: 'example@example.com', rol: 'string'}})
    }
}

module.exports = {postLogin};
    
