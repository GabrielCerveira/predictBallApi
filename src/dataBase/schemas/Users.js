const mongoose = require("mongoose")

const User = new mongoose.Schema({
    //Nome
    name: {
        type: String,
        requerid: true,
    },
    active:{
        type: Boolean,
        default: false,
    },
    //Email
    email: {
        type: String,
        requerid: true,
        unique: true,
        lowercase: true,
    },
    //Senha
    password: {
        type: String,
        requerid: true,
        //Para não mostrar na pesquisa
        //select: false
    },
    //Data de criação
    createAt: {
        type: Date,
        default: Date.now
    },
    //Data de atualização
    updateAt: {
        type: Date,
    },    
    //Token para resetar a senha
    resetPasswordToken: {
        type: String,
    },
    //Token de ativação da conta
    confirmAccountToken: {
        type: String,
    },
    //CPF
    cpf: {
        type: String,
       
        unique: true,
    },
    //Saldo
    balance: {
        type: String,
       
    },
})

const user = mongoose.model("User", User)

module.exports = user 