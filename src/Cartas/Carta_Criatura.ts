import { Carta } from "./Carta.js";

export type stats = [number,number]


class Carta_Criatura extends Carta
{
    constructor(public ID:number,public nombre:string,public coste:number,public color:string,public tipo:string,public rareza:string,public texto:string,public valor:number,public estadistica:stats)
    {
        super(ID,nombre,coste,color,tipo,rareza,texto,valor)
    }    
    toJSON()
    {
      return {
         ...super.toJSON(),
         fuerza: this.estadistica[0],
         vida: this.estadistica[1]
      }
    }
}

export {Carta_Criatura}