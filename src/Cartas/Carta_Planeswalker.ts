import { Carta } from "./Carta.js";


class Cartas_Planeswalker extends Carta
{
    constructor(public ID:number,public nombre:string,public coste:number,public color:string,public tipo:string,public rareza:string,public texto:string,public valor:number,public lealtad:number)
    {
        super(ID,nombre,coste,color,tipo,rareza,texto,valor)
    }       
    toJSON() {
        return {
            ...super.toJSON(),   
            lealtad: this.lealtad
        }     
    }
}

export {Cartas_Planeswalker}