import { Carta } from "./Carta.js";
declare class Cartas_Planeswalker extends Carta {
    ID: number;
    nombre: string;
    coste: number;
    color: string;
    tipo: string;
    rareza: string;
    texto: string;
    valor: number;
    lealtad: number;
    constructor(ID: number, nombre: string, coste: number, color: string, tipo: string, rareza: string, texto: string, valor: number, lealtad: number);
    toJSON(): {
        lealtad: number;
        id: number;
        nombre: string;
        coste: number;
        color: string;
        tipo: string;
        rareza: string;
        texto: string;
        valor: number;
    };
}
export { Cartas_Planeswalker };
