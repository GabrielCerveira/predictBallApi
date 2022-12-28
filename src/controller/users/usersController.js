const User = require("../../dataBase/schemas/Users")
const Sweepstakes = require("../../dataBase/schemas/Sweepstakes")
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

    //Adiciona saldo a conta do usuário

    async addBalanceUser(request, response){
        const _id =  request.params.id
        const {balance} =  request.body

        try {
            if(!_id){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar o id do usuário!"
                })
            }
            
            if(!balance){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar o saldo que será adicionado!"
                })
            }
            
            const checkUser = await User.findById(_id)
           
            
            if(!checkUser){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "O usuário não foi encontrado!"
                })
            }

            await User.updateOne({_id},{
                balance: checkUser.balance === undefined ? balance : checkUser.balance + balance
            })

            return response.status(200).json({
                message: "Foi adicionado R$ " + balance + " a conta do usuário "+ checkUser.name,
            })

        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }
    
    //adiciona o bolão que o usuário está participando
    async addSweepstake(request,response){
        const {idSweepstake, idUser} = request.body
        try {
            if(!idSweepstake){
                return response.status(404).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar o bolão!",
                })
            }

            const checkSweepstakes = await Sweepstakes.findById({_id: idSweepstake})

            if(!checkSweepstakes){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "O bolão não foi encontrado!"
                })
            }

            if(!idUser){
                return response.status(404).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar o usuário!",
                })
            }
            
            const checkUser = await User.findById({_id: idUser})

            if(!checkUser){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "O usuário não foi encontrado!"
                })
            }

            if(checkUser.balance - checkSweepstakes.valueToBet < 0){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "O usuário não possui saldo suficiente!"
                })
            }

            if(checkUser.sweepstakesUser.length != 0){
                if(checkUser.sweepstakesUser.map((e) => e.sweepstake).indexOf(idSweepstake) != -1){
                    return response.status(422).json({
                        error: "Erro de validação",
                        message: "O usuário já está cadastrado neste bolão!"
                    })
                }
            }
            
            const sweepstakesUser = checkUser.sweepstakesUser

            sweepstakesUser.push({
                sweepstake: idSweepstake,
                valueToBet: checkSweepstakes.valueToBet
            })

            await User.updateOne({_id: idUser},{
                sweepstakesUser,
                balance: checkUser.balance - checkSweepstakes.valueToBet
            })

            const usersInSweepstakes = await User.count({ "sweepstakesUser.sweepstake" : idSweepstake })

            await Sweepstakes.updateOne({_id: idSweepstake},{
                usersInSweepstakes,
                totalAmountBet: usersInSweepstakes * checkSweepstakes.valueToBet
            })

            return response.status(200).json({
                message: checkUser.name + " foi adicionado ao bolão: "+ checkSweepstakes.name,
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

                const token = jwt.sign({id: userCheck._id}, process.env.JWT_SECRET, {expiresIn: 3600} ) 

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