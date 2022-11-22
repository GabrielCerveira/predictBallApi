const Teams = require("../../dataBase/schemas/teams")

class teamsController{
    // Create Team
    async create(request, response) {
        const { team, surname, initialsTeam, type } = request.body

        try {
            const teamExists = await Teams.findOne({ team })

            if (!team) {
                return response.status(422).json({
                    error: "Fez merda",
                    message: "O nome do time é obrigatorio!",
                })
            }

            if (!surname) {
                return response.status(422).json({
                    error: "Fez merda",
                    message: "O apelido do time é obrigatorio!",
                })
            }

            if (teamExists) {
                return response.status(400).json({
                    error: "Fez merda",
                    message: "O time já  foi cadastrado!",
                })
            }

            if (!initialsTeam) {
                return response.status(422).json({
                    error: "Fez merda",
                    message: "As inicias do time são obrigatorias!",
                })
            }

            if (!type) {
                return response.status(422).json({
                    error: "Fez merda",
                    message: "O tipo da equipe é obrigatoria!",
                })
            }


            const user = await Teams.create({
                team, 
                surname, 
                initialsTeam, 
                type
            })

            return response.json({
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
}

module.exports = new teamsController