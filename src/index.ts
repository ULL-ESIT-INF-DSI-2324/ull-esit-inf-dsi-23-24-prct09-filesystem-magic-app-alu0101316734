import { exit } from "process";
import fs from "fs"
import yargs from "yargs"
import chalk from "chalk";
import { Carta_Criatura,stats } from "./Cartas/Carta_Criatura.js";
import { Carta } from "./Cartas/Carta.js";
import { Cartas_Planeswalker } from "./Cartas/Carta_Planeswalker.js";



/**
 * @package Usando __yargs__ para añdadir por coleccion
 */

 const argv= await yargs(process.argv)
.command('add','añade una carta a la coleccion',{
 user:{
    description: 'nombre del usuario',
    type: 'number',
    demandOption: true
 },
 id: {
    description: 'ID de la carta',
    type: 'number',
    demandOption: true 
 },
 nombre: {
   description: 'nombre  de la carta',
   type: 'string',
   demandOption: true 
 },
 coste: {
    description: 'Coste de la carta',
    type: 'number',
    demandOption: true
 },
 color:{
    description: 'Color de la carta',
    type: 'string',
    demandOption: true
 },
 tipo:{
    description: 'Indica el tipo de carta',
    type: 'string',
    demandOption: true
 },
 rareza:{
    description: 'Indica la rareza de la carta',
    type: 'string',
    demandOption: true
 },
 texto:{
    description: 'Texto que indica el efecto de la carta',
    type: 'string',
    demandOption:true
 },
 valor:{
    description: 'El valor en el mercado de la carta',
    type: 'number',
    demandOption: true
 },
 estadistica:{
    description: 'Indica la fuerza y la vida de una criatura',
    type: 'array'
 },
 lealtad:{
    description: 'Marca de Lealtad para los planeswalker',
    type: 'string'
 }
})
.help()
.argv;
//Listar

/**
 * @package Usando __yargs__ para listar la coleccion
 */
const argvlist =await yargs(process.argv)
.command('list','Listar las  cartas de su coleccion',{
  user:{
   description: 'usuario al que listar su coleccion',
   type: 'string',
   demandOption: true
  }
})
.argv
//Mostrar
/**
 * @package  Usando __yargs__ para buscar una carta de la coleccion
 * */ 
const argvsearch =await yargs(process.argv)
.command('search','Busca una carta de la coleccion',{
  user:{
   description: 'usuario al que mostrar la carata',
   type: 'string',
   demandOption: true
  },
  id:{
   descripcion: 'id de la carta a buscar',
   type: 'number',
   demandOption: true
  }
})
.argv
//Eliminar
/**
 * @package  Usando __yargs__ para eliminar una carta de la coleccion
 */
const argvdelete =await yargs(process.argv)
.command('delete','Eliminar una carta de la coleccion',{
   user:{
    description: 'usuario al que mostrar la carata',
    type: 'string',
    demandOption: true
   },
   id:{
    descripcion: 'id de la carta a la que eliminar',
    type: 'number',
    demandOption: true
   }
 })
 .argv
//Modificar
/**
 * @package  Usando __yargs__ para modificar una carta de la coleccion
 */
 const argvmod = await yargs(process.argv)
