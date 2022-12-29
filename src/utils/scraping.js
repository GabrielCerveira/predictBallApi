const puppeter = require("puppeteer")
//const jsdom = require("jsdom")
//const { JSDOM } = jsdom

module.exports = {
    async scraping(){
        let data = "29-12-2022"
        const url = `https://ge.globo.com/agenda/#/todos/${data}`
        const browser = await puppeter.launch({headless: false})
        const page = await browser.newPage()

        await page.goto(url)
    
        const links = await page.$$eval(".GroupByChampionshipsstyle__ChampionshipName-sc-132ht2b-2", el => el.map(link => link.href))

        

        for (let index = 0; index < links.length; index++) {
            console.log("Pagina ", index)
            await page.goto(links[index]) 
            let round = await page.$eval(".lista-jogos__navegacao--rodada", el => el.innerText)
            round = round.match(/(\S+) /) || []
            const [, match] = round.match(/(\S+) /) || []

            console.log(match)
            console.log(round)
            const games = await page.$$eval(".lista-jogos__jogo", el => el.map(game => game.innerText))       
            for (let index = 0; index < games.length; index++) {
                const data = games[index].split("\n")
                const obj = {}
                if(data.indexOf("VEJA COMO FOI")!= -1){
                    data.pop()
                }

                let date = data[0].split(" ", 2)
                //date = date[1].replace("/","-")
                const hora = data[0].slice(-5)
                obj.matchDate = 
                //"2022-11-22T16:55:32.506Z"
                console.log(date+ "T" + hora)

                if(data.length > 3){
                    obj.homeTeamResult = {
                        "team": data[1],
                        "goals": data[2]
                    }
                    obj.awayTeamResult = {
                        "team": data.at(-1),
                        "goals": data[3]
                    }
                    obj.winner = obj.homeTeamResult.goals > obj.awayTeamResult.goals ? 
                        obj.homeTeamResult.team :
                        obj.awayTeamResult.goals > obj.homeTeamResult.goals ?
                            obj.awayTeamResult.team : null
                }
                //const doc = new JSDOM(games[index])
                //let doc = parser.parseFromString(games[index], "text/html")
                //let doc = new DOMParser().parseFromString(games[index], "text/html")
                //let casa = doc.getElementsByClassName("equipes__nome")
                //let casa = doc.window.document.getElementsByClassName("placar__equipes--mandante").innerText
                
                obj.round = 
                obj.status = 0
                obj.casa = data[1]
                obj.visitante = data.at(-1)            
                console.log(obj)
            }
        }

        await browser.close()
    }
}

