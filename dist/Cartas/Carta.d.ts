declare enum Color {
    blanco = 0,
    azul = 1,
    negro = 2,
    rojo = 3,
    verde = 4,
    incoloro = 5,
    multicolor = 6
}
declare enum Tipo {
    Encantamiento = 0,
    Tierra = 1,
    Criatura = 2,
    Conjuro = 3,
    Instantaneo = 4,
    Artefacto = 5,
    Planeswalker = 6
}
declare enum Rareza {
    comun = 0,
    infrecuente = 1,
    rara = 2,
    mitica = 3
}
interface Carta_interface {
    ID: number;
    coste: number;
    color: string;
    tipo: string;
    rareza: string;
    texto: string;
    valor: number;
}
declare class Carta implements Carta_interface {
    ID: number;
    nombre: string;
    coste: number;
    color: string;
    tipo: string;
    rareza: string;
    texto: string;
    valor: number;
    constructor(ID: number, nombre: string, coste: number, color: string, tipo: string, rareza: string, texto: string, valor: number);
    toJSON(): {
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
export { Carta, Carta_interface, Color, Tipo, Rareza };