.command('modify','modifica una carta',{
   user:{
      description: 'usuario',
      type: 'string',
      demandOption: true
   },
   idmod:{
     description: 'Id de a modificar',
     type: 'string',
     demandOption: true
   },
   id: {
      description: 'ID de la carta',
      type: 'number'
   },
   nombre: {
     description: 'nombre  de la carta',
     type: 'string'
   },
   coste: {
      description: 'Coste de la carta',
      type: 'number'
   },
   color:{
      description: 'Color de la carta',
      type: 'string'
   },
   tipo:{
      description: 'Indica el tipo de carta',
      type: 'string'
   },
   rareza:{
      description: 'Indica la rareza de la carta',
      type: 'string'
   },
   texto:{
      description: 'Texto que indica el efecto de la carta',
      type: 'string'
   },
   valor:{
      description: 'El valor en el mercado de la carta',
      type: 'number'
   },
   estadistica:{
      description: 'Indica la fuerza y la vida de una criatura',
      type: 'array'
   },
   lealtad:{
      description: 'Marca de Lealtad para los planeswalker',
      type: 'string'
   }   
})
.argv
const argvlist1=argv;
const argvsearch1=argv;
const argvdelete1=argv; 
const argvmod1=argv;
/**@summary al usar add entramos en este condicional */
if(argv._[2] === "add")
{
if(argv.lealtad === undefined && argv.tipo === "Planeswalker")
{
   /**@throws devolvemos error si no se añade lealtad a los Planeswalker */
  console.error(chalk.red("los planeswalker tiene que tener una lealtad"));
  exit(1)
}
if(argv.lealtad !== undefined && argv.tipo !== "Planeswalker")
{
/**@throws devolvemos error si  se añade lealtad a los que no son Planeswalker */
  console.error(chalk.red("solo los planeswalker tiene que tener una lealtad"));
  exit(1)
}

if(argv.estadistica !== undefined && argv.tipo !== "Criatura")
{
/**@throws devolvemos error si no se añade estadistica a las Criaturas */
  console.error(chalk.red("solo las criaturas tiene que tener fuerza y vida"));    
  exit(1)
}

if(argv.estadistica === undefined && argv.tipo === "Criatura")
{
/**@throws devolvemos error si se añade estadistica a las que no son Criaturas */
  console.error(chalk.red("las criaturas tiene que tener fuerza y vida"));    
  exit(1)
}
const path = './usuarios/' + argv.user
/**@constant path si no existe el direcotrio lo creamos */
if(!fs.existsSync(path))
{
    try{
        fs.mkdirSync(path,{recursive: true});
    }
    catch(error)
    {
        console.error('directorio no creado')
        exit(1)
    }
}
/**@constant filename la ruta del archivo */
const filename = argv.nombre + '.json'
const pathfile= path + '/' +filename
//criatura
let estadistica:number[];
let estadistica_apropiada:stats;
let Cartas;
let CartasGenericas;
let Carta_Planeswalker; 
let jsonData="";
if(argv.estadistica !== undefined)
{
   estadistica=JSON.parse(String(argv.estadistica))
   estadistica_apropiada=[estadistica[0],estadistica[1]]
   Cartas = new Carta_Criatura(Number(argv.id),String(argv.nombre),Number(argv.coste),String(argv.color),String(argv.tipo),String(argv.rareza),String(argv.texto),Number(argv.valor),estadistica_apropiada);
   jsonData=JSON.stringify(Cartas)
}
else
   if(argv.lealtad !== undefined)
   {
      Carta_Planeswalker = new Cartas_Planeswalker(Number(argv.id),String(argv.nombre),Number(argv.coste),String(argv.color),String(argv.tipo),String(argv.rareza),String(argv.texto),Number(argv.valor),Number(argv.lealtad))
      jsonData=JSON.stringify(Carta_Planeswalker)
   }
   else
   {
      CartasGenericas = new Carta(Number(argv.id),String(argv.nombre),Number(argv.coste),String(argv.color),String(argv.tipo),String(argv.rareza),String(argv.texto),Number(argv.valor))
      jsonData=JSON.stringify(CartasGenericas)
   }
if(!fs.existsSync(pathfile))
{
        fs.writeFileSync(pathfile,jsonData)
        console.log(chalk.green("se ha creado la carta correctamente"))  
}else
{
   console.error(chalk.red('directorio no creado'));
   exit(1);  
}
}
// Listar 
/**@constant argvlist1 lo usaremos en caso de recibir un parametro list */
if(argvlist1._[2] === "list")
{
    const path="./usuarios/" + argvlist1.user;
    /**@constant archivos son los contenidos del directorio creado anteriormente */
    const archivos =fs.readdirSync(path);
    archivos.forEach(archivo =>{
      const contenido = fs.readFileSync(path+'/'+archivo).toString()
      const datos=JSON.parse(contenido);
      //Imprimir por pantalla
      console.log(chalk.yellow("---------------------------------"))
       console.log(chalk.yellow("ID: ", datos.id))
       console.log(chalk.yellow("Nombre: ", datos.nombre))
       console.log(chalk.yellow("Coste: ", datos.coste))
       console.log(chalk.yellow("Color: ", datos.color))
       console.log(chalk.yellow("Tipo: ", datos.tipo))
       console.log(chalk.yellow("Rareza: ", datos.rareza))
       console.log(chalk.yellow("Texto: ", datos.texto))
       console.log(chalk.yellow("Valor: ", datos.valor))
       if(datos.fuerza !== undefined && datos.vida !== undefined)
       {
         console.log(chalk.yellow("Fuerza ", datos.fuerza))
         console.log(chalk.yellow("Vida: ", datos.vida))
       }
       if(datos.lealtad !== undefined)
         console.log(chalk.yellow("Lealtad: ", datos.lealtad))
    })
}

