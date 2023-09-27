
/* Dinamismo gracias a JS
JS dinamica a los desarro.llos para verlos de forma visual
front y back: logica de negocio en el back y en el front la interfaz gráfica
Frameworks de front
No todas las pag requieren de las mismas herramientas (React, Vue, Angular) depende de la interaccion
del usuario que requiero en mi app web. Otra herramienta para crear la interfaz gráfica 
son los motores de plantilla

Pagina con <h1>Hola, {{nombre de usuario}}</h1>
Doble llave indica que ahi hay una variable
Doble llave y un numeral es porque va a haber un condicional
Doble llave, corchete y una cosa mas va a haber un ciclo
Quienes crean los motores de plantilla definen estas reglas

Una plantilla se parece mucho a un html, soloq ue tiene cierta información dinámica

Motores de plantilla: handlebars, ejs, pug
Cada una con su sintaxis

Nosotros vamos a trabajar con Handlebars
Handlebars y Ejs son parecidos, Pugjs es el mas diferente

HANDLEBARS
Asi se escbribe un if, si existe un autor, muestrame el resto:
<div class="entry">
{{#if author}}
<h1>{{firstName}} {{lastName}}</h1>
{{/if}}
</div>



El nivel de dinamismo refiere a qué tanta interacción requiere el usuario con la página, 
ademas de qué tan constantes son los renderizados de elementos de la pagina
Segun el dinamismo elijo la herramienta uqe voy a usar

Para una landing page por ejemplo podemos usar JS puro. Aca no hay interacción

Website con catalogo y sistema de login, ahi uso motor de plantilla (dinamismo controlado
pero no con el nivel de complejidad para considerarse webapp). Aca el nivel de interaccion
es bajo

En Webapp (mayor dinamismo) habria qye usar una herramienta especializada en front 
(React, Vue, etc). Aqui los elementos cambian constantemente
Aca ya motor de plantilla no sirve porque parece que trabajara lento (porque renderiza
por completo la plantilla para actualizar la info)


Puedo por ejemplo usar React y ademas un motor de plantilla para generar todos los tamplates
de email que se envien a los distintos usuarios, porque los motores de plantilla son de 
fácil configuración

Si bien puedo llegar al mismo resultado usando cualquier tecnología, en algunos casos será
demasiado compleja una tarea si elijo mal. En otros casos quizas el proyecto era demasiado
sencillo para la herramienta utilizada y tal vez no era necesario hacer tanto


Hay una dependencia que es handlebars express: une handlebars con express
npm install express-handlebars


Las plantillas se guardan en la carpeta views

Para decirle a mi servidor que voy a estar trabajndo con este motor de plantilla:
app.engine('handlebars', engine()) 
paso nombre del motor de plantilla y el engine() es la funcion con la que se va a 
llevar adelante ese motor de plantilla
import { engine } from 'express-handlebars'

Si yo quisiera generar un motor de plantilla: app.engine('nombre', funcion) , pero 
no lo voy a hacer


Despues pongo settings para express. Para darle valor a esos distintos settings
Configuro el setting de views y el de view engine
app.set('views', __dirname+'/views');
aca paso la ubicación de la carpeta views. Con dirname le paso la ruta absoluta

app.set('view engine', 'handlebars');
aca le paso de value el motor de plantilla con el que voy a estar trabajando


Dentro de la carpeta views pongo otra carpeta que se llame layouts
En layout lo que quiero mantener en mis distintas vistas (h1 que necesito aun asi 
las vistas cambien, por ejemplo si es la vista login, vista de perfil, etc)
Triple llave:
{{{body}}} <-- aca es donde voy a insertar la vista en la que voy a estar trabajando
ese body se va a reemplazar por las distintas vistas, mediante render

Handlebars me pide que al menos haya un layout y se tiene que llamar main.handlebars
siempre por default va a utilizar el layout que se llame main
Creo en main.handlebars la estructura de un HTML5
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Handlebars</title>
</head>
<body>
    <h1>FIRS HANDLEBARS LAYOUT</h1>
    {{{body}}}
</body>
</html>

Todas las vistas que yo vaya creando van a tener ese <h1>FIRS HANDLEBARS LAYOUT</h1>


Puedo crear un archivo view1.handlebars
<h3>FIRST VIEW</h3>
Y puedo crear un archivo view2.handlebars
<h3>SECOND VIEW</h3>
Éstas vistas se van a incrustar en los layouts

Para incrustar, voy a mi archivo app.js y pongo método get y metodo render para renderizar
app.get("/api", (req, res) => {  
  res.render("view1");
});
va sin async porque no estoy esperando respuesta de un promesa


Voy a tener un entutador que se va a encargar de hacer los renderizados 
Voy a crear un enrutador en la carpeta routes que se va a llamar views.router.js
En app.js importo viewsRouter from './routes/views.router.js'
y pongo ademas:
app.use('/', viewsRouter)

en views.router.js pongo:
import {Router} from express
const router = Router()
router.get("/api", (req, res) => {  
  res.render("view1");
});
export default router


Si yo desde usuarios necesito que se renderice algo lo que hago es redireccionar
a la ruta de views necesaria

chatGPT:
El server-side rendering (renderizado en el lado del servidor) es un enfoque de 
renderizado utilizado en el desarrollo web para generar y enviar contenido HTML 
completo desde el servidor al cliente. En este enfoque, cuando un cliente realiza 
una solicitud a un servidor web, el servidor procesa la solicitud y genera el 
contenido HTML completo que se enviará al navegador del cliente.

Con motores de plantilla es para dinamismo relativamente bajo o hasta medio




Cómo hacer PARA TRABAJAR ESTRUCTURAS DINAMICAS con handlebars:

creo una view users.handlebars
<h2>{{first_name{{ {{last_name}}</h2>
<p>Your email is {{email}}</p>

en app.js pongo app.use('/api/views', viewsRouter)

y en views.router.js pongo esto, pasandole los valores al render:
router.get('/user', (req, res) =>{
    res.render('users', {
        first_name: 'Marce', 
        last_name: 'Oses', 
        email: ''mar@gmail.com
    })
})



PARA PONER UN CONDICIONAL:
{{#if user}}
<h2>{{user.first_name{{ {{user.last_name}}</h2>
<p>Your email is {{user.email}}</p>
{{else}}
<p>No user</p>
{{/if}}

en views.router.js armo:
const user = {
        first_name: 'Marce', 
        last_name: 'Oses', 
        email: ''mar@gmail.com
    }

router.get('/user', (req, res) =>{
    res.render('user', {user})
})

Puedo tener un arreglo de usuarios, con varios usuarios dentro
en views.router.js:
const users = [
    {
        nombre: 'Alejandro',
        apellido: 'Alvarez',
        email: 'aalvarez@mail.com'
    },
    {
        nombre: 'Carolina',
        apellido: 'Suarez',
        email: 'csuarez@mail.com'
    },
    {
        nombre: 'Andres',
        apellido: 'Montenegro',
        email: 'amontenegro@mail.com'
    }
]
router.get('/users', (req, res) =>{
    res.render('users', {users})
})

creo users.handlebars y pongo
{{#each users}}
<h2>{{user.first_name{{ {{user.last_name}}</h2>
<p>Your email is {{user.email}}</p>
{{/each}}




AHORA CREO SIGNUP.HANDLEBARS y le pongo un formulario:
<h2>WELCOME</h2>
<form action="/api/users/signup" method="post">
FirstName: <input type="text" name="first_name" id="first_name">
LastName: <input type="text" name="last_name" id="last_name">
Email: <input type="email" name="email" id="email">
Password: <input type="password" name="password" id="password">
<input type="submit" value="ENTER">
</form>

y en views.router.js pongo:
router.get('/signup', (req, res) =>{
    res.render('signup', {users})
})

renderizo y ya me sale el formulario
la idea es completar el formu con valores y rediccionar a /api/user/signup 
con el método post para crear ese usuario

y voy a armar ese método post EN users.router
va con async porque uso el archivo usersManager que tiene promesas
me va a crear un usuario en el archivos users.json con lo que ingrese por el formulario

router.post("/",async (req, res) => {
  const { first_name, email, password } = req.body;
  if (!first_name || !email || !password) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const response = await usersManager.createUser(req.body);    
    res.redirect(`/api/signupresponse/${response.id}`)
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

al app.js le tengo que agregar otra linea de codigo para poder recibir la info que 
venga del formu:
app.use(express.urlencoded({ extended: true }));

yo en el método post le estoy diciendo que redireccione a
res.redirect(`/api/signupresponse/${response.id}`)
entonces tengo que crear una ruta asi para que muestre al usuario 
en views.router.js:
import {manager} from 'usersManager.js'
router.get('/user/:idUser, async(req,res)=>{
    const { idUser } = req.params;
    try{
        const user = await usersManager.getUserById(+idUser);
        res.render("profile", { user });
    }
    catch(error){}    
})

creo un profile.handlebars y pongo:
{{#if user}}
<h3>Welcome {{user.first_name}} {{user.last_name}}</h3>
<p>This is your profile and your email is: {{user.email}}</p>
{{else}}
<h2>There was an error during signup</h2>
{{/if}}


Dentro de la carpeta public, puedo tener una carpeta css y dentro archivos css:
archivo first.css y second.css
uno con h3{
    color: blue
}
otro con h3{
    color: red
}

En el main.handlebars en el link a stylesheet le pongo href="/css/first.css"
Busca la carpeta publica y dentro css y ahi el archivo

lo puedo hacer dinámico:
En main.handlebars pongo:
href="/css/{{style}}.css"

y en views.router.js pongo:
router.get('/user/:idUser, async(req,res)=>{
    const { idUser } = req.params;
    try{
        const user = await usersManager.getUserById(+idUser);
        res.render("profile", { user, style: "first" });
    }
    catch(error){}    
})


 */