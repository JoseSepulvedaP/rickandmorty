require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Se aceptan solo peticiones GET y POST de http://localhost:3001 ya que eso fue solicitado.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.URL_FRONT);
    res.header('Access-Control-Allow-Headers', 'token, Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Allow', 'GET, POST');
    next();
});

app.use(require('./routes/index'));

app.listen(process.env.PORT, () => {
    console.log('Servidor Online');
});

module.exports = app;