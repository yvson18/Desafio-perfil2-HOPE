// config inicial
const express = require("express");
const mongoose = require("mongoose");
const app = express();

var routes = require('./routes/sistem.js');

require("dotenv").config();

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// rotas / endpoints
app.use('/api', routes);

// condicionando listening do server ao estabelecimento da conexão com o banco

mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=>{
        console.log("CONEXAO ESTABELECIDA COM SUCESSO AO MONGODB!");
        app.listen(3000); // porta 3000
    })
    .catch((err) => console.log(err)); //printa erro
