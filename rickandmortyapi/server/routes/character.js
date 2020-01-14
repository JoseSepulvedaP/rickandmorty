const express = require('express');
const app = express();
const request = require('request');
const { verificaToken } = require('../middlewares/authentication');

app.get('/character', verificaToken, (req, res) => {
    request('https://rickandmortyapi.com/api/character', (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const info = JSON.parse(body);
            let data = [];
            info.results.map((value) => {
                let character = {};
                character.name = value.name;
                character.status = value.status;
                character.species = value.species;
                character.gender = value.gender;
                character.image = value.image;
                data.push(character);
            });
            return res.json({
                ok: true,
                data
            });
        } else {
            return res.status(response.statusCode).json({
                ok: false,
                err: {
                    message: 'No se pudo obtener la data'
                }
            });
        }
    });
});

module.exports = app;