import * as React from "react";
import { rand } from "./rand";

describe("rand function", () => {
  it("provides some seeded pseudo random numbers", () => {
    // Since this is a seeded prng, this test should always pass.
    const results = Array.from({length: 10}, () => rand(0, 100));
    expect(results).toEqual([20, 66, 50, 88, 100, 75, 97, 93, 11, 78]);
  });
  it("provides the limits of the high-low range", () => {
    // As it happens, this particular seed covers the range of requested values
    // in the first two calls.
    expect(rand(0, 1)).toEqual(1);
    expect(rand(0, 1)).toEqual(0);
  });
});