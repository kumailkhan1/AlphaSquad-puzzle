
const assignNumber = require("./assignNumber");


//checking function for positive values
describe("AssignNumber function exception test",()=>{
    it("should not throw an exception",()=>{
        expect(
            ()=>assignNumber(1)
        ).not.toThrow("Function Worked!")
    })
});

//checking function for negative values
describe("AssignNumber function exception test",()=>{
    it("should throw an exception",()=>{
        expect(
            ()=>assignNumber(-1)
        ).toThrow()
    })
});