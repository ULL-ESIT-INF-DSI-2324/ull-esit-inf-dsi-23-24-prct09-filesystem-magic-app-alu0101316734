# Practica Aplicacion coleccionista de Magic

 __funcionamiento:__ `node --experimental-modules dist/index.js [comando] [opciones del comando]`

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

La clase su principalfuncion es almacenar los atributos pasados por constructor y una vez hecho esto definir un `toJSON` 