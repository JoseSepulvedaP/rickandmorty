const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const redis = require('redis');

// Conexion Redis
const redisClient = redis.createClient({
    // host: 'redis-server',
    // port: 6379
});
redisClient.on('connect', () => {
    console.log('Conectado a Servidor Redis');
});
redisClient.on('error', (err) => {
    console.log('ERROR', err);
});

app.post('/register', (req, res) => {

    let username = req.body.username;
    let password = bcrypt.hashSync(req.body.password, 10);

    redisClient.get('users', (err, value) => {
        let data = [];
        if (!value) {
            data.push({username, password});
            redisClient.set('users', JSON.stringify(data));
            return res.json({
                ok: true,
                message: 'Registro de usuario realizado correctamente',
            });
        } else {
            data = JSON.parse(value);
            let exist = false;
            data.map((user) => {
                if (user.username === username) {
                    exist = true;
                    return;
                }
            });
            if (!exist) {
                data.push({username, password});
                redisClient.set('users', JSON.stringify(data));
                return res.json({
                    ok: true,
                    message: 'Registro de usuario realizado correctamente',
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario ya se encuentra registrado'
                    }
                });
            }           
        }

    });

});

app.post('/login', (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
    
    redisClient.get('users', (err, value) => {
        let data = [];
        let user;
        data = JSON.parse(value);
        if (data) {
            user = data.filter((us) => {
                return (us.username === username);
            });
            if (user.length > 0 ) {
                if (!bcrypt.compareSync(password, user[0].password)) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'Usuario o contraseña incorrectos'
                        }
                    });
        
                } else {
                    let token = jwt.sign({
                        username
                    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
                
                    res.json({
                        ok: true,
                        message: 'Usuario logueado correctamente',
                        token
                    });
                }
            } else {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No existe el usuario, favor registrarse'
                    }
                });
            }     
        } else {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe el usuario, favor registrarse'
                }
            });
        }

    });
});

module.exports = app; 