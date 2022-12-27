const Championship =  require("../../dataBase/schemas/Championships")
//const mongoose = require("mongoose")

class championshipsController{
    async create(request, response){
        const {name,idOrganizer,season,dateStarted,dateFinish} = request.body
        try {
            
            if(!name){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "O nome do campeonato é obrigatório!",
                })
            }

            if(!idOrganizer){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "A organização é obrigatória!",
                })
            }
            
            if(!season){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "A temporada que o campeonato será disputado, é obrigatório!",
                })
            }

            if(!dateStarted){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "A data de inicio do campeonato é obrigatório!",
                })
            }

            if(!dateFinish){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "A data final do campeonato é obrigatório!",
                })
            }

            if(dateStarted>dateFinish){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "A data inicial do campeonato, deve ser menor que a data final!",
                })
            }

            const championships = Championship.create({
                name,
                //idOrganizer: mongoose.mongo.ObjectId(idOrganizer),
                idOrganizer,
                season,
                dateStarted,
                dateFinish
            })

            return response.status(201).json({
                message: "O campeonato foi cadastrada com sucesso!",
                championships
            })
        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }

    //Busca todos os campeonatos cadastrados
    async find(request,response){
        try {
            const championships = Championship.find()
            return response.json(
            
                championships
            )   
        } catch (error) {
            return response.status(500).json({
                error: "Something wrong happened, try again",
                message: error
            })
        }
        
    }

    // Update championship
    async updateChampionship(request, response) {
        const id = request.params.id
        const { name, idOrganizer,season,dateStarted,dateFinish } = request.body

        const championshipUpdate = {
            name,
            idOrganizer,
            season,
            dateStarted,
            dateFinish
        }

        const championshipExists = await Championship.findOne({ _id: id })

        if (!championshipExists) {
            return response.status(422).json({
                error: "Fez merda!",
                message: "O campeonato não foi encontrado!"
            })
        }

        try {

            await Championship.updateOne({ _id: id }, championshipUpdate)

            return response.status(200).json({
                message: "Campeonato atualizado com sucesso",
                championshipUpdate
            })


        } catch (error) {
            return response.status(500).json({
                error: "Update failed",
                message: error
            })
        }

    }
}

module.exports = new championshipsController