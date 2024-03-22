
enum Color { blanco,azul,negro,rojo,verde,incoloro,multicolor}

enum Tipo {Encantamiento,Tierra,Criatura,Conjuro,Instantaneo,Artefacto,Planeswalker}

enum Rareza {comun, infrecuente, rara , mitica}

interface Carta_interface
{
  ID:number;
  coste:number;
  color:string;
  tipo:string;
  rareza:string;
  texto:string;
  valor:number;
}


class Carta implements Carta_interface
{
  constructor(public ID:number,public nombre:string,public coste:number,public color:string,public tipo:string,public rareza:string,public texto:string,public valor:number)
  {
    if(!(color in Color))
       throw new Error(`El color '${color}' no existe`);
    if(!(tipo in Tipo))
       throw new Error(`El tipo '${tipo}' no existe`);
    if(!(rareza in Rareza))
    throw new Error(`La rareza '${rareza}' no existe`);
  }
  toJSON()
  {
    return{
      id: this.ID,
      nombre: this.nombre,
      coste: this.coste,
      color: this.color,
      tipo: this.tipo,
      rareza: this.rareza,
      texto: this.texto,
      valor: this.valor
    }
  }
}


export{Carta,Carta_interface,Color,Tipo,Rareza}