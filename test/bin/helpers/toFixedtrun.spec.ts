import { describe, it, expect } from 'vitest';
import { toFixedTrunc } from '../../../src/bin/helpers'; // Adjust the path as needed

describe('toFixedTrunc', () => {
    it('should truncate without rounding', () => {
        expect(toFixedTrunc(1.235, 2)).toBe("1.23");
        expect(toFixedTrunc(1.239, 2)).toBe("1.23");
        expect(toFixedTrunc(-1.2999, 2)).toBe("-1.29");
    });

    it('should pad with zeros when needed', () => {
        expect(toFixedTrunc(1.2, 4)).toBe("1.2000");
        expect(toFixedTrunc(10, 3)).toBe("10.000");
    });

    it('should return only the integer part when number of decimals <= 0', () => {
        expect(toFixedTrunc(123.456, 0)).toBe("123");
        expect(toFixedTrunc(-99.99, 0)).toBe("-99");
    });

    it('should handle cases without decimal points', () => {
        expect(toFixedTrunc(100, 2)).toBe("100.00");
        expect(toFixedTrunc(42, 5)).toBe("42.00000");
    });

    it('should work with string inputs', () => {
        expect(toFixedTrunc("3.14159", 3)).toBe("3.141");
        expect(toFixedTrunc("2.9", 1)).toBe("2.9");
    });

    it('should work with large numbers', () => {
        expect(toFixedTrunc(987654.321, 2)).toBe("987654.32");
        expect(toFixedTrunc(1e6, 3)).toBe("1000000.000");
    });
});
