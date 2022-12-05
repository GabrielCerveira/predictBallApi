const mongoose = require("mongoose")

const Bets = new mongoose.Schema({
    //id da partida
    idMatch: {
        type: mongoose.Types.ObjectId,
        requerid: true,
    },
    //id da partida
    punter: {
        type: mongoose.Types.ObjectId,
        requerid: true,
    },
    //Bet gols time visitante
    awayGoals:{
        type: Number,
        requerid: true,
    },
    //Bet gols time da casa
    homeGoals:{
        type: Number,
        requerid: true,
    },
    /* Status da aposta
    Status:
    0 = em andamento
    1 = finalizada */
    status: {
        type: Number,
        requerid: true,
    },
    isWinner:{
        type: Boolean,
    }
})

const bets = mongoose.model("Bets", Bets)

module.exports = bets 