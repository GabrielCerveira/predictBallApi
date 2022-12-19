const Sweepstakes = require("../../dataBase/schemas/sweepstakes")

class sweepstakesController{
    
    //Cria o bolão
    async create(request, response){
        let {
            name,
            giveScoreForWinner,
            scoreForWinner,
            scoreForResultExact,
            addScore,
            closeBetHours,
            valueToBet,
            setProportionalValue,
            valueToAward,
            enterPoolAfterStarting,
            setDifferentWeightMatch,
            setWeightForMatch
        } = request.body 
        try {
            
            if(!giveScoreForWinner){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar se será concedido pontos ao usuário que acertar o vencedor!",
                })
            }

            if(giveScoreForWinner === true){
                if(!scoreForWinner){
                    return response.status(422).json({
                        error: "Erro de validação",
                        message: "É obrigatório informar os pontos que serão concedidos ao usuário que acertar o time vencedor!",
                    })
                }
            }

            if(!scoreForResultExact){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar os pontos que serão concedidos ao usuário que acertar o resultado exato!",
                })
            }

            if(!addScore){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar os pontos do acerto do resultado exato serão somados ao de acertar o vencedor!",
                })
            }

            if(!closeBetHours){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar quantas horas antes do incio do evento que o bolão será fechado!",
                })
            }

            if(closeBetHours >= 1 && closeBetHours <= 72){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar um valor dentro do périodo  de 1-72 horas",
                })
            }
            
            if(!valueToBet || valueToBet >= 0){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar um valor para entrar na aposta válido!",
                })
            }

            if(!setProportionalValue){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar se o prêmio será calculado proporcionalmente ao valor que foi apostado!",
                })
            }
            
            if(setProportionalValue === true){
                valueToAward = 0
            }
            
            if(setProportionalValue === false){
                if(!valueToAward || valueToAward >= 0){
                    return response.status(422).json({
                        error: "Erro de validação",
                        message: "É obrigatório informar o valor do prêmio!",
                    })
                }
            }

            if(!setDifferentWeightMatch){
                return response.status(422).json({
                    error: "Erro de validação",
                    message: "É obrigatório informar se as partidas terão pesos diferentes para o bolão!",
                })
            }

            if(setDifferentWeightMatch === true){
                if(!setWeightForMatch){
                    return response.status(422).json({
                        error: "Erro de validação",
                        message: "É obrigatório informar a diferença de peso para cada partida!",
                    })
                }
            }
            
            const sweepstakes = await Sweepstakes.create({
                name,
                giveScoreForWinner,
                scoreForWinner,
                scoreForResultExact,
                addScore,
                closeBetHours,
                valueToBet,
                setProportionalValue,
                valueToAward,
                enterPoolAfterStarting,
                setDifferentWeightMatch,
                setWeightForMatch
            })

            return response.status(200).json({
                message: "O bolão foi criado com sucesso!",
                sweepstakes
            })
        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }

    //Atualiza o valor total do prêmio caso a opção "setProportionalValue" = true
    async updateValueToAward (request, response){
        const { id } = request.params.id
        let usersInSweepstakes, totalAmountBet, valueToAward
        try {
            
            
            const updateValueToAward = await Sweepstakes.updateOne({
                _id : id
            },{
                usersInSweepstakes,
                totalAmountBet,
                valueToAward
            })
            
            return response.status(200).json({
                message: "O valor do bolão foi atualizado com sucesso!",
                updateValueToAward
            })
        } catch (error) {
            return response.status(500).json({
                error: "Update failed",
                message: error
            })
        }
    }
}

module.exports = new sweepstakesController

