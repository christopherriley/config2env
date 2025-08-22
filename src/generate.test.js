import { describe, expect, test } from "vitest";
import { GenerateFromContent } from './generate.js';


describe('GenerateFromContent', () => {
    const input = `
        {
            "name": "chris",
            "age": 27,
            "gpa": 3.84
        }
`;
    describe('key selection', () => {
        const m = GenerateFromContent(input, "test_prefix", ["name"]);

        expect(m.size).toBe(1);

        test('name', () => {
            check(m, 'test_prefix_name', 'chris');
        });
    });
});

function check(m, k, v) {
    expect(m.has(k), `key '${k}' is not in the map`).toBe(true);
    expect(m.get(k), `key: ${k}`).toBe(v);
}