//Mostrar la coleccion de cartas
/**@constant argvsearch1 lo ultlizaremos en el caso de querer buscar un archivo */
if(argvsearch1._[2] === "search")
{
    const path="./usuarios/" + argvsearch1.user;
    const archivos =fs.readdirSync(path);
    let encontrado:boolean=false;
    archivos.forEach(archivo =>{
      const contenido = fs.readFileSync(path+'/'+archivo).toString()
      const datos=JSON.parse(contenido);
      if(datos.id === argvsearch1.id)
      {
      //Imprimir por pantalla
      console.log(chalk.green("Se ha encontrado la carta"))
      encontrado=true
      console.log(chalk.yellow("---------------------------------"))
       console.log(chalk.yellow("ID: ", datos.id))
       console.log(chalk.yellow("Nombre: ", datos.nombre))
       console.log(chalk.yellow("Coste: ", datos.coste))
       console.log(chalk.yellow("Color: ", datos.color))
       console.log(chalk.yellow("Tipo: ", datos.tipo))
       console.log(chalk.yellow("Rareza: ", datos.rareza))
       console.log(chalk.yellow("Texto: ", datos.texto))
       console.log(chalk.yellow("Valor: ", datos.valor))
       if(datos.fuerza !== undefined && datos.vida !== undefined)
       {
         console.log(chalk.yellow("Fuerza ", datos.fuerza))
         console.log(chalk.yellow("Vida: ", datos.vida))
       }
       if(datos.lealtad !== undefined)
         console.log(chalk.yellow("Lealtad: ", datos.lealtad))
      }
    })
    if(!encontrado)
      {
         console.error(chalk.red("Carta no encontrada"))
         exit(1)
      }
}

//Eliminar una carta
/**@constant los usaremos en el caso de querer eliminar un fichero */
if(argvdelete1._[2] === "delete")
{

  const path = './usuarios/' + argvdelete1.user 
  const archivos =fs.readdirSync(path);
  let encontrado:boolean=false;
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
   if(!encontrado)
   {
      console.error(chalk.red("Carta no encontrada"))
      exit(1)
   }
}


/**@constant argvmod1 lo usaremos en el caso de querer modificar uno de los archivos anteriores */
if(argvmod1._[2] === "modify")
{
  const path = './usuarios/' + argvmod1.user
  const archivos =fs.readdirSync(path);
  let encontrado:boolean = false;
 
  archivos.forEach(archivo =>{
   const contenido = fs.readFileSync(path+'/'+archivo).toString()
   const datos=JSON.parse(contenido);     
    if(argvmod1.idmod === datos.id)
    {
      encontrado=true;
      //Comprobamos que sea definido y se ha modificado
      if (argvmod1.id !== undefined) {
         datos.id = argvmod1.id;
      }
     if (argvmod1.nombre !== undefined) {
         datos.nombre = argvmod1.nombre;
      }
     if (argvmod1.coste !== undefined) {
         datos.coste = argvmod1.coste;
      }
     if (argvmod1.color !== undefined) {
         datos.color = argvmod1.color;
      }
     if (argvmod1.tipo !== undefined) {
         datos.tipo = argvmod1.tipo;
      }
     if (argvmod1.rareza !== undefined) {
         datos.rareza = argvmod1.rareza;
      }
     if (argvmod1.texto !== undefined) {
         datos.texto = argvmod1.texto;
      }
     if (argvmod1.valor !== undefined) {
         datos.valor = argvmod1.valor;
      }
     if (argvmod1.estadistica !== undefined && datos.estadistica !== undefined) {
         datos.estadistica = argvmod1.estadistica;
      }
     if (argvmod1.lealtad !== undefined && datos.lealtad !== undefined) {
         datos.lealtad = argvmod1.lealtad;
      }
     fs.writeFileSync(path+'/'+archivo,JSON.stringify(datos));
     console.log(chalk.green("se ha modificado la carta correctamente"))
    }
  })
  /**@var encontrado en caso de no encotrar el fichero buscado devovemos error */
  if(!encontrado)
     console.error(chalk.red('Carta no encontrada'));
}

