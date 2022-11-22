const mongoose = require("mongoose")

const Matches = new mongoose.Schema({
    //id da equipe da casa
    idHomeTeam: {
        type: mongoose.Types.ObjectId,
        requerid: true,
    },
    //id da equipe visitante
    idAwayTeam:{
        type: mongoose.Types.ObjectId,
        requerid: true,
        
    },
    //inicias da equipe
    homeTeamInitials: {
        type: String,
        requerid: true,
    },
    awayTeamInitials: {
        type: String,
        requerid: true,
    },
    //Status da partida
    /*
    Status:
    0 = não disputada
    1 = em andamento
    2 = finalizado com vencedor 
    3 = finalizado com empate
    */
    status: {
        type: String,
        requerid: true,
    },
    //data de criação
    matchDate: {
        type: Date,
        requerid: true,
    },
    stadium: {
        type: String,
    },
    winner: {
        type: String,
    },
    homeTeamResult: {
        type: Object,
    },
    awayTeamResult: {
        type: Object,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const matches = mongoose.model("Matches", Matches)

module.exports = matches 