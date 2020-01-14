# Rick and Morty App

## Correr la aplicacion rickandmortyapi usando Docker
Para correr estas aplicaciones es necesario tener instalado y ejecutando docker en la maquina donde desee levantarlas. Si no tiene docker instalado revisar este link `https://hub.docker.com/?overlay=onboarding`.
Luego de verificar que docker esta ejecutando en la maquina es necesario primero correr la imagen de redis que es necesaria para utilizar la api. 
Ejecutar comando `docker run redis`. Luego de ejecutar el comando en la terminal finaliza con este mensaje si todo lo realiza correctamente  `* Ready to accept connections`, luego de validar el mensaje es necesario detener la ejecucion en la terminal ejecutando  `Ctrl + C`.

Con redis aceptando las conexiones es necesario generar la imagen de nuestra api ejecutando  `docker build -t node/node-api ./rickandmortyapi/.`. Cuando termine la ejecucion puede listar las imagenes ejecutando en la terminal `docker images` comprobando que exista nuestra imagen recien creada llamada `node/node-api`.

Luego de tener listas nuestras imagenes en docker es necesario ejecutarlas en contenedores ejecutando en nuestra terminal `docker-compose up`. Nuestra api se puede consumir individualmente en esta url `http://localhost:3005`.

## Correr la aplicacion rickandmortyapp de manera local
Primero que todo ingresa al directorio de la aplicacion ejecutando el siguiente comando `cd rickandmortyapp`. 
Instalar dependencias ejecutando el comando `yarn install`.
Por ultimo luego que las dependencias esten instaladas ejecutar el comando `npm run start` para correr la aplicacion.

## Ejecutar pruebas en rickandmortyapi
Primero que todo ingresa al directorio de la aplicacion ejecutando el siguiente comando `cd rickandmortyapi`. 
Instalar dependencias ejecutando el comando `npm install`.
Por ultimo luego que las dependencias esten instaladas, antes de ejecutar las pruebas es necesario correr `redis-server` de manera local y comentar el host y puerto definido en la conexion a redis necesaria para se usada en docker. El archivo a comentar se encuentra en la ruta  `./server/routes/authentication.js` dejarlo de la siguiente manera  `const redisClient = redis.createClient({
    // host: 'redis-server',
    // port: 6379
});`
Luego de comentar lo mencionado ejecutar el comando `npm test` para correr las pruebas.
De igual manera se puede ejecutar localmente la api con el comando `npm run start` y consumirla en esta url `http://localhost:3000`.


