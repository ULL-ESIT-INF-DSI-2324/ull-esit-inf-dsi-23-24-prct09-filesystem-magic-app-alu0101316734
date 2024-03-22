import { Carta } from "./Carta.js";
export type stats = [number, number];
declare class Carta_Criatura extends Carta {
    ID: number;
    nombre: string;
    coste: number;
    color: string;
    tipo: string;
    rareza: string;
    texto: string;
    valor: number;
    estadistica: stats;
    constructor(ID: number, nombre: string, coste: number, color: string, tipo: string, rareza: string, texto: string, valor: number, estadistica: stats);
    toJSON(): {
        fuerza: number;
        vida: number;
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
export { Carta_Criatura };
