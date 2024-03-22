# Practica Aplicacion coleccionista de Magic

 __funcionamiento:__ `node --experimental-modules dist/index.js [comando] [opciones del comando]`

# Badge

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-alu0101316734/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-alu0101316734/actions/workflows/node.js.yml)

[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-alu0101316734/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-alu0101316734/actions/workflows/coveralls.yml)

[![Sonar-Cloud](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-alu0101316734/actions/workflows/sonarcloud.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-alu0101316734/actions/workflows/sonarcloud.yml)

## Introdución

con el objetivo de usar la API dada de nodejs en esta practica aprederemos a usar la gestión de fichero de esta misma.Cabe recalcar que solo se usara la parte sincrona de esta.Además usaremos los paquetes chalk y yargs.Y por supeusto seguiremos la metodolgía `TDD` y usaremos `c8` y `coveralls` para el cubrimiento del codigo y para comprobar la calidad de dicho codigo ultilizaremos `SonarCloud`.

## Objetivo

* Funcionamineto escencial de ficheros en node de manera sincrona

* El uso de paquetes como chalk y yargs

## Funcionamiento

Tal y como comentamos el objetivo de esta practica será la gestión de fichero.Para ello usaremos una carpeta llamada __usuarios__ en ella cada usuario deberá tendrá su propia carpeta en la cual alamacenará en un fichero `.json` cada una de sus cartas.

## Clases

Para empezar hablaremos de la clase principal que es `Carta`

```ts
class Carta implements Carta_interface
{
  constructor(public ID:number,public nombre:string,public coste:number,public color:string,public tipo:string,public rareza:string,public texto:string,public valor:number)
  {
    //Construye la carta con los atributos correspondientes
  }
  toJSON()
  {
    //Pasa la clase a formato JSON 
  }
}
```

La clase su principalfuncion es almacenar los atributos pasados por constructor y una vez hecho esto definir un `toJSON` para pasar el formato _JSON_.

En cuanto a otras clases tenemos 2 clases la primera seria esta.

```ts
class Carta_Criatura extends Carta
{
    constructor(public ID:number,public nombre:string,public coste:number,public color:string,public tipo:string,public rareza:string,public texto:string,public valor:number,public estadistica:stats)
    {
       // construimos a base de la clase heredada
    }    
    toJSON()
    {
      // añadimos los atributos extras
    }
}
```

Esta clase es una clase particular del tipo de carta porque necesita un atributo necesario como es estadistica.Luego el nuevo atributo lo añadimos en el toJSON para poder pasarlo a _JSON_ también.

La otra clase es muy parecida a la anterior dado que el tipo de carta tiene un atributo el cual no tiene el tipo de carta genérico.

```ts
class Cartas_Planeswalker extends Carta
{
    constructor(public ID:number,public nombre:string,public coste:number,public color:string,public tipo:string,public rareza:string,public texto:string,public valor:number,public lealtad:number)
    {
        // construimos a base de la clase heredada
    }       
    toJSON() {
         // añadimos los atributos extras
    }
}
```

## Opciones del programa

### Add

Empezamos pidiendo los argumentos que necesitan para crear un archivo y son

* __user__ El usuario  que quiere añadir

* __id__ El identificador de la carta

* __nombre__ el nombre dicha carta

* __coste__ el numero de mana que cuesta jugar la carta

* __color__ el color de la carta

* __tipo__  el tipo especifico de la carta

* __rareza__ la dificultad de conseguir esta carta

* __texto__ indica el efecto de la carta

* __valor__ este es su valor en el mercado de compra/venta

* __estadistica__ es una dupla de la fuerza y vida de las cartas criaturas

* __lealtad__ es un nivel de lealtad que poseen las cartas planeswalker

Una vez procesados mediante _yargs_ empezamos comprobando si cada archivo se ha puesto todos los atributos correctamente.Si por ejemplo, se nos olvida poner la estadistica de una criatura nos devolvera error y si le ponemos estadistica a una carta que no sea criatura también nos devolvera error.

```ts
if(argv.estadistica !== undefined && argv.tipo !== "Criatura")
{
  console.error("solo las criaturas tiene que tener fuerza y vida");    
  exit(1)
}

if(argv.estadistica === undefined && argv.tipo === "Criatura")
{
  console.error("las criaturas tiene que tener fuerza y vida");    
  exit(1)
}
```

> Para la lealtad es extamente lo mismo

Una vez hecho esto comprobamos si existe el directorio del usuario en su defecto lo creamos.Lo crearemos usando su nombre de usuario más el directorio llamado `usuarios`.Este directorio para crearlo haremos uso de `mkdirSync` esto creara el directorio.

Una vez hecho esto porcederemos a crear el fichero para ello primero crearemos la ruta que sera la ruta del directorio anterior más el nombre de la carta y al final el `.json`.Una vez hecho esto cogemos los valores pasados por pasados por parámetros de comando y instanciamos una de las clases,dependiendo del tipo.Por ultimo hacemos unso de `ẁriteFileSync` que le daremos como parametros la ruta del archivo y la clase trasnfromada a json.

```ts
// Asi creamos el archivo
if(!fs.existsSync(pathfile))
{
        fs.writeFileSync(pathfile,jsonData)
        console.log(chalk.green("se ha creado la carta correctamente"))  
}else
{
   console.error(chalk.red('directorio no creado'));
   exit(1);  
}
```

### List

Para ejecutarlo solo necesitamaos el __user__

Este comando es bastante sencillo.Para mostrar todas las cartas usaremos `readdirSync` que nos permite leer todos los archivos y subdirectorios.Dado que nosostros no trabajamos con subdirectorios no nos hace falta filtrarlos. una vez hecho esto abrimos dicho archivo usamos `JSON.parse` y mostramos todos sus atributos por pantalla.Nos quedaría así

```ts
    archivos.forEach(archivo =>{
      const contenido = fs.readFileSync(path+'/'+archivo).toString()
      const datos=JSON.parse(contenido);
      //Imprimir por pantalla los atributos
    })
```

### Search

Para ejecutar este comando necsitamos el __user__ y el __id__ de busqueda

Este comando es bastante parecido al anterior.la unica diferencia es que vamos a comprobar si el id del archivo es igual al buscado imprimimos.Si no encotramos el __id__ se activa un _boolean_ que devuelve un error que no se ha encontrado el id.

```ts
    archivos.forEach(archivo =>{
      const contenido = fs.readFileSync(path+'/'+archivo).toString()
      const datos=JSON.parse(contenido);
      if(datos.id === argvsearch1.id)
      {
      //Imprimir por pantalla
      console.log(chalk.green("Se ha encontrado la carta"))
      encontrado=true
    })
    if(!encontrado)
      {
         console.error(chalk.red("Carta no encontrada"))
         exit(1)
      }
```

### Delete

Para ejecutar este comando necsitamos el __user__ y el __id__ de eliminar

Este caso haremos algo parecido con la diferencia que mostraremos por pantalla vamos a eliminar el archivo usando el comando `unlinkSync` que elimina el archivo.

```ts
  archivos.forEach(archivo =>{
    const contenido = fs.readFileSync(path+'/'+archivo).toString()
    const datos=JSON.parse(contenido);
    if(datos.id === argvdelete1.id)
    {
      
      const pathfile = path + '/' + datos.nombre + '.json';
      fs.unlinkSync(pathfile);
      console.log(chalk.green("Se ha eliminado la carta"))
      encontrado=true
    } 
   });
```

### Modify

Para ejecutar este comando necsitamos el __user__ y el __id__ a modificar.Y el resto son argumentos opcionales para su modifcación.

nuevamente es muy parecido a lo anterior con la diferencia que comprobaremos si el usuario a definido para cambiar y si es el caso modificamos el dato.Luego lo volvemos apasr en formato JSON y volvmeos a escribir en el archivo.

```ts
// un ejemplo de como sería 
      if (argvmod1.id !== undefined) {
         datos.id = argvmod1.id;
      }
     if (argvmod1.nombre !== undefined) {
         datos.nombre = argvmod1.nombre;
      }
```

## Concluciones

En esta práctica me he familiarizado en ultlizar el API de nodejs y consultar información en esta.Personalmente me costo un poco entender como se ultlizaba ya que la página tiene mucha información y es complicado manejarse en ella pero una vez la entiendes no es tan díficil.Ultilizar el _yargs_ y _chalk_ no fue tan díficil pero si dificulto bastante la forma de hacer el test.

## Bibliografía

[typedoc] (https://typedoc.org)

[typescript] (https://www.typescriptlang.org/docs/)

[nodejs] (https://nodejs.org/en)

[javascript] (https://developer.mozilla.org/es/docs/Web/JavaScript)