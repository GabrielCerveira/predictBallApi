const mongoose = require("mongoose")

const Teams = new mongoose.Schema({
    //nome da equipe
    team: {
        type: String,
        requerid: true,
        unique: true,
    },
    //Apelido do time Ex:. Confederação brasileira de futebol, conhecida como Brasil
    surname:{
        type: String,
        requerid: true,
    },
    //inicias da equipe
    initialsTeam: {
        type: String,
        requerid: true,
        uppercase: true,
    },
    //inicias da equipe
    flagsInitialsTeam: {
        type: String,
        uppercase: true,
    },
    //tipo de equipe time/seleção
    type: {
        type: String,
        requerid: true,
    },
    //data de criação
    createAt: {
        type: Date,
        default: Date.now
    }
})

const teams = mongoose.model("Teams", Teams)

module.exports = teams 