const jwt = require("jsonwebtoken")
require("dotenv").config()

class middlewares{
    async auth(request,response ,next) {
        const authHeader = request.headers["authorization"]
       
        if (!authHeader) {
            return response.status(401).json({
                message: "Acesso negado!"
            })
        }

        try {
            await jwt.verify(authHeader, process.env.JWT_SECRET)
            next()
        } catch (error) {
            response.status(400).json({
                message: "Token inválido!"
            })
        }
    }
}
module.exports = new middlewares