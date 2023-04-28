const { MarkovMachine } = require("./markov");

// test that it makes a map data scructure
// test that it returns any string

describe("MarkovMachine should create random text", () => {
  let mm;
  beforeAll(() => {
    mm = new MarkovMachine("the cat in the hat the cat in the hat");
  });
  test("makeChains should create a non-empty map", () => {
    mm.makeChains();
    expect(mm.chains.size).toBeGreaterThan(0);
  });
  test("MarkovMachine should return a string", () => {
    mm.makeChains();
    const result = mm.makeText((numWords = 100));
    expect(result).toEqual(expect.any(String));
  });
});
