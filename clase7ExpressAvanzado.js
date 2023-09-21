
/* EXPRESS AVANZADO

Tenemos params, query y body como principales propiedades del objeto request donde recibimos la 
información

QUERY
app.get('/api/users', async (req,res)=> {
    console.log('query', req.query)
    const users = await manager.getUsers()
    res.json({message: 'users found', users})
})
Ese console.log(req.query) me arroja un objeto vacion porque todavia no le pasamos ninguna información
Qué vamos a pasar como query? Por ejemplo limite, para que me arroje cierta cantidad, filtrados,
ordenamientos por orden alfabético, nos permite ser mas específicos en la busqueda

Con un signo de pregunta le indicamos que lo que sigue lo guarde en la propiedad query del objeto
request. Las propiedades las pasamos como par clave valor. Si quiero adicionar mas propiedades
pongo un and &
Por ejemplo: https://rickandmortyapi.com/api/character/?name=rick&status=alive
Nosotros le tenemos que decir a la gente del front, "estas son las propiedades que voy a estar
recibiendo como query". Si el front quiere pasar otra propiedad en query y en el back no existe, 
no arrojará nada pero tampoco va a tirar error.

Yo voy escribiendo en la barra de direccion los querys (con su clave - valor) y al hacer 
console.log(req.query) me va a salir por consola el objeto con esa propiedad y el valor 
que yo le haya definido.

En el archivo con las clases de usersManager voy al método getUSers y le pongo un parámetro
al método:
async getUsers(queryObject)
Entonces al getUsers llamado en el archivo server le paso el parámetro req.query, 
el objeto con todas las querys que le mando:
app.get('/api/users', async (req,res)=> {    
    const users = await manager.getUsers(req.query)
    res.json({message: 'users found', users})
})
Hago un desestructuring de la propiedad limit del queryObjets. Entonces si hay propiedad limit. 
me la guarda en la variable. 
Guardo en usersData el parse del readFile
Retorno: si hay limit, el usersData.slice; si no hay limite, el usersData
como el valor de limit es un string le pongo el + delante para pasarlo a number
async getUsers(queryObj) {
    const { limit } = queryObj;
    try {
      if (existsSync(path)) {
        const usersFile = await promises.readFile(path, "utf-8");
        const usersData = JSON.parse(usersFile);
        return limit ? usersData.slice(0, +limit) : usersData;
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }
Entonces si no le paso un limit me los muestra todos
El cliente puede mandar cualquier propiedad por query que quiera pero mi back solo va a trabajar
con limit, no estoy usando esas otras propiedades que pase

En la api de rickandmorty especifica que si queres filtrar por nombre, escribas la propiedad
por query name, etc

Yo genero una documentacion para que el cliente sepa cuales son los endpoints, cuales son 
los querys, etc

Como le pasé un parámetro al método getUsers del archivo usersManager.js, a los demas metodos
de la clase, como llaman a getUsers, les tengo que pasar como parámetro un objeto vacío, para que
no se quede sin parámetro:  await this.getUsers({})
Como estoy pasando un objeto vacio en vez de un req.query, me muestra todos los users, porque 
propiedad limit no va a haber, no importa que sea un objeto vacio, me muestra todos


BODY
La información que recibimos por body es cuando hacemos un post o un put
Al momento de crear respuestas debo incluir algo adicional, que son los códigos de estado
para hacer mas entendible mi respuesta
Es un estado del proceso, para saber como se encuentra o cómo finalizó
100: informativos, indican que peticion esta siendo procesada
200: peticion procesada exitosamente
300: indican que se esta haciendo algo adicional, como una redireccion
ninguno de estos 3 primeros representa error
400: avesa de error del lado del cliente, no vino  la info que era, id incorrecto, 
no vinieron las propiedades para esa info, etc. Se utiliza cuando el cliente realiza una petición
que no cumpla con las reglas de la comunicación una mala consulta, falta enviar un dato o viene
en formato incorrecto
500: errores del lado del servidor, la peticion llego correcta del lado del cliente pero
sucedio algo cuando el servidor estaba tratando de procesar la petición

Nosotros respondemos con el status

401: cuando el cliente no se ha identificado con el servidor bajo una credencial, no puede 
accceder al recurso. Es un error de autenticacion
403: cuando el lciente se identificó pero no tiene la autorización para realizar la petición
que está tratando de hacer
404: cuando el recurso no se ha encontrado, endpoint o el dato solicitado

El front decide cómo mostrarle ese error al usuario

Así es que es la sintaxis para mostrar un status, res.status(numero) es un método del objeto res:
res.status(200).json({ message: "Users found", users });

Meto el status(200) en el try y el status(500) en el catch. Escribo error.message porque
message es una propiedad del objeto error que tienen todos los objetos error:
app.get("/api/users", async (req, res) => {
  try {
    const users = await manager.getUsers(req.query);
    res.status(200).json({ message: "Users found", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



En el get de userById puedo hacer un condicional para que si no hay user de status(404) de
user not found. Porque en usersManager en el método getUserById tengo un find que me retorna 
el user. Un find si no encuentra retorna undefined, entonces, si da undefined en server.js
voy a traer un status(404):

Archivo usersManager donde está mi clase y mis métodos:
async getUserById(id) {
    try {
      const users = await this.getUsers({});
      const user = users.find((u) => u.id === id);
      return user;
    } catch (error) {
      return error;
    }
  }

Archivos server donde armo mi backend:
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await manager.getUserById(+id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with the id provided" });
    }
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

el método .json con minuscula es para convertir un objeto de JS a notación json, con strings, 
por eso es que en el parámetro de .json() le paso un objeto con sus claves sin comillas, y 
la conversion queda como objeto json con sus claves con comillas

Vamos a trabajar con params cuando necesitamos buscar una referencia en particular, por ej
para actualizar 1 producto en particular, o eliminarlo


API 
Api: Aplication programming interfase
Es como un contrato, un puente entre el front y el back
El front necesita consumir todas las funcionalidades que tengo en mi back para poder mostrarle
cosas a los usuarios
Al front solo le interesa que con llamar a /api/users con un metodo get va a obtener todos los usuarios
pero cómo lo hace el back, no le interesa. Solo le interesa que consumiendo los distintos 
endpoints con los distintos métodos va a poder obtener la info que le interesa
Es gracias a lo que hacemos en el archivo server.js, el app.get(y todo lo demas) que es nuestro
puente que va a poder consumir nuestras funcionalidades de back
En mi archivo server.js estoy creando mi api, y es lo que va a consumir el front


API REST
Hay distintas formas de crear una api. Nosotros vamos a trabajar con una api REST
REST permite definir la estructura que deben tener los datos para poder transferirse
Representational State Transfer

Los 2 formatos mas importantes para transferencia de data son XML y JSON. Se usa mas JSON
por la simplicidad de la información, porque es parecido a un objeto y es mas entendible a simple
vista, y es mas ligero

La API REST trabajo con los 4 métodos get, post, put, delete con formato json, respeta el protocolo
http, tiene una arquitectura cliente-servidor marcada
Arquitectura cliente-servidor sin estado: significa que cada petición es única e independiente
Si se necesita esa informacion nuevamente se hace una nueva peticion
Cacheable: debe admitir almacenamiento en caché
Interfaz uniforme: cada acción debe contar con una url, un identificador unico

Métodos de petición: get, post, put, delete
yo puedo llamar al mismo endpoint pero con distintos métodos

Desde el navegador yo puedo probar los endpoints que usen el método get
Para probar mis otros métodos lo hago con otras herramientas: insomnia, postman, las descargamos 
para la pc. Insomnia es la mas sencilla
Para el visual code podemos usar Thunderclient, es una extension del visual code
Abro Thunderclient, elijo el método y coloco el endpoint
Para el metodo post, en la pestaña body es donde yo pongo la info que quiero enviar, si uso
el método get o delete no va a utilizar lo que esté escrito en body por mas que haya algo 
escrito, solo lo usa para el post y el put


METODO POST
La información que nos mandan nos llega por la propiedad body del objeto request
Al principio del código tengo que poner esto para que el servidor entienda la información que 
le llega por body:
app.use(express.json());


MÉTODO POST PARA CREAR UN USUARIO:
1. Hago un desestructuring del objeto req.body
2. Hago un condicional para que si no me manda first_name, course o password, me de un erros con
status 400 por falta de información
3. creo una const response y guardo ahi el llamado a createUser y por parametro le paso el req.body
que seria el objeto completo que recibo porque ya validé que estén todos los datos
4. paso un status 200 y convierto la respuesta a json, pasando un mensaje de user creates y 
la constante response

app.post("/api/users", async (req, res) => {
  const { first_name, course, password } = req.body;
  if (!first_name || !course || !password) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const response = await manager.createUser(req.body);
    res.status(200).json({ message: "User created", user: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

Al método createUser del archivo userManager.js le modificó que haga un return del newUser 
para que el método post me muestre el user en la respuesta del post, queda así:
async createUser(user) {
    try {
      const users = await this.getUsers({});
      let id;
      if (!users.length) {
        id = 1;
      } else {
        id = users[users.length - 1].id + 1;
      }
      const hashPassword = createHash("sha512")
        .update(user.password)
        .digest("hex");

      const newUser = { id, ...user, password: hashPassword };
      users.push(newUser);
      await promises.writeFile(path, JSON.stringify(users));
      return newUser;
    } catch (error) {
      return error;
    }
  }

Aca en el createUser yo definí que le voy a pasar un parámetro, y ese parámetro que le paso
en server.js es el objeto req.body

Repasando, yo voy a estar recuperando la información por el req.body




DELETE
1. le pongo : al endpoint
2. desestructuro el idUser del objeto req.params
guardo en la constante response el llamado a deleteUser con parametro idUSer casteado a number
3. en el método deleteUser de mi clase usersManager ahora puso un find, entonces aca pongo que si
no hay response (o sea si diera undefined porque no lo encuentra en el find) retorne status 404
4. si hay response, retorna status 200 y mensaje por json "user deleted"

async deleteUser(id) {
    try {
      const users = await this.getUsers({});
      const user = users.find((u) => u.id === id);
      if (user) {
        const newArrayUsers = users.filter((u) => u.id !== id);
        await promises.writeFile(path, JSON.stringify(newArrayUsers));
      }
      return user;
    } catch (error) {
      return error;
    }
  }

app.delete("/api/users/:idUser", async (req, res) => {
  const { idUser } = req.params;
  try {
    const response = await manager.deleteUser(+idUser);
    if (!response) {
      return res
        .status(404)
        .json({ message: "User not found with the id provided" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





UPDATE USER
Mi método de la clase de usersManager.js:
Hago la validación de if(index === -1){return null} para despues poder mandar un error 404

Creo la constante updateUser y le asigno un objeto que riega el users[index] y al regar el 
obj que paso por parámetro al método, se sobreescriben las propiedades. A la hora de pasarle 
el objeto, puedo pasarle un objeto con solo la propiedad nombre por ejemplo y se me 
actualiza en ese usuario solo el nombre y las demas propiedades quedan como estan, porque yo
riego el elemento que voy a modificar y despues riego el elemento que paso por parametro donde
se actualizan solo las propiedades que tenga, que son las que yo quiero actualizar 

El método splice de arreglos me permite ir a un indice, sacar ese elemento y agregar otro en
la misma posición. Lleva 3 parámetros (el índice del elem que quiero sacar, la cantidad de 
elementos y si quiero añadir otro en reemplazo). A splice si le paso 0 como segundo parámetro
no me elimina ese elemento que pasé por primer parámentro, y me agrega el elemento que pasé 
como tercer parámetro.

Por ultimo, retorno el updateUser

async updateUser(id, obj) {
    try {
      const users = await this.getUsers({});
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) {
        return null;
      }
      const updateUser = { ...users[index], ...obj };
      users.splice(index, 1, updateUser);
      await promises.writeFile(path, JSON.stringify(users));
      return updateUser;
    } catch (error) {
      return error;
    }
  }
}

Cómo armo el PUT en server.js:
Extraigo el idUser del req.params que se pasa por url

Llamo al método updateUser y le paso de parámetro el idUser casteado a number y el objeto 
req.body, y lo guardo en la constante response
Si response es null (porque el método updateUSer retorna null), cae en el status(404) y se corta
ahi porque hay un return res
Si response no es null cae en el res.status(200)

app.put("/api/users/:idUser", async (req, res) => {
  const { idUser } = req.params;
  try {
    const response = await manager.updateUser(+idUser, req.body);
    if (!response) {
      return res
        .status(404)
        .json({ message: "User not found with the id provided" });
    }
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});







*/