const express = require('express'); //importar express
const app = express();
const bodyParser = require('body-parser'); //importar libreria bodyparser
require('./config/config') //importar modulo configuracion



const mongoose = require('mongoose'); //importar libreria mongoose

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//transformar a JSON
app.use(bodyParser.json())

//importar rutas creadas en usuario.js
app.use(require('./routes/usuario'));

//Conectar base de datos
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, res) => {

        if (err) throw err;

        console.log('Base de datos ONLINE!');
    });

app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto", process.env.PORT);
});