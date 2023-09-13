/* persistencia en memoria: cuando se termina la ejecucion del prog, se pierde la data de mis arrelgos por ej
por eso necesito guardar en archivos
file system es el fs
la segunda solucion es base de datos y con esta nos vamos a quedar
fs es un modul nativo de node, es decir, ya viene con node, no tengo que descargar nada
fs me permite leer, escribir, agregar, eliminar

en cada archivo donde voy a usar fs tengo que requerirlo
const fs = require('fs')
requiero ese modulo de node y lo guardo en la constante fs


para cada método que ofrece file system hay 2 metodos, el sincronico y el otro
que seria asincrónico

necesitaria sincrónico si necesito que todo el programa se pare hasta que yo traiga
la info de un archivo, en algunos casos muy particulares voy a necesitarlo
pero la mayoria de las veces voy a usar los métodos asincronos
 */



const fs = require('fs')



//*************************************************************** */
// SYNC
//*************************************************************** */


//métodos principales que voy a usar de file system: 


// CREAR => es con writeFile
/* Le tengo que pasar el file (la ruta absoluta, que todavia no la vimos, 
por ahora pongo solo la ruta)
la ruta se pasa entre comillas
y la data (la info que quiero guardar)
si el archivo no existe, write lo crea
si el archivo no existe, write lo sobreescribe */

//fs.writeFileSync('prueba.txt','primera linea de texto')
//fs.writeFileSync('prueba.txt','segunda linea de texto')
/* en esta ultima línea de código me sobreescribió el archivo */


// LEER => es con readFile
/* le paso la ruta del archivo en los parentesis y le paso el tipo
de encoding, y el mas utilizado es el utf-8
utf 8 es un formato de codificacion de caracteres
si no le pongo el segundo parámetro me muestra numeros raros, buffer
el buffer es un epsacio en memoria de los datos representados por secuencias de bytes
*/

//const texto = fs.readFileSync('prueba.txt','utf-8')
//console.log(texto);



// ELIMINAR => es con unlink
/* solo le tengo que pasar la ruta */

//fs.unlinkSync('prueba.txt')



// AGREGAR => con append
/* añade a lo que tenia previamente, añado info al archivo
paso por parametros la ruta del archivo y la info 
si el archivo no existe me lo crea
no me sirve para agregar objetos dentro de un arreglo, porque me lo dejaria fuera
por eso me sirve leer, pushear y sobreescribir con write
por eso no vamos a usar append*/

// fs.appendFileSync('prueba.txt',' y segundo linea de texto')



// BUSCAR => con existsSync
/* no existe éste método para asíncrono, se usa éste, se resuelve enseguida, no tiene que traer info
devuelve true o false
me sirve para preguntar si el archivo existe
lo uso para preguntar si existe el archivo y si existe hago tal cosa*/

//console.log(fs.existsSync('prueba1.txt'));



//************************************************************************** */



// ASYNC => sería cómo lo resolvemos con callbacks

//CREAR
/* paso por parámetro la ruta, la info y el callback 
si estoy mandando a escribir un archivo no espero ninguna info como resultado
entonces el callback solo recibe error*/

// fs.writeFile('pruebaAsync.txt','Primera linea de texto',(error)=>{
//     if(error){
//         console.log(error);
//     } else {
//         console.log('Archivo creado con exito');
//     }
// })



//LEER
/* aca espero una info como resultado de la asincronía, entonces 
al callback le paso como parámetros error y data
por convención el primer parametro es el error y el segundo la data, y les
puedo poner los nombres que yo quiera, por ejemplo error, e, etc */

// fs.readFile('pruebaAsync.txt','utf-8',(e,data)=>{
//     if(e){
//         console.log(e);
//     } else {
//         console.log(data);
//     }
// })

/* así se ve un error
son errores que estan estandarizados
el método readFile tiene configurado ese error
los erroes son objetos en sí, que contiene cierta información

[Error: ENOENT: no such file or directory, open 'C:\Users\ludiv\Downloads\Backend\Practicando\elarchivo.txt'] {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\Users\\ludiv\\Downloads\\Backend\\Practicando\\elarchivo.txt'
}
*/

/* hice esto para probar los argumentos posicionales del callback
fs.readFile("elarchivo.txt", "utf-8", (lainfo, mistake) => {
    if(lainfo){
        console.log(lainfo)
        console.log("lainfo es el error")
    }else{
        console.log(mistake)
    }
}) */



// ELIMINAR
/* como aca tampoco estoy esperando que me traiga ningun tipo de info, 
le paso solo error al callback */

// fs.unlink('pruebaAsync.txt',(error)=>{
//     if(error){
//         console.log(error);
//     } else {
//         console.log('Archivo eliminado con exito');
//     }
// })


//********************************************************************** */


// PROMESAS
/* con promesas tengo 2 formas:
con .then y .catch
y con async - await 
para indicarle al programa que voy a trabajar con promesas pongo un .promises
entre el fs y el nombre del método*/

// CREAR
// fs.promises.writeFile('pruebaAsync.txt','Primera linea de texto')
// .then(()=>console.log('Archivo creado con exito'))
// .catch(error=>console.log(error))

/* dentro de los parentesis del .then va por convención una función anónima
porque si quisiera podria poner varias sentencias */


// LEER
// fs.promises.readFile('pruebaAsync.txt','utf-8')
// .then(data=>console.log(data))
// .catch(error=>console.log(error))
/* en este caso sí espero una data como respuesta, entonces el .then
tiene parámetro (data) dentro de la su función flecha que lleva dentro */


// ELIMINAR
// fs.promises.unlink('pruebaAsync.txt')
// .then(()=>console.log('Archivo eliminado con exito'))
// .catch(error=>console.log(error))
/* si yo quisiera puedo dejar el parámetro de .then vacio
quedaria .then(() => {}) */




//PARA ESCRIBIR Y LEER UN ARCHIVO CON OBJETOS
/* yo tengo que guardar ingormación de tipo cadena de texto */

const users = [
    {
        name: 'Juan',
        age: 35
    },
    {
        name: 'Maria',
        age: 25
    },
    {
        name: 'Laura',
        age: 40
    },
    {
        name: 'Luis',
        age: 45
    }
]


/* uso stringify para pasar el objeto a cadena de texto */

// fs.promises.writeFile('User.json',JSON.stringify(users))
// .then(()=>console.log('Archivo creado con exito'))
// .catch(error=>console.log(error))


/* uso parse para pasar el string a objeto de JS
para poder hacerle metodos de arrays por ejemplo */

// fs.promises.readFile('User.json','utf-8')
// .then(data=>console.log(JSON.parse(data)))
// .catch(error=>console.log(error))





//MANAGER DE USUARIOS QUE HIZO EL PROFE (Hansd on lab)

