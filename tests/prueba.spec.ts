import "mocha"
import { expect } from "chai"
import {add} from "../src/prueba.js"


describe('prueba',()=>{
    it('prueba',() =>{
        expect(add(5,2)).to.be.equal(7);
    })
})