const mongoose = require("mongoose")

const Championships = new mongoose.Schema({
    //Nome do campeonato
    name:{
        type: String,
        requerid: true,
        lowercase: true,
    },
    //Federação que organiza o campeonato. Ex:. CBF
    organizer:{
        type: String,
        requerid: true
    },
    //Temporada que o campeonato está sendo disputado 21/22 ou 22
    season:{
        type: String,
        requerid: true
    },
    //data de inicio
    dateStarted:{
        type: Date,
        requerid: true
    },
    //data final
    dateFinish:{
        type: Date,
        requerid: true
    }
})

const championships = mongoose.model("Championships", Championships)

module.exports = championships 