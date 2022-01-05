import {isPasswordValid} from "../passwordValidation";

describe("passwordValidation", ()=>{
    it("should contain at least one digit", ()=>{
        expect(isPasswordValid("aBcdefg8")).toBeTruthy()
        expect(isPasswordValid("aBcdefge")).toBeFalsy()
    })
    it("should contain at least one lower case", ()=>{
        expect(isPasswordValid("aBcdefg8")).toBeTruthy()
        expect(isPasswordValid("ABCDEFG8")).toBeFalsy()
    })
    it("should contain at least one upper case", ()=>{
        expect(isPasswordValid("aBcdefg8")).toBeTruthy()
        expect(isPasswordValid("abcdefg8")).toBeFalsy()
    })
    it("should contain at least 8 from [a-zA-Z0-9]", ()=>{
        expect(isPasswordValid("aBcdef78")).toBeTruthy()
        expect(isPasswordValid("aBcdef7")).toBeFalsy()
        expect(isPasswordValid("aB7%%%%%%")).toBeFalsy()
    })
})