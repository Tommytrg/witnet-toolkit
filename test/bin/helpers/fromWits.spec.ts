import { describe, expect, it } from "vitest"
import { fromWits } from "../../../src/bin/helpers"

describe("fromWits", () => {
	it("should correctly multiply by 10^9 and floor the result", () => {
		expect(fromWits(1.23456789)).toBe(1234567890)
		expect(fromWits(0.000000001)).toBe(1)
		expect(fromWits(0.9999999999)).toBe(999999999)
	})

	it("should handle integer inputs correctly", () => {
		expect(fromWits(2)).toBe(2000000000)
		expect(fromWits(100)).toBe(100000000000)
	})

	it("should work with string inputs", () => {
		expect(fromWits("3.141592653")).toBe(3141592653)
		expect(fromWits("0.123456789")).toBe(123456789)
	})

	it("should return 0 for values too small to be floored", () => {
		expect(fromWits("0.0000000001")).toBe(0)
		expect(fromWits(0.0000000001)).toBe(0)
	})

	it("should handle negative values correctly", () => {
		expect(fromWits(-1.5)).toBe(-1500000000)
		expect(fromWits("-0.999999999")).toBe(-999999999)
	})

	it("should handle edge cases without breaking", () => {
		expect(fromWits(0)).toBe(0)
		expect(fromWits("0")).toBe(0)
		expect(fromWits(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY)
		expect(fromWits(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY)
		expect(fromWits("NaN")).toBeNaN()
		expect(fromWits(Number.NaN)).toBeNaN()
	})
})
