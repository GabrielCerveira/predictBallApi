const User = require("../../dataBase/schemas/Users")
var CPF = require("cpf")
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken")
require("dotenv").config()

class usersController {
    
    // Create User
    async create(request, response) {
        var { name, email, password, confirmPassword, cpf } = request.body
        cpf = cpf.replace(/[^\d]+/g, "")
        try {
            if (!name) {
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "O nome é obrigatorio!",
                })
            }

            if (!email) {
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "O email é obrigatorio!",
                })
            }

            const userExists = await User.findOne({ email })

            if (userExists) {
                return response.status(400).json({
                    error: "Erro de validação",
                    message: "O email já existe!",
                })
            }

            if (!password) {
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "A senha é obrigatoria!",
                })
            }

            if (!confirmPassword) {
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "A confirmação da senha é obrigatoria!",
                })
            }

            if (password !== confirmPassword) {
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "As senhas não conferem!",
                })
            }

            
            if(cpf){
                if(!CPF.isValid(cpf)){
                    return response.status(422).json({
                        error: "Erro de validação",
                        message: "O CPF informado não é valído!",
                    })
                }
            }

            console.log(process.env.JWT_SECRET)
            const tokenConfirmation = jwt.sign({ id: email }, process.env.JWT_SECRET)

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                confirmAccountToken: tokenConfirmation,
                cpf
            })

            return response.json({
                message: "Usuário criado com sucesso!",
                user
            })
        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }

    async auth(request, response){
        const {email, password} = request.body
        try {
            if(!email){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "O email é obrigatorio!",
                })
            }

            //Busca o usuário pelo email
            const userCheck = await User.findOne({email})

            //verifica se o usuário existe
            if(!userCheck){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "O usuário não foi encontrado!",
                })
            }
            
            if(!userCheck.active){
                return response.status(404).json({
                    error: "Erro de validação",
                    message: "A conta não está ativa, será enviado um novo email de confirmação para o seu e-mail.",
                })
            }

            if (!password) {
                return response.status(404).json({
                    error: "Erro de validação",
                    message: "A senha é obrigatoria!",
                })
            }

            //compara as senhas
            if(bcrypt.compare(password, userCheck.password)){
                console.log("Entrou")

                const token = jwt.sign({id: userCheck._id}, process.env.JWT_SECRET)

                return response.status(200).json({
                    message: "Você está logado",
                    token
                })
            }

        } catch (error) {
            return response.status(500).json({
                error: "Could not login!",
                message: error
            })
        }
    }
}

module.exports = new usersController