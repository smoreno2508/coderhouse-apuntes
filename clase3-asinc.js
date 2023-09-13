

//callbacks
const sumar = (num1, num2)=>{
    return num1 + num2
}
const restar = (num1, num2)=>{
    return num1 - num2
}

//el callback seria oper
function calculadora(num1,num2,oper){
    const resultado = oper(num1, num2)
    console.log(resultado)
}

calculadora(1,2,restar)


//calback generalmente recibe 2 parametros, uno de error y otro mas de resultado



// ASYNC 

// console.log('Primer log');

//auqnue le ponga 0 al setTimeout, sale última esta porción de código
//si es asincrono, independientemente del tiempo que se tome el setTimeout, JS lo va a apartar y continua con el resto del codigo
// setTimeout(() => {
//     console.log('Log timeOut');
// }, 0);

// console.log('Ultimo log');


//una peticion a un base de datos es asíncrona por naturaleza, un setTimeout tambien
//por eso por ejemplo, continua renderizando el baner y lo demas de la pagina, mientras se resuelve el llamado a la base de datos para mostrar los productos


//tengo que tener cuidado si necesito hacer una operacion con algun dato que se obtiene en la asincronia
//pero esta operacion no está dentro de la asincronia:
let resultado;
setTimeout(() => {
    resultado = 10+5;
 }, 0);
 console.log(`El resultado es ${resultado+5}`)
 //sale por consola "El resultado es NaN" `porque pasa a la linea deñ console log y despues se ejecuta el setTimeout

 //la solucion a este problema fue el uso de callbacks


//CHATGPT
//cual es la relación entre una función de callback y un proceso asincrónico? La relación es que una función de callback se pasa como parámetro en un proceso asincrónico? Es decir, es la función que se va a ejecutar cuando termine la asincronía?¿
//Sí, tienes razón en tu descripción. La relación entre una función de callback y un proceso asincrónico se refiere a que una función de callback se pasa como parámetro en un proceso asincrónico y se ejecuta cuando dicho proceso asincrónico ha completado su tarea o cuando se cumple alguna condición específica.



 //calbacks anidados
 //es un callback que llama a otro callback, que llama a otro callback..


 //nosotros no nos vamos a encontrar código que trabaje con callbacks anidados, sino con promesas

 //pero este es un ejemplo de callbacks:
 //como un llamado a una base de datos me puede dar un error o una respuesta, 
 //es que el callback recibe esos 2 parmaetros, error y respuesta

 //LLAMADO A BD
 // TABLA USUARIOS - FAMILIARES
 // function agregarFamiliar(idUsuario,infoFamiliar){
 //     usuarios.findById(idUsuario,function(error,usuario){
    //primero se tiene que resolver usuarios.findById(idUsuario, cuando eso se resuelva eso le pasa al callback un error o le pasa el usuario que encontró
    //la asincronia está en que usuarios.findById es un llamado a la base de datos y eso es asíncrono, 
    //porque tengo que esperar a que eso se resuelva para pasarle al callback el resultado: error o resultado
    //esos llamados a la base de datos son asíncronos por naturaleza
    //es como cuando uso un fetch, que es asínccrono por naturaleza
 //         if(error){
 //             return error
 //         } else {
 //             familiares.findAllByLastName(usuario.lastName,function(error,familiares){
 //                 if(error){
 //                     return error
 //                 } else {
 //                     if(familiares.includes(infoFamiliar)){
 //                         return 'Familiar ya existe'
 //                     } else {
 //                         familiares.createOne(infoFamiliar,function(error){
                //createOne solo recibe de callback un posible error porque no estoy esperando que me traiga un resultado, solo estoy tratando de crear algo
                //etnocnes si da error muestro el error, y si no da error se crea el usuario y retorno el "familiar creado con exito"
 //                             if(error){
 //                                 return error
 //                             } else {
 //                                 return 'Familiar agregado con exito'
 //                             }
 //                         })
 //                     }
 //                 }
 //             })
 //         }
 //     })
 // }

 //entonces usuarios.findById, familiares.findAllByLastName y familiares.createOne son asíncronos, son llamados a la base de datos

//antes del 2015 se resolvia la problemática del asincronismo con estos callbacks anidados
//luego del 2015, ecmascript6 se encontró una solucion distinta para el callbackHell
//lo que usamos ahora son las promesas
//la promesa es no ejecutar nada que dependa de una operación asíncrona hasta que ese resultado ya esté listo

//funciones asíncronas por naturaleza: llamado a una api externa, llamado a una base de datos, cuando hago un fetch cuando hago axios(que es otro llamado a http)
//a lo que dependa de ese llamado tengo que decirle "no te ejecutes hasta que yo tenga ese resultado"

//las promesas son un objeto especial que nos permitirá encalpsular una operación, la cual reaccionará
//a 2 posibles situaciones dentro de una promesa: qué deberia hacer si se cumple, y qué deberia hacer si no se cumple
//llamado a la base de datos me puede dar un error o la información que busco


//yo puedo crear funciones que retorne promesas (ejemplo de la ppt funcion dividir) o manipular funciones que retornan promesas
//los llamados a las bases de datos son del segundo tipo: manipulación de funciones que retornan promesas
//nosotros vamos a consumir funciones que retornen promesas
//.then y .catch es manipular funciones que retornan promesas

// // CREAR UNA FUNC PROMESA
function promesaFun(a,b){
    return new Promise((resolve,reject)=>{
        if(a===0 || b===0){
            reject('Promesa rechazada porque algun parametro es igual a 0')
        } else {
            resolve(a+b)
        }
    })
}

promesaFun(0,7)
.then(res=>console.log(res))
.catch(error=>console.log(error))
// en el .catch va a entrar cuando la promesa se resuelva en estaod reject, y en el .then cuando se resuelva en estado resolve

//promise .all es para cuando quiero que me resuelva por ejemplo 5 operaciones asincronas, me las resuelve en paralelo
//si necesito que se resuelva 1 tras otra y tras otra, voy a anidar promesas




//vamos a hacer el mismo ejercicio de los familiares pero usando .then y .catch en vez de con callback:

function agregarFamiliarProm(idUsuario,infoFamiliar){
    usuarios.findById(idUsuario)
    //hasta que ususarios.findById(idUsuario) no se resuelva de forma satisfactoria, el .then no se va a ejecutar
    .then(usuario=>{
        return familiares.findAllByLastName(usuario.lastName)
        //como este findAllByLastName tambien es asíncrono, anito el siguiente .then
    })
    .then(familiares=>{
        if(familiares.includes(infoFamiliar)){
            return 'Familiar ya existe'
        } else {
            return familiares.createOne(infoFamiliar)
        }
    })
    .then(()=>'Familiar agregado con exito')
    //si cualquiera de los .then da error cae al mismo .catch entonces el manejo de errores es mas sencillo:

    .catch(error=>error)
}

//.then y .catch son métodos de un objeto del tipo promesa, y reciben como parámetro una función de callback



//hay un método .find para buscar en base de datos, que nada tiene que ver con el metodo find de arreglos

//con .then y .catch uso 1 solo manejo de error si tengo promesas anidadas, mientras que con callbacks tengo que poner un manejo de error por cada callback
//independientemente de que tenga un monton de .then, tengo 1 solo .catch



//esta otra manera es mas amigable todavia que el .then y el .catch, porque en el then   y catch sigo anidando
//con async await no tengo la necesidad de estar anidando



async function agregarFamiliarAsync(idUsuario,infoFamiliar){

    try {
        const usuario = await  usuarios.findById(idUsuario)
        //estoy diciendo que la proxima linea de código, que va a usar a la variable usuario, tiene que esperar a que usuarios.findByUd(idUsuario) se resuelva
        const familiares = await familiares.findAllByLastName(usuario.lastName)
        console.log('Hola a todos');
        if(familiares.includes(infoFamiliar)){
            return 'Familiar ya existe'
        }
        return familiares.createOne(infoFamiliar)
         
    } catch (error) {
        return error
    }
}