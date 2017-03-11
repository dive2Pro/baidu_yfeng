import * as utils from "./utils";

describe("test utils function", () => {
  test("unique id", () => {
    const uuid = utils.guid();
    expect(uuid).toMatch(/[\-]\w{4,12}/);
  });

  test("moveElementInArray function width number", () => {
    const arr = [2, 3, 5, 7, 1];
    const changePosition = 2;
    const changeValue = 5;
    const expectArr = [2, 3, 7, 1, 5];
    const receive = utils.moveElementInArray(arr, changeValue, changePosition);
    expect(receive).toEqual(expectArr);
  });

  test("moveElementInArray function width string", () => {
    const arr = ["2", "3", "5", "7", "1"];
    const changePosition = 2;
    const changeValue = "5";
    const expectArr = ["2", "3", "7", "1", "5"];
    const receive = utils.moveElementInArray(arr, changeValue, changePosition);
    expect(receive).toEqual(expectArr);
  });

  test("moveElementInArray function width object", () => {
    //todo
    const arr = [{ a: "2" }, { b: "3" }, { c: "5" }, { d: "7" }, { e: "1" }];
    const changePosition = 2;
    const changeValue = { c: "5" };
    const expectArr = [
      { a: "2" },
      { b: "3" },
      { d: "7" },
      { e: "1" },
      { c: "5" }
    ];
    const receive = utils.moveElementInArray(arr, changeValue, changePosition);
    // expect(receive).toEqual(expectArr);
  });
  test("debounce function", done => {
    let i = 0;
    function test() {
      i++;
    }
    for (let k = 0; k < 10; k++) {
      utils.debounce()(test);
    }
    expect(i).toBe(1);
    done();
  });
});
