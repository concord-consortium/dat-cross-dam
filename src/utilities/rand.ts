import * as seedrandom from "seedrandom";

const randomNumberGenerator = seedrandom("12345");

export function rand(low: number, high: number): number {
  return Math.floor(randomNumberGenerator() * (high - low + 1) + low);
}
