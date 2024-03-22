import { Carta } from "./Carta.js";
class Carta_Criatura extends Carta {
    ID;
    nombre;
    coste;
    color;
    tipo;
    rareza;
    texto;
    valor;
    estadistica;
    constructor(ID, nombre, coste, color, tipo, rareza, texto, valor, estadistica) {
        super(ID, nombre, coste, color, tipo, rareza, texto, valor);
        this.ID = ID;
        this.nombre = nombre;
        this.coste = coste;
        this.color = color;
        this.tipo = tipo;
        this.rareza = rareza;
        this.texto = texto;
        this.valor = valor;
        this.estadistica = estadistica;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            fuerza: this.estadistica[0],
            vida: this.estadistica[1]
        };
    }
}
export { Carta_Criatura };
