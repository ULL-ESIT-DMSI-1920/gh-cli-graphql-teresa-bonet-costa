# gh-repo-rename

En esta práctica crearemos una extensión que permitirá cambiar el nombre de un repositorio con una línea de comandos utilizando GraphQl. 


# GraphQL

GraphQL es un lenguaje de consultas, pudiendo obtener como respuesta exactamente el objeto deseado. Este lenguaje está pensado para comunicar clientes y servidores y puede ser una alternativa a REST. Pero si comparamos con REST, es cierto que obtendremos una mayor optimización, ya que se puede evitar hacer múltiples consultas al servidor. 

# Diferencias entre ApiRest y GraphQL

## ApiRest

* Es solo una convención: Es una manera de comunicarse entre el servidor y cliente, cada uno tiene sus reglas.
* El servidor expone recursos: Los clientes se tienen que adecuarse a como están expuestos.
* Hace overfetching: Envía más información de la que se necesita.
* Documentación ajena al desarrollo: No hay un estándar por lo que depende mucho del desarrollador para mantenerla

## GraphQl
* Lenguaje tipado y validable: Le damos una forma de lo que recibe y lo que devolvemos, Además de agregarle seguridad.
* El Cliente define que recibe: Haciendo una consulta, de la estructura que se define como respuesta.
* Envía lo necesario: Se tiene control total de las respuestas que se esperan del servidor.
* Hace un solo request por vista: Prácticamente en solo request puedes mandar todo lo que necesitas.

# Como funciona GraphQL

## Scalars
Permiten definir la mayoría de las propiedades de las entidades que utilizaremos, los tipos que nos permite manejar son
* Int: Números enteros.
* Float: Números con decimales.
* String: Cadenas de texto.
* Boolean: maneja los valores True o False.
* ID: Identificador único(Los asocia el propio GraphQL) este puede ser de tipo Int o String

## Objects
Permite definir las entidades que conforman nuestro esquema. 
Irán encabezados por "type" nombre del objeto y entre paréntesis sus atributos, que pueden ser a su vez otros objetos. 

## Interface
Proporciona la capacidad de describir campos que se comparten en diferentes tipos, es la definición de campos requeridos que sabemos que todas las implementaciones se van a cumplir, si en un futuro necesitáramos que todas las implementaciones de perfil tuvieran un nuevo campo, solamente debemos agregarlo a la Interface.
Se deberá declarar como: interface [Nombre de la interfaz] {}
Dentro de los corchetes irán los atributos y sus scalars.

## Enum
También es conocido como enumeradores, los cuales permiten listar entre una o varias opciones posibles. 
Se escribirá como enum [Nombre de la enumeración] { Opciones }

## Unión
Permite agrupar diferentes tipos en los cuales se puede realizar una búsqueda siempre dentro de los tipos agrupados.
Se escribirá como una variable del tipo union igual a los objetos entre los cuales queremos encontrar el objeto deseado.

## Modificadores de tipo

Dentro de GraphQL existen dos tipos de modificadores los cuales son.
* ! : El signo de exclamación permite indicar que un valor es requerido, de una manera más sencilla el campo que se requiera no puede ser null ya que si lo fuera GraphQL mostraría un error, en caso de que el campo no cuente con un el signo de exclamación esto nos indica que el campo es opcional.

* ［］ : el uso de corchetes permite indicar que se espera mas de una valor, se podría decir que similar a los famosos arreglos que utilizamos en cualquier lenguaje de programación.

## Query
"Type Query" lo utilizaremos para realizar las consultas. 

## Mutation
GraphQL también permite insertar, borrar y editar elementos. Para ello, en vez de crear estructuras con query deberemos utilizar mutation. 

# Código de la práctica
## Combinar JavaScript con GraphQL 
Debemos generalizar las consultas con parámetros en funciones flecha. 
Esto lo veremos en las capturas del query y del mutation.
Tenemos que tener en cuenta que necesitamos la librería shelljs, y también debemos asegurar que tenemos gh y git instalados, sin esto no será posible realizar las consultas.
![image](shell.png)
![image](ghgit.png)

Una vez el código ha asegurado esto, se podrá ejecutar la consulta y el cambio de la siguiente forma:
![image](qejec.png)
![image](mejec.png)

Como vemos, gh api se puede utilizar para graphQL. 
La opción _-f_ hará que no se fuerze la consulta. _--jq_ hará que se trate el objeto JSON con JQuery.
## Query
Hemos añadido una consulta en GraphQL a nuestro código, en esta consulta lo que hacemos es pasarle como parámetro el owner y el nombre del repositorio que busquemos y la consulta nos devolverá su id en la constante id.

![image](query.png)

## Mutation
Una vez obtenido el id debemos cambiarle el nombre al repositorio, esto lo podemos hacer con mutation y utilizando la función updateRepository. 

![image](mutation.png)

## Clonar el repositorio a un repositorio de nuestro perfil

Hemos desarrollado el código en el repositorio que se encuentra dentro de la organización de la asignatura, pero ahora vamos a clonarlo al perfil individual para seguir con las normas de extensiones, por convención, el nombre deberá ser gh-funcionalidad.
Para ello crearemos una rama remota que modificará ambos repositorios cuando modifiquemos este. 
En mi caso, al utilizar gitpod, se pierde la rama remota y esto deja de funcionar. En mi caso he decidido dejar en el Readme de la extensión simplemente la documentación de la extensión que está al final de este Readme. 
El link al repositorio con la extensión: 
[TeresaUll/gh-repo-rename](https://github.com/TeresaUll/gh-repo-rename)

```
git clone
git remote add [NuevoRepo]
git push [ramaRemota]

```

# gh-repo-rename

You will be able to change the name of a repository by using this comand
 
## Installation
```
gh extension install teresaUll/gh-repo-rename

```
## Usage 

```
Usage: gh-repo-rename [options]

Options:
  -V, --version      output the version number
  -r, --repo <repo>  repository
  -o, --org <org>    org
  -n, --name <name>  name
  -h, --help         display help for command

```
## Author

Teresa Bonet 