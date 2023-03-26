let Math = require("./../Math");
describe("My falsy test suite", () => {
  test("checking null", () => {
    //test can also be written as it
    let a = null;
    expect(a).toBeNull(); //its like if statement..this line alone
    expect(a).toBeFalsy(); //it is also called as assertion
    expect(a).toBeUndefined(); //this line will show failed
  });
  test("sum method,", () => {
    expect(Math.sum(3, 4)).toBe(7);
  });
});
