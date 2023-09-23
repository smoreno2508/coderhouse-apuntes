/* 
Mi pregunta sobre el getUserById sin objeto pasado por parámetro, de la clase anterior:
Daba status 200 la peticion porque en el usersManager.js el método getUserById tenia un catch
retornando el error, y en realidad se deberia manejar con throw new Error, porque el simple error 
del catch está retornando algo. 
Entonces como sí llegó algo por user (lo que llega por user es el error), cae en el status(200)
Con el throw new Error ahi sí lo lleva al catch de mi endpoint, y el error que tira es que
no puede desestructurar la propiedad limit de un objeto que no existe, porque no pase objeto
alguno. Si paso objeto pero no tiene propiedad limit, no da error, pero si no paso objeto 
alguno, si da error.

------------------------------------------------------------------------------------


Estuvimos hablando de los distintos tipos de peticiones que le podemos hacer al servidor
para una entidad en particular, para usuarios. 
Pero para un ecommerce voy a tener disintas entidades: users, products, orders, cart
y con cada entidad voy a tener sus distintos métodos y endpoints
Si tengo muchas entidades el archivo server.js me quedaria muy largo, entonces para hacer
una refactorizacion, una mejora o buscar un error va a ser complicado de trabajar
No puedo tener entonces todas las rutas(endpoints) dentro de un mismo archivo porque el mantenimiento
y el escalar de esa aplicacion se va a hacer mas complicado

Entonces vamos a usar el express router para crear archivos separados donde esté colocando
las rutas de las distintas entidades por separado

const app = express() ya tiene todas las funcionalidades de express
Todos los endpoints que creo es gracias a la parte de funcionalidades de express
Etnocnes para separar los archivos solamente neceisto utilizar el router de express

Voy a crear una carpeta que se llame "src" y voy a meter ahi el server.js y el usersManager.js
Tambien le meto dentro una carpeta que se llame "routes". Ahi voy a guardar todas las rutas de mi 
servidor, y las voy a estar separando por entidad, x ej products.router.js, orders.router.js, 
users.router.js
Cuando quiera hacer una refactorizacion de las rutas de usuario voy a users.router.js
Le pongo el .router.js para que sea mas claro porque mas adelante puedo tener carpeta
controllers, carpeta servicios, etc



Por ejemplo en el users.router.js, llevo todos mis endpoints y al inicio del archivo importo el
componente Router de express:
import { Router } from "express";

Importo ek usersManager.js:
import { usersManager } from "../UsersManager.js";

Creo la constante router:
const router = Router();
El const app = express() me traia todas las funcionalidades de express y el const router = Router()
me trae solo las funcionalidades de router. El const app = express() queda en el archivo server.js

Al final del archivo exporto router:
export default router

Y en vez de app.get("/ruta", (req, res)) pongo router.get("/ruta", (req, res))




Cómo le digo a mi server que mis rutas están en otro lado? cuando llamen a tal cosa redireccionalas
(al mover el server cambiar la ruta de server en el script start)

Entonces en el archivo server.js voy a importar los router de cada entidad. Al importar puedo 
ponerle el nombre que yo quiera porque lo exporté con la palabra default:
import usersRouter from "./router/users.router.js";
import productsRouter from "./router/products.router.js";
import ordersRouter from './router/orders.router.js'

Cómo le digo yo a mi servidor que necesto que trabaje con las rutas a esos archivos
Cuando llames a /api/users ve a utilizar el enrutador que esta aca:
app.use("/api/products", productsRouter);
Use es un método interno de express, le digo que haga uso de esa función, en este caso, del 
enrutador que yo le coloco


Igual con las demas:
app.use("/api/users", usersRouter);
app.use('/api/orders',ordersRouter)


En el cada archivo .router.js tengo que sacarle el /api/users, /api/products, /api/orders
del comienzo de la ruta, porque si no se repite, quedaria asi:
router.get("/", async (req, res) => {
router.get("/:idUser", async (req, res) => {
router.post("/",async (req, res) => {
router.delete("/:idUser", async (req, res) => {
router.put("/:idUser", async (req, res) => {

El callback dentro de cada endpoint despues lo vamos a estar sacando del archivo .router.js
lo vamos a poner en los controllers

El app.use(express.json()) es para que express o mi servidor pueda entender la info que venga

correccion tutor min 53.22
npm, entender lo que es la configuracion del package json, usar scripts, como lo iniciamos 
(con init) o con el nombre, comando de init para start, al subir el repo no subir los node modules 
(con gitignore)




MIDDLEWARES:
Son operaciones que se ejecutan de manera inmediata entre la petición del cliente y el servicio
de nuestro servidor. 
Middleware es un intermediario, siempre se ejecuta antes de llegar al endpoint que corresponde
Cada vez que usamos un app.use estamos usando un middleware

Podemos usarlos para:
dar informacion sobre las consultas que se estan haciendo(logs)
Autorizar o rechazar usuarios antes de que lleguen al endpoint (seguridad)
Agregar o alterar información al método req antes de que llegue al endpoint (formato)
Redireccionar (router)
Finalizar la petición sin que llegue al endpoint (seguridad)

Cada vez que usamos un app.use estamos ejecutando un middleware
Los middleware son funcion que se ejecuta entre la peticion del cliente y la ejecución de esa
petición, entre la peticion y entre que el servidor la recibe, es decir se ejecuta antes de llegar
al endpoint, antes de ejecutar la petición

Por ejemplo, en mi ecommerce no le tengo que permitir a un usuario eliminar un producto del 
catálogo (middleware de tipo autorización)

Se pueden ejecutar varios seguidos, y lo que bote un middleware lo va a recibir el otro y
asi sucesivamente. Se ejecutan en orden

Tipos de MW de express:
A nivel aplicación (como app.use(express.json()) sin importar a que endpoint llame, siempre se va
    a ejecutar ese middleware)
A nivel endpoint (para un endpoint en particular, por ej router.get("/:idUser", async (req, res))
A nivel del Router (los que pusimos en server.js que dirigen a los enrutadores, por ej 
    app.use("/api/users", usersRouter))
De manejo de errores
Incorporado (de express)
De terceros

Cuando yo creo al middleware (porq tambien hay middlewares externos), es una función que 
siempre recibe 3 parámetros (a excepcion del middleware error), esto ya está estipulado 
por express
Recibe el objeto req, el res y el next
El next sirve para decir, ey todo esta bien? ejecuta el siguiente middleware o el callback del 
endpoint

Cuando es un MW a nivel de ruta se coloca el MW entre la ruta y el callback

El MW a nivel router va enlazado a una instancia de express.Rounter()
const router = express.Router()
router.use(function(req, res, next))

El MW de error tambien recibe parámetro err 
app.use(fn (err, req,res, next))



Creo una carpeta middlewares y dentro un auth.middleware.js
Dependiendo de la edad del usuario voy a permitir que se registre o no:

export const authMiddleware = (req, res, next) => {
  const { age } = req.body
  console.log('ROLE',req.body);
  if (age < 18) {
    return res.status(401).json({ message: 'You need to be 18 or older'})    
  }
  next()
}

Importo el MW en users.router.js con 
import { authMiddleware } from "../middlewares/auth.middleware.js";
y lo pongo en el router.post("/", authMiddleware, async (req, res)=>{})

El middleware recibe el req y res al igual que el callback que viene despues, pero primero
se ejecuta el middleware y despues el cuerpo del callback. Saca del req la edad, la evalua, 
responde con status(401) si es menor a 18 y si es mayor pasa al next para ejecutar el callback





MULTER es un MW de terceros, sirve para poder hacer carga de archivos la servidor, para 
que el usuario pueda subir archivos y videos por ej
npm i multer





ARCHIVOS ESTATICOS EN EXPRESS
Nuestro servidor tiene la posibilidad de alojar recursos que sean visibles al cliente de manera
directa, es decir que yo no tenga que crear un endpoint en particular para ir a buscar esos
recursos. Porque los usuarios van a cambiar por ejemplo, puedo agregar, eliminar, varia la info
pero en los archivos estaticos no va a haber variacion. Son archivos de libre acceso a los clientes
de mi servidor y no voy a poner endpoint particular para que accedan a ellos
Es una carpeta a la que el cliente puede acceder y ver esos recursos con solo acceder a la ruta
donde se encuentra ubicada

Creo una carpeta llamada public dentro de src. Le creo dentro subcarpetas: images, html, css

Cómo le digo a mi servidor que tengo una carpeta public que va a ser de libre acceso?
En el archivo server.js utilizo un MW que tiene express que setea todo internamente:
app.use(express.static()
Entre los paréntesis espera que yo le pase la ruta de donde se encuentra esa carpeta
Pero tengo que poner la ruta absoluta
Si yo trabajo con ruta relativa si lo quiero usar en otra PC no va a funcionar y se rompe el 
proyecto
Siempre que me toque poner la ruta a una carpeta tengo que poner la ruta absoluta

DIRNAME
Node tiene una propiedad que se llama __dirname, que siempre me va a tirar la ruta absoluta
Me va a tirar el nombre de maquina, blabla, src/public
__dirname no está habilitada para trabajar con el type: module del package.json, da error si lo
uso (dice __dirname no está definida para trabajar con ES module) solo funciona para  commonJS
Entonces vamos a simular esa creación de la variable dirname en commonJS

Escribo estas 3 líneas:
import {dirname} from 'path'
import { fileURLToPath } from 'url'
export const __dirname = dirname(fileURLToPath(import.meta.url))

Como resultado, dirname me va a dar la ruta absoluta hasta src (que es donde está el archivo
server.js desde donde estoy haciendo armando la constante dirname)

Y para usar la carpeta public pongo:
app.use(express.static(__dirname+'/public'))
Si no pongo ésta línea no se puede acceder a esa carpeta


CHAT GPT SOBRE ENDPOINTS Y RUTAS RELATIVAS:
En Node.js, no es necesario utilizar rutas absolutas para definir endpoints (rutas) en tu 
aplicación Express o cualquier otro marco web. Esto se debe a que Express y otros marcos web 
en Node.js manejan las rutas relativas a la raíz de tu servidor. Puedes definir rutas relativas 
al punto de montaje de tu aplicación sin necesidad de especificar una ruta absoluta.
Por otro lado, cuando se trata de archivos estáticos que deseas servir desde una carpeta, 
como la carpeta "public", a menudo es recomendable utilizar rutas absolutas para garantizar 
que Node.js pueda encontrar y servir los archivos correctamente. Esto es especialmente 
importante cuando tu aplicación se ejecuta en diferentes entornos o cuando la estructura de 
directorios puede cambiar.


app.use(express.static(__dirname+'/public')) No se llama un "endpoint" en sí, sino que se 
utiliza para configurar el middleware de servir archivos estáticos en una aplicación Express. 
El middleware express.static se utiliza para servir archivos estáticos, como imágenes, 
archivos CSS, archivos JavaScript, etc., desde un directorio específico en tu servidor web.



ARCHIVO UTILS
Para poder usar la const dirname en distintos archivos lo voy a guardar en un archivo utils.js
y otras funciones que voy a reutilizar tb

y en server.js pongo:
import { __dirname } from './utils.js'


*/