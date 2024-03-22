import { Carta } from "./Carta.js";
class Cartas_Planeswalker extends Carta {
    ID;
    nombre;
    coste;
    color;
    tipo;
    rareza;
    texto;
    valor;
    lealtad;
    constructor(ID, nombre, coste, color, tipo, rareza, texto, valor, lealtad) {
        super(ID, nombre, coste, color, tipo, rareza, texto, valor);
        this.ID = ID;
        this.nombre = nombre;
        this.coste = coste;
        this.color = color;
        this.tipo = tipo;
        this.rareza = rareza;
        this.texto = texto;
        this.valor = valor;
        this.lealtad = lealtad;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            lealtad: this.lealtad
        };
    }
}
export { Cartas_Planeswalker };
