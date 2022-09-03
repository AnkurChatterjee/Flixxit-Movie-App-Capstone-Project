const jwt = require('jsonwebtoken');

function verify(request,response,next){
    const authHeader = request.headers.token;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err,userCredentials) => {
            if(err) response.status(403).json('Token is invalid!')
            request.user = userCredentials;
            next();
        })
    } else {
        return response.status(401).json({message: "You are not authenticated!"});
    }
}

module.exports = verify;