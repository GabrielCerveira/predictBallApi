const Teams = require("../../dataBase/schemas/teams")

class teamsController{
    
    // Cria todas as seleções
    async createAllSelection(request, response) {
        try {
            const user = await Teams.create(                
                {
                    "team": "Seleção Catari de Futebol",
                    "surname": "Catar",
                    "initialsTeam": "CAT",
                    "flagsInitialsTeam": "QAT",
                    "type": "selection"
                },
                {
                    "surname": "Equador",
                    "team": "Seleção Equatoriana de Futebol",
                    "flagsInitialsTeam": "ECU",
                    "initialsTeam": "EQU",
                    "type": "selection"
                },
                {
                    "team": "Seleção Neerlandesa de Futebol",
                    "surname": "Holanda",
                    "initialsTeam": "HOL",
                    "flagsInitialsTeam": "NLD",
                    "type": "selection"
                },
                {
                    "team": "Seleção Senegalesa de Futebol",
                    "surname": "Senegal",
                    "initialsTeam": "SEN",
                    "flagsInitialsTeam": "SEN",
                    "type": "selection"
                },
                {
                    "team": "Seleção de Futebol dos Estados Unidos",
                    "surname": "Estados Unidos",
                    "initialsTeam": "EUA",
                    "flagsInitialsTeam": "USA",
                    "type": "selection"
                },
                {
                    "team": "Seleção Inglesa de Futebol",
                    "surname": "Inglaterra",
                    "initialsTeam": "ING",
                    "flagsInitialsTeam": "GB-ENG",
                    "type": "selection"
                },
                {
                    "team": "Seleção Iraniana de Futebol",
                    "surname": "Irã",
                    "initialsTeam": "IRA",
                    "flagsInitialsTeam": "IRN",
                    "type": "selection"
                },
                {
                    "team": "Seleção Galesa de Futebol",
                    "surname": "País de Gales",
                    "initialsTeam": "GAL",
                    "flagsInitialsTeam": "GB-WLS",
                    "type": "selection"
                },
                {
                    "team": "Seleção Argentina de Futebol",
                    "surname": "Argentina",
                    "initialsTeam": "ARG",
                    "flagsInitialsTeam": "ARG",
                    "type": "selection"
                },
                {
                    "team": "Seleção Saudita de Futebol",
                    "surname": "Arábia Saudita",
                    "initialsTeam": "ARS",
                    "flagsInitialsTeam": "SAU",
                    "type": "selection"
                },
                {
                    "team": "Seleção Mexicana de Futebol",
                    "surname": "México",
                    "initialsTeam": "MEX",
                    "flagsInitialsTeam": "MEX",
                    "type": "selection"
                },
                {
                    "team": "Seleção Polonesa de Futebol",
                    "surname": "Polônia",
                    "initialsTeam": "POL",
                    "flagsInitialsTeam": "POL",
                    "type": "selection"
                },
                {
                    "team": "Seleção Francesa de Futebol",
                    "surname": "França",
                    "initialsTeam": "FRA",
                    "flagsInitialsTeam": "FRA",
                    "type": "selection"
                },
                {
                    "team": "Seleção Dinamarquesa de Futebol",
                    "surname": "Dinamarca",
                    "initialsTeam": "DIN",
                    "flagsInitialsTeam": "DNK",
                    "type": "selection"
                },
                {
                    "team": "Seleção Tunisiana de Futebol",
                    "surname": "Tunísia",
                    "initialsTeam": "TUN",
                    "flagsInitialsTeam": "TUN",
                    "type": "selection"
                },
                {
                    "team": "Seleção Australiana de Futebol",
                    "surname": "Austrália",
                    "initialsTeam": "AUS",
                    "flagsInitialsTeam": "AUS",
                    "type": "selection"
                },
                {
                    "team": "Seleção Espanhola de Futebol",
                    "surname": "Espanha",
                    "initialsTeam": "ESP",
                    "flagsInitialsTeam": "ESP",
                    "type": "selection"
                },
                {
                    "team": "Seleção Alemã de Futebol",
                    "surname": "Alemanha",
                    "initialsTeam": "ALE",
                    "flagsInitialsTeam": "ALE",
                    "type": "selection"
                },
                {
                    "team": "Seleção Japonesa de Futebol",
                    "surname": "Japão",
                    "initialsTeam": "JAP",
                    "flagsInitialsTeam": "JPN",
                    "type": "selection"
                },
                {
                    "team": "Seleção Costarriquenha de Futebol",
                    "surname": "Costa Rica",
                    "initialsTeam": "CRC",
                    "flagsInitialsTeam": "CRI",
                    "type": "selection"
                },
                {
                    "team": "Seleção Belga de Futebol",
                    "surname": "Bélgica",
                    "initialsTeam": "BEL",
                    "flagsInitialsTeam": "BEL",
                    "type": "selection"
                },
                {
                    "team": "Seleção Canadense de Futebol",
                    "surname": "Canadá",
                    "initialsTeam": "CAN",
                    "flagsInitialsTeam": "CAN",
                    "type": "selection"
                },
                {
                    "team": "Seleção Marroquina de Futebol",
                    "surname": "Marrocos",
                    "initialsTeam": "MAR",
                    "flagsInitialsTeam": "MAR",
                    "type": "selection"
                },
                {
                    "team": "Seleção Croata de Futebol",
                    "surname": "Croácia",
                    "initialsTeam": "CRO",
                    "flagsInitialsTeam": "HRV",
                    "type": "selection"
                },
                {
                    "team": "Seleção Brasileira de Futebol",
                    "surname": "Brasil",
                    "initialsTeam": "BRA",
                    "flagsInitialsTeam": "BRA",
                    "type": "selection"
                },
                {
                    "team": "Seleção Sérvia de Futebol",
                    "surname": "Sérvia",
                    "initialsTeam": "SER",
                    "flagsInitialsTeam": "SRB",
                    "type": "selection"
                },
                {
                    "team": "Seleção Suíça de Futebol",
                    "surname": "Suíça",
                    "initialsTeam": "SUI",
                    "flagsInitialsTeam": "CHE",
                    "type": "selection"
                },
                {
                    "team": "Seleção Camaronesa de Futebol",
                    "surname": "Camarões",
                    "initialsTeam": "CAM",
                    "flagsInitialsTeam": "CMR",
                    "type": "selection"
                },
                {
                    "team": "Seleção Portuguesa de Futebol",
                    "surname": "Portugal",
                    "initialsTeam": "POR",
                    "flagsInitialsTeam": "POR",
                    "type": "selection"
                },
                {
                    "team": "Seleção Ganesa de Futebol",
                    "surname": "Gana",
                    "initialsTeam": "GAN",
                    "flagsInitialsTeam": "GHA",
                    "type": "selection"
                },
                {
                    "team": "Seleção Uruguaia de Futebol",
                    "surname": "Uruguai",
                    "initialsTeam": "URU",
                    "flagsInitialsTeam": "URY",
                    "type": "selection"
                },
                {
                    "team": "Seleção Sul-Coreana de Futebol",
                    "surname": "Coreia do Sul",
                    "initialsTeam": "COR",
                    "flagsInitialsTeam": "KOR",
                    "type": "selection"
                }
            )
            return response.json({
                message: "As seleçoes foram cadastradas com sucesso!",
                user
            })

        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }
    
    // Cria um time 
    async create(request, response) {
        const { team, surname, initialsTeam, flagsInitialsTeam, type } = request.body

        try {
            const teamExists = await Teams.findOne({ team })

            if (!team) {
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "O nome do time é obrigatorio!",
                })
            }

            if (!surname) {
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "O apelido do time é obrigatorio!",
                })
            }

            if (teamExists) {
                return response.status(400).json({
                    error: "Erro de validação",
                    message: "O time já  foi cadastrado!",
                })
            }

            if (!initialsTeam) {
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "As inicias do time são obrigatorias!",
                })
            }

            if (!type) {
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "O tipo da equipe é obrigatoria!",
                })
            }


            const user = await Teams.create({
                team, 
                surname, 
                initialsTeam,
                flagsInitialsTeam,
                type
            })

            return response.status(200).json({
                message: "O time foi cadastrado com sucesso!",
                user
            })
        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }

    //Exibi todas as equipes
    async showTeams(request, response){
        try {
            
            const teams = await Teams.find()

            return response.status(200).json({
                message: "O time foi cadastrado com sucesso!",
                teams
            })
        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }

    //Atualiza um time por id
    async updateByID(request, response){
        const id = request.params._id
        const {team, surname, initialsTeam, type, flagsInitialsTeam} = request.body
        try {
            const verifyTeamByID = await Teams.findById({_id : id}) 

            if (!verifyTeamByID){
                return response.status(422).json({
                    error: "Erro!",
                    message: "O time não foi encontrado!"
                })
            }

            if (!team) {
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "O nome do time é obrigatorio!",
                })
            }

            if (!surname) {
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "O apelido do time é obrigatorio!",
                })
            }

            if (!initialsTeam) {
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "As inicias do time são obrigatorias!",
                })
            }

            if (!type) {
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "O tipo da equipe é obrigatoria!",
                })
            }

            const teams = await Teams.updateOne({_id:id},{
                team, 
                surname, 
                initialsTeam,
                flagsInitialsTeam,
                type
            })

            return response.status(200).json({
                message: "O time foi atualizada com sucesso!",
                teams
            })

        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }

    //Deleta uma equipe por id
    async deleteByID(request, response){
        const _id =  request.params.id
        try {
            const verifyId = await Teams.findById({_id})
            
            if(!verifyId){
                return response.status(422).json({
                    error: "Erro!",
                    message: "O time não foi encontrado!"
                })
            }

            const bet = await Teams.deleteOne({_id})

            return response.status(200).json({
                message: "O time foi deletado com sucesso!",
                bet
            })            

        }  catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }
}

module.exports = new teamsController