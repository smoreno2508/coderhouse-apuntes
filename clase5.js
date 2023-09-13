/* Node no es solo un módulo mas sino un entorno de desarrollo completo
donde viven y se ejecutan nuestros programas de JS
En los inicios de JS lo que teniamos para interpretar el lenguaje de JS eran
los navegadores. Despues se creo nodejs y lo interpreta ahi, gracias a nodejs
JS puede ser usado en la parte backend, podemos hacer, creacion de servidores,
manipulación de dB. 
Vamos a aprender a hacer servidores

Modulos nativos, son los que ya vienen dentro de node.
Son FS, crypto, http, path
pero crypto y http esta medio en desuso porque salieron herramientas externas mejores

crypto, encripta contraseñas, info de tarjetas 
documentacion en la pagina de node

cifrado vs hasheado
cifrar se puede descifrar, se puede hacer el paso contrario
hashear no se puede deshashear, y da un toque de seguridad extra
 
vamos a empezar a guardar usuarios que tengan un password
ni siquiera los desarrolladores deberian tener acceso a las pass de los users */

// [{"id":3,
// "first_name":"Carolina",
// "last_name":"Osorio",
// "email":"cosorio@mail.com",
// "password":"12345"}
// ]

/* crypto se puede trabajar con require o con import */
const crypto = require ('crypto')

/* dentro del metodo createUser incluyo: */
const hashPassword = crypto.createHash('sha256').update(user.password)
/* crypto es el módulo y createHash es el método de ese módulo */

/* lo que se hace es, cuando el usuario pone su contraseña, lo que ingresa
se encripta tambien, y se compara con lo que está en la base de datos, 
Si ambos hashes son igules es porque la contraseña es correcta */

/* ahora en el push y sobreescribo el password */
users.push({id, ...user, password: hashPassword})
/* ahora ejecuto el programa y en el json me aparece la contraseña hasheada */


/* MANEJANDO MODULOS DE TERCEROS: NPM
Manejador de paquetes de Node
sirve para instalar dependencias externas
En la pagina de npm puedo buscar cualquier paquete
Viene con NodeJS

con npm init se va a inicializar un proyecto, te pide mucha info
podemos hacer npm init -y para darle la informacion por default
npm init te genera un package.json, que contiene la info principal de mi proyecto

en el package.json puede escribir scripts para usar shortcut en la terminal
nuestros proyectos van a tener muchos scripts para facilitarnos la vida
si hago script "start", tengo que poner npm start
si hago script con otro nombre, hago npm run (nombredelscript)
en el package.json van a aparecer todas las dependencias

algunas se guardan en dependencies y otras en devDependencies
en devdependencies se ponen las que solo se usan en fase de desarrollo
cuando esté en produccion no voy a necesitar esas despendencias de dev

si voy a trabajar con require, no tengo que escribir "type": "module" 
en el package.json, pero si voy a trabajar con modulos sí tengo que ponerlo

de ahora en adelante vamos a trabajar con import
por ejemeplo import { existsSync, promises } from "fs"
import { createHash } from "crypto"

modulo que no tenga documentacion no lo vamos a usar porque no voy a saber 
que hacer

puedo hacer una instalacion global o local
con ambas descargo un paquete
pero global lo hago a nivel de maquina y esta disponible para cualquier proyecto
y las locales se hacen a nivel de proyecto

las de mi package.json son a nivel local
local voy a instalar todas las dependencias que tengan repercusión 
directa en mi proyecto
al aparecer en el package.json, los demas desarrolladores se van a enterar
que se está trabajando con esa dependencia y tb la van a poder instalar
con certeza de la version

para agregar de forma global, se pone npm install -g (nombredeladependencia)

versiones: 3 numeros
n1.n2.n3
el n3 son correcciones de bugs, parche
el n2 (numero menos) son apenas cambios que no afectan mucho
el n1 (numero mayor) ya quiere decir que hubo un cambio grande, se agregan funcionalidades
o se quitaron otras
en este ultimo caso me toca ver si cambiaron los métodos que venia usando
con la version anterior
pero no quiere decir que tenga que cambiar todo mi proyecto, soy yo quien
va a decidir si necesito hacer esa actualizacion o no

Puedo tener distintos simbolos al lado de las versiones
y el npm update ve la version que tengo en el package.json
y el símbolo y se va a actualizar dependiendo el simbolo y las versiones
nuevas que existan
El símbolo indica a qué estoy dispuesto yo o no, hablando de versiones nuevas
Si no hay simbolo, significa que aunque hayan versiones nuevas no quier
que me actualice la version de esa dependencia

Símbolo ~: es que solo me haga actualizaciones de parche

Simbolo ^: Permite actualizaciones de parches y de numero menos pero no 
actualizaciones mayores. Cuando se ejecuta npm update, se actualizarán las 
dependencias a la última versión compatible con la versión especificada.
Si vengo trabajando con la 5.1.0, me podria instalar la 5.2.0

Simbolo >: Me actualiza si hay una version mas nueva de numero mayor, menor o parche
Cualquier actualizacion que haya la va a hacer


Dependencias globales necesitan un comando para que se instalen?
Se ven sus versiones?
Nodemon -v y me dice la version global que tengo instalada en mi computadora
Pero no improta el tema de la version de éste por ejemplo porque no afecta en nada
mi proyecto
Ninguna dependencia global aparece en el package.json
Para instalar las dependencias que aparezcan en el package.json de un proyecto de otro
tengo que correr el comando npm i

Si un compañero instaló otra dependencia, bajo los cambios y vuelvo a correr el npm i 
y me instala las dependencias que faltan


*/






