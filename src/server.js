const express = require("express") 
const server = express()

// Pegar o banco de dados 
const db = require("./database/db") 

// configurar pasta pública 
server.use(express.static("public")) // confiugrando para que as pastas dentro de public estivesse na pasta raíz

// habilitar o uso do req.body da nossa aplicação
server.use(express.urlencoded({ extended: true }))


// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// Confiugar os caminhos/rotas da minha aplicação
// Página Inicial
// req: Requisição/Pedido/Pergunta
// res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html") //__dirname retorna o diretório que ele está (no caso dentro do /src)
})

server.get("/create-point", (req, res) => {

    //req.query: Query Strings da nossa url
    //console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    
    //req.body: O corpo do nosso formulário
    //console.log(req.body)

    // inserir dados no banco de dados 
    const query = `
        INSERT INTO places (
            image, 
            name,
            address,
            address2,
            state,
            city, 
            items
            ) VALUES (?, ?, ?, ?, ?, ?, ?);
        `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertDate(err){
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com Sucesso!")
        console.log(this)

        return res.render("create-point.html", { saved: true})
    
    }

    db.run(query, values, afterInsertDate)

})

server.get("/search", (req, res) =>{
    
    const search = req.query.search 

    if(search == ""){
        // pesquisa vazia 
         return res.render("search-results.html", { total: 0 })
    }


    // pegar os dados do banco de dados 
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }

        // Fazendo a contagem de quantos arrays(elementos) tem no BD
        const total = rows.length

        // Mostra a página html com os dados do bamco de dados
        return res.render("search-results.html", { places: rows, total: total } )

    })
    
})

// Ligar o servidor 
server.listen(3000)