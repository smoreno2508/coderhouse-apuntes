
/* entender protocolo http 
aprender a usar un servidor en express 

axios es una herramienta que resuelve la misma problemática que el fetch
no vamos a usar ni fetch ni axios

hoy vamos a estar del lado contrario a cuando usamos fetch o axios
hacer peticiones a un servicio para pedir información, guardar o eliminar

vamos a crear los servidores de los ditintos endpoints que nosotros usamos en su momento

todo lo que hicimos fue usando peticiones al protocolo http
http es un protocolo, conjunto de reglas que permite la comunicacion
entre 2 o mas sistemas
Gracias a este protocolo las computadoras pueden comunicarse entre si y permiten
comunicarse con los servidores para la obtencion de datos

El protocolo http se basa en un modelo de peticion - respuesta
El cliente tiene que hacer una peticion de información y el servidor
con esa info
Quien puede hacer de cliente? Un front
Siempre es el cliente el que inicia la comunicación
Cuando usamos fetch o axios hicimos de cliente y realizamos una petición
El servidor procesa la petición y cuando tiene la respuesta le responde al cliente
El cliente no es el usuario de una app, es alguien que quiera entablar
una comunicación con mi servidor, por ej un front mobile, un front web, otro servidor.
Cuando haciamos una comunicacion con una api externa haciamos de cliente

Al hacer una petición estamos solicitando ciertos recursos, que pueden ser:
- un dato (nombre, fecha, edad, etc)
- info mas compleja (una imagen, un video, etc)
- un archivo para descargar
- una pag web compelta
Al crear el servidor yo estipulo qué peticiones voy a poder responder

Un servidor puede escuchar múltiples peticiones simultáneas, por ej, mercadolibre

Nuestro servidor siempre va a estar atento escuchando las peticiones, siempre activo
Voy a definirle un canal donde siempre va a estar a la escucha

El cliente es siempre el que hace las peticiones (request) y el servidor es siempre
el que da las respuestas (responses)
Cuando hacemos frontend somos clientes

instalar nodemon
npm install -g nodemon
para saber si lo tengo: nodemoon -v

como nuestro servidor se mantiene escuchando todo el diempo, los cambios que hagamos
en el código no se reflejan automáticamente. Por eso tenemos que apagar el 
servidor y levantarlo nuevamente.
Solo así podemos visualizar los cambios que hagamos en el código.
Nodemoon nos permite reiniciar automáticamente el servidor en cuanto detecta que hayu
cambios en el código. Así podemos concentrarnos en el código sin tener que 
reinicio manual.
En fase de desarrollo es muy util trabajar con nodemon

Vamos a iniciar un proyecto
npm init -y
Se genera el package.json que contiene la info del proyecto, 
nodemon no se va a ver porque es global
Creo un index.js
Yo venia trayendo cosas con require (commonJS) que es la que trae por default
pero ahora voy a usar ES module. 
Me toca decirle a mi programa que voy a trabajar con ES module, yendo
al archivo package.json y escrivo la propiedad type: module


Modulo nativo para la creacion de servidores http:
import http from 'http'
Pero no es la dependencia con la que vamos a trabajar nosotros, 
vamos a trabajar con express, que es un framework que se encarga
de la creacion de servidores http y todas las funcionalidades alrededor de esto

const server = http.createServer()
aca ya tengo en la constante server un servidor creado

Yo siempre que voy a pedir a mi servidor que esté escuchando a un puerto en 
particular, todas las peticiones que lleguen a ese puerto tu las vas a recibir

server.listen(8080, ()=>{})
escucha al puerto 8080 y callback para decirle lo que tiene que hacer

vamos a trabajar noramlmente con el 8080 o 3000
mas adelante vamos a trabajar con una constante para poder distintos valores
de puerto porque cuando desplegamos nuestro servidor, el servido donde lo despleguems
es el que va a estar otorgando un puerto a mi proyecto
no puedo entonces amarrarlo a que escuche un solo puerto, sino que sea mas
dinamico

server.listen(8080, ()=>{
    console.log('Escuchando al puerto 8080')
})
si escribo node index.js, me sale el "escuchando al puerto 8080"
cualquier cliente puede comunicarse con ese puerto

cuando usabamos fetch o axios nos estabamos tratando de comunicar a una url,
a una línea del servidor


Si yo le cambio el texto al console.log, el servidor ni se inmuta, tengo
que tumbarlo y levantarlo para que tome el cambio
Por eso me sirve mas usar nodemon:
nodemon index.js
Asi me muestra los cambios sin tener que tumbar y levantar el servidor

Para no estar todo el tiempo escribiendo nodemon index.js
Puedo ir a mi package.json y escribir un script
x ej "start": "nodemon index.js"
y escribo en la terminal npm start
Puedo tener varios script de arranque de nuestro servivdor, para
testing, etc
Los demas scripts que no son start, tengo que escribir npm RUN


Resumiendo:
Esta es la forma en que creo un servidor con el módulo nativo de http
import http from 'http'
server.listen(8080, ()=>{
    console.log('Escuchando al puerto 8080')
})
Pero no es la forma en que nosotros vamos a estar trabajando
Express nos sirve para hacerlo mas sencillo y mas completo

Express es un framework minimalista que nos va a permitir desarrollar
servidores robustos
Esto nos facilitará:
- usar distintas rutas para las peticiones
- mejorar la estructura de nuestro proyecto
- manejar funcionalidades mas complejas y utilizacion de middlewares

Instalacion: npm i express
En clase creamos un archivo server.js
import express from "express";
const app = express();
app.listen(8080, () => {
  console.log("Escuchando al puerto 8080");
});
En vez de guardar en constante llamada server se suele usar la palabra app

En el navegador, en la barra de direccion escribo localhost:8080
Como todavia no le dije a mi servidor que haga nada (en el visual code) mas que
escuchar a ese puerto, el servidor en el navegador se queda pensando (cuando lo
ejecuto desde el index.js que era el servidor hecho con http)
Cuando ejecuto el servidor hecho con express, me sale inmediatamente un mensaje
de cannot GET en el navegador, porque no le he dicho qué hacer cuando llame al 
localhost 8080
Lo mismo si pongo localhost:8080/api/views, me dice Cannot GET /api/views

Ahora vamos a establecer una primera respuesta de nuestro servidor:
app.get('/', (req,res)=> {
    res.send('Probando')
})
Entonces ahora en el navegador cuando voy a holcalhost:8080 me sale un mensaje
de Probando

si le indico /api
app.get('/api', (req,res)=> {
    res.send('Probando API')
})
Entonces ahora en el navegador cuando voy a holcalhost:8080/api me sale un mensaje
de Probando API

Así es como le defino a mi servidor lo que va a estar respondiendo cuando alguien
haga una peticion a tal lugar
Es como si yo colocara una persona y le dijera "tu vas a estar pendiente a ésta línea telefónica"
Las distintas rutas que yo le estoy colocando al puerto, que se llaman endpoints, es como si
fuera el numero de internolinea telefónica 
"Si queres comunicarte con recursos humanos, marca esta interno adicional al número que ya marcaste"
Estos serian mis distintos endpoints: '/api', '/user'
Para hacer algo con usuarios, tengo que llamar al localhost:8080/users
Esos endpoints los estipulamos nosotros del lado del backend
Estos endpoints se los comunicamos al front de la aplicación


Si se escribe /unendpoint que no está estipulado, se lee un mensaje de cannot access to, o un mensaje
predeterminado de que no hay nada alli

Vamos a crear una api rest y eso lo vamos a ver la próxima clase

Estos endpoints no tienen que ver específicamente con las rutas de la pagina web. 
Las rutas de front conducen a tal componente, pero tambien podria internamente ser una ruta 
llamando al servidor para que muestre tal información. Lo puedo ver en la pestaña networks del
inspector. 
Entonces una ruta del front puede mostrar una dirección en la barra de direccion, pero internamente
estar llamando a una direccion con '/api' que está haciendo un request al servidor
Algunas rutas del back las puedo probar en el navegador como veniamos haciendo pero es nada mas
como prueba, pero no es normalmente donde se llama a una ruta del back

Chat GPT dice:
mientras que los endpoints en el backend son puntos de acceso que manejan solicitudes y operaciones 
específicas en el servidor, las rutas en el frontend se utilizan para la navegación y la representación 
de contenido en la interfaz de usuario. Aunque ambas hacen referencia a URLs, tienen propósitos y 
funciones diferentes en el desarrollo web.



Cuando se llame al '/api/character' a mi me va a llegar la información de esa petición:
app.get('/api/character', (req,res)=> {
    res.send('Probando API')
})
y yo voy a dar una respuesta

El callback tiene un parámetro req y otro res (request y response)
El request es toda la información de esa petición y el response la respuesta
Req y res son objetos, si hago console.log(req) me devuelve un objeto con toda la info de la petición
pero yo solo voy a estar utilizando 3 propiedades de ese objeto: params, query. body


Yo podria usar el mismo endpoint, por ej '/api/character' para buscar un personaje o para crear un personaje
Cómo diferencio qué quiero que haga la respuesta del endpoint? con un método
Expresa puntualmente lo que se quiere hacer
Métodos get, post, put, delete
Get lo uso para buscar todos los personajes
Post lo uso para agregar un personaje
Put para modificar un personaje
Delete para borrar 

Especifico método, especifico endpoint, y lo que se va a ejecutar

Puedo hacer res.json({message: 'mi mensaje'}) para mostrar en formato json la respuesta, 
puedo ahcer res.redirect para redireccionar, red.render para renderizar

Una peticion del lado del front se hace con fetch y puede ser un método post. Hace un llamado a un
endpoint con un método en particular, con info por ej por body
Cuando en el front no especifico el método, el método por default que se envia es el get





En usersManager.js exporto la instancia const manager = new Manager() par usarla desde otro archivo
Y en mi archivo de server.js (donde estuve poniendo todos los llamados a los endpoints) lo importo
import { manager } from './usersManager.js'
Creo una ruta para traerme a todos los usuarios (esa ruta va a activarme todos los usuarios sacandolos
del manager.getUsers):
app.get('/api/users', async (req,res)=> {
    const users = awaot manager.getUsers()
    res.json({message: 'users found', users})
})
 

Si por ejemplo yo quisiera tomar la info de 1 solo usuario en particular, esa informacion la recibimos
en el objeto params
Entonces para rescatar esa info le tengo que meter al objeto request la propiedad params
Como voy a recibir un id cambiante (dinámico) pongo los 2 puntos /api/users/:id
Cada vez que uso info dinámica uso los 2 puntos
app.get('/api/users', async (req,res)=> {
    console.log(req.params)
    res.send('Probando con id')
})
El localhost:8080/api/users/1 me muestra Probando con id, y por consola el console.log me da
{id: '1'}

Entonces yo puedo hacer un desestructuring para sacar el id de req.params
app.get('/api/users', async (req,res)=> {
    console.log(req.params)
    const {id} = req.params
    const user = await manager.getUsersById(+id)
    res.json({message: 'user found', user})
})
Le tengo que hacer el casteo a number porque el id de req.params es un string, lo puedo convertir
con parseInt o con un + :
const user = await manager.getUsersById(+id)
const user = await manager.getUsersById(paserseInt(id))


La forma de que un front pueda usar este users manager es a traves de los endpoints que yo pongo a 
disposición




*/