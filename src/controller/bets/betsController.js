const Bets = require("../../dataBase/schemas/bets")
const Matches = require("../../dataBase/schemas/matches")
const mongoose = require("mongoose")

class betsController{
    
    //Cria uma aposta
    async create(request, response){
        const {idMatch, punter, awayGoals, homeGoals} = request.body

        try{
            if(!idMatch){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "O id da partida é obrigatório",
                })
            }

            if(!punter){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar o apostador",
                })
            }

            if( typeof awayGoals === "undefined"){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar os gols do time visitante",
                })
            }

            if( typeof homeGoals === "undefined"){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar os gols do time da casa",
                })
            }

            const bet = await Bets.create({
                idMatch:  mongoose.mongo.ObjectId(idMatch),
                punter: mongoose.mongo.ObjectId(idMatch),
                awayGoals,
                homeGoals,
                status : 0,
            })

            return response.status(200).json({
                message: "A aposta foi salva com sucesso!",
                bet
            })
        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }
    
    //Exibi todos as apostas
    async find(request, response){
        try{
            const bet = await Bets.find()
            response.status(200).json({
                message: "Todas as apostas cadastradas",
                bet
            })
        } catch(error){
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }

    }

    //Exibir todas as apostas de determinado usuário(punter) e bolão
    async findByIDUserAndSweepstakes(request, response){
        const punter = request.params.punter
        try{
            const bet = await Bets.find({punter})
            response.status(200).json({
                message: "Todas as apostas cadastradas",
                bet
            })
        } catch(error){
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }

    }
    
    //Atualiza a aposta por id
    async updateByID(request, response){
        const id = request.params.id
        const { awayGoals, homeGoals } = request.body

        try {
            const verifyId = await Bets.findById({_id: id})
            
            if(!verifyId){
                return response.status(422).json({
                    error: "Erro!",
                    message: "A aposta não foi encontrado!"
                })
            }

            if(!awayGoals){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar os gols do time visitante",
                })
            }

            if(!homeGoals){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar os gols do time da casa",
                })
            }

            const bet  = await Bets.updateOne({_id: id},{
                awayGoals,
                homeGoals
            }) 
            
            return response.status(200).json({
                message: "A aposta foi atualizada com sucesso!",
                bet
            })
        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }
    
    //Deleta uma bet por ID
    async deleteByID(request, response){
        const _id =  request.params.id
        try {
            const verifyId = await Bets.findById({_id})
            
            if(!verifyId){
                return response.status(422).json({
                    error: "Erro!",
                    message: "A aposta não foi encontrado!"
                })
            }

            const bet = await Bets.deleteOne({_id})

            return response.status(200).json({
                message: "A aposta foi deletada com sucesso!",
                bet
            })            

        }  catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }

    //Verifica se a partida foi finalizada e seta o status final da aposta
    async verifyBetByID(request, response){
        const _id = request.params.id
        try {
            const bet = await Bets.findById(_id)

            if(!bet){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "A aposta não foi encontrada!"
                })
            }
            
            if(bet.status === 1){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "A aposta já foi finalizada!"
                })
            }

            const match =  await Matches.findById(bet.idMatch)

            if(!match){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "A partida realacionada a aposta não foi localizada!"
                })
            }

            if(match.status === 0 || match.status === 1){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "A partida ainda não foi finalizada ou não teve o seu placar final adicionado ao Predict Ball!"
                })
            }

            if(match.homeTeamResult.goals === bet.homeGoals && match.awayTeamResult.goals === bet.awayGoals){
                await Bets.updateOne({_id},{
                    status: 1,
                    isWinner: true
                })
                return response.status(200).json({
                    message: "A aposta foi atualizada com sucesso!"           
                }) 
            }

            await Bets.updateOne({_id},{
                status: 1,
                isWinner: false
            })

            return response.status(200).json({
                message: "A aposta foi atualizada com sucesso!"           
            })

        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }
}

module.exports = new betsController