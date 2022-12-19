const mongoose = require("mongoose")

const Sweepstakes = new mongoose.Schema({
    //nome do bolão
    name:{
        type: String,
        requerid: true,
    },
    //Define se será concedido pontos para usuarios por acertar o vencedor da partida
    giveScoreForWinner:{
        type: Boolean,
        default: false
    },
    //Pontuação para acertar o vencedor da partida
    scoreForWinner:{
        type: Number,
        default: 10
    },
    //Pontuação para acertar o resultado exato
    scoreForResultExact:{
        type: Number,
        default: 10
    },
    //Soma as duas pontuações
    addScore:{
        type: Boolean,
        default: false
    },
    //Fecha a aposta x horas antes do jogo max 72h min 1h
    closeBetHours: {
        type: Number,
        default: 1
    },
    //Valor para entrar no bolão
    valueToBet: {
        type: Number,
        default: 0
    },
    //Valor do prêmio é calculdo proporcionalmente a quantidade de participantes
    setProportionalValue:{
        type: Boolean,
        requerid: true
    },
    
    //Definir valor fixo do prêmio do bolão
    valueToAward: {
        type: Number
    },
    //Permitir entrar no bolão após começar as partidas
    enterPoolAfterStarting:{
        type: Boolean,
        default: false
    },

    //Definir peso diferente por partida
    //Ex: partida 1 = 1, partida 2 = 1,05, partida 38 = 2,9 
    setDifferentWeightMatch:{
        type: Boolean,
        default: false
    },
    
    // define qual será a diferença dos pesos entre cada rodada
    setWeightForMatch:{
        type: mongoose.Types.Decimal128,
        default: 0.05
    },

    //informa quantos usuários estão participando do bolão
    usersInSweepstakes: {
        type: Number
    },

    //informa quantos usuários estão participando do bolão
    totalAmountBet: {
        type: mongoose.Types.Decimal128,
    },

    //data de criação
    createAt: {
        type: Date,
        default: Date.now
    }
})

const sweepstakes = mongoose.model("Sweepstakes", Sweepstakes)

module.exports = sweepstakes 