let Math = require("./Math");
// first npm i jest --save-dev
// package.json->scripts->test:jest
// create test ->unit folder->index.spec.js
// eg./->
describe("My falsy test suite", () => {
  let totalSum = 0;
  beforAll(() => {
    console.log("this will execute only once\nbefore all");
  });
  beforeEach(() => {
    totalSum = 0;
    console.log("before each");
  });
  afterEach(() => {
    console.log("executed every line");
  });
  afterAll(() => {});
  test("checking null", () => {
    //test can also be written as it
    let a = null;
    except(a).toBeNull(); //its like if statement..this line alone
    except(a).toBeFalsy(); //it is also called as assertion
    except(a).toBeUndefined();
  });
  test("sum method,", () => {
    expect(Math.sum(3, 4)).toBe(7);
  });
});
//to run this
