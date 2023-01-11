const mongoose = require("mongoose")

const Matches = new mongoose.Schema({
    //id do campeonato
    idChampionship: {
        type: mongoose.Types.ObjectId,
        ref: 'Championships',
        requerid: true,
    },
    //Rodada em que a partida será disputada
    round: {
        type: Number
    },
    //Fase do campeonato
    /*
    0: running stitches/pontos corridos
    1:group/grupo
    3:round of 32
    3:round of 16 / oitavas de final
    4:quarterfinals / quartas de final
    5:semifinal / semifinal
    6:final
    */
    stage: {
        type: Number,
        requerid: true,
    },
    //Informa o nome do grupo
    groupIndentification:{
        type: String,
        requerid: true,
    },
    groupNumber:{
        type: Number,
        requerid: true,
    },
    //id da equipe da casa
    idHomeTeam: {
        type: mongoose.Types.ObjectId,
        ref: 'Teams',
        requerid: true,
    },
    //id da equipe visitante
    idAwayTeam:{
        type: mongoose.Types.ObjectId,
        ref: 'Teams',
        requerid: true,     
    },
    /*
    //inicias da equipe
    homeTeamInitials: {
        type: String,
        requerid: true,
        lowercase: true,
    },
    awayTeamInitials: {
        type: String,
        requerid: true,
        lowercase: true,
    },*/
    //Status da partida
    /*
    Status:
    0 = não disputada
    1 = em andamento
    2 = finalizado com vencedor 
    3 = finalizado com empate
    */
    status: {
        type: Number,
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