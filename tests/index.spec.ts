import "mocha"
import yargs from "yargs"
import {expect} from "chai"
import{execSync} from "child_process"
describe('Comprobamos que funciona la gestion de fichero',() =>{
    execSync('tsc')
    it('añadimos una carta a la coleccion',() =>{
        const comando = `node --experimental-modules dist/index.js add --user tests --id 99 --nombre "prueba" --coste 20 --color "azul" --tipo "Criatura" --rareza "comun" --texto "carta de prueba" --valor 10 --estadistica [2,3]`;


    // Ejecución del comando
    const resultado = execSync(comando).toString().trim();
     
    })
    it('añadimos una carta a la coleccion',() =>{
        const comando = `node --experimental-modules dist/index.js add --user tests --id 99 --nombre "prueba" --coste 20 --color "azul" --tipo "Encantamiento" --rareza "comun" --texto "carta de prueba" --valor 10`;


    // Ejecución del comando
    const resultado = execSync(comando).toString().trim();
     
    })
    it('Mostrar las cartas de la coleccion',() =>{
        const comando = `node --experimental-modules dist/index.js list --user tests `;


        // Ejecución del comando
        const resultado = execSync(comando).toString().trim();      
    })
    it('Buscar  una carta de la coleccion',() =>{
        const comando = `node --experimental-modules dist/index.js search --user tests --id 99`;


        // Ejecución del comando
        const resultado = execSync(comando).toString().trim();      
    })

    it('Modificar  una carta de la coleccion',() =>{
        const comando = `node --experimental-modules dist/index.js modify --user tests --idmod 99 --texto "texto modificado"`;


        // Ejecución del comando
        const resultado = execSync(comando).toString().trim();      
    })
    it('Eliminar  una carta de la coleccion',() =>{
        const comando = `node --experimental-modules dist/index.js delete --user tests --id 99`;


        // Ejecución del comando
        const resultado = execSync(comando).toString().trim();      
    })
})