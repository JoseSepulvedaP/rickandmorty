//  Puerto
process.env.PORT = process.env.PORT || 3000;

//  Vencimiento del Token
process.env.CADUCIDAD_TOKEN = 60 * 60 * 34;

//  SEED de autenticación
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

const API = 'https://rickandmortyapi.com/api';
const URL_FRONT = 'http://localhost:3001';

process.env.URL_API = API;
process.env.URL_FRONT = URL_FRONT;