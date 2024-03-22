var Color;
(function (Color) {
    Color[Color["blanco"] = 0] = "blanco";
    Color[Color["azul"] = 1] = "azul";
    Color[Color["negro"] = 2] = "negro";
    Color[Color["rojo"] = 3] = "rojo";
    Color[Color["verde"] = 4] = "verde";
    Color[Color["incoloro"] = 5] = "incoloro";
    Color[Color["multicolor"] = 6] = "multicolor";
})(Color || (Color = {}));
var Tipo;
(function (Tipo) {
    Tipo[Tipo["Encantamiento"] = 0] = "Encantamiento";
    Tipo[Tipo["Tierra"] = 1] = "Tierra";
    Tipo[Tipo["Criatura"] = 2] = "Criatura";
    Tipo[Tipo["Conjuro"] = 3] = "Conjuro";
    Tipo[Tipo["Instantaneo"] = 4] = "Instantaneo";
    Tipo[Tipo["Artefacto"] = 5] = "Artefacto";
    Tipo[Tipo["Planeswalker"] = 6] = "Planeswalker";
})(Tipo || (Tipo = {}));
var Rareza;
(function (Rareza) {
    Rareza[Rareza["comun"] = 0] = "comun";
    Rareza[Rareza["infrecuente"] = 1] = "infrecuente";
    Rareza[Rareza["rara"] = 2] = "rara";
    Rareza[Rareza["mitica"] = 3] = "mitica";
})(Rareza || (Rareza = {}));
class Carta {
    ID;
    nombre;
    coste;
    color;
    tipo;
    rareza;
    texto;
    valor;
    constructor(ID, nombre, coste, color, tipo, rareza, texto, valor) {
        this.ID = ID;
        this.nombre = nombre;
        this.coste = coste;
        this.color = color;
        this.tipo = tipo;
        this.rareza = rareza;
        this.texto = texto;
        this.valor = valor;
        if (!(color in Color))
            throw new Error(`El color '${color}' no existe`);
        if (!(tipo in Tipo))
            throw new Error(`El tipo '${tipo}' no existe`);
        if (!(rareza in Rareza))
            throw new Error(`La rareza '${rareza}' no existe`);
    }
    toJSON() {
        return {
            id: this.ID,
            nombre: this.nombre,
            coste: this.coste,
            color: this.color,
            tipo: this.tipo,
            rareza: this.rareza,
            texto: this.texto,
            valor: this.valor
        };
    }
}
export { Carta, Color, Tipo, Rareza };
