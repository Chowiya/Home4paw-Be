const jwt = require('jsonwebtoken')
const User = require('../Model/UserModel')

const requireAuth = async (req, res, next) => {

    // authendication for image request

    if (req.url.startsWith('/images')) {
        return next();
    }

    const { authorization } = req.headers
    if (!authorization){
        return res.status(401).json({error: 'Authorization token missing'})
    }

    const token = authorization.split(' ')[1]
    try{
        const {_id} = jwt.verify(token, process.env.SECRET) 

        req.user = await User.findOne({_id}).select('_id')
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth