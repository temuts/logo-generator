const logoGenerator = require("./shapes.js");

describe("logoGenerator", ()=> {
    test("should generate a circle", ()=>{
        const newCircle = new logoGenerator("abc", "pink", "circle", "black");
        expect(newCircle.render()).toEqual(`<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg"><circle cx="150" cy="100" r="80" fill="black" /><text x="150" y="125" font-size="60" text-anchor="middle" fill="pink">abc</text></svg>`)
    });
    test("should generate a triangle", ()=>{
        const newTriangle = new logoGenerator("abc", "pink", "triangle", "black");
        expect(newTriangle.render()).toEqual(`<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg"><circle cx="150" cy="100" r="80" fill="black" /><text x="150" y="125" font-size="60" text-anchor="middle" fill="pink">abc</text></svg>`)
    });
})