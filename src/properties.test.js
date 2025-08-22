import { describe, expect, test } from "vitest";
import { InvalidContentError, UnsupportedContentError } from './errors.js';
import GenerateProps from './properties.js';


describe('properties', () => {
    describe('simple', () => {
        const input = `
            # a comment
            ! another comment

            name = chris
            age=27

            gpa = 3.84
            height: 6
`;
        const m = GenerateProps(input, "test_prefix");

        expect(m.size).toBe(4);

        test('name', () => {
            check(m, 'test_prefix_name', 'chris');
        });

        test('age', () => {
            check(m, 'test_prefix_age', '27');
        });

        test('gpa', () => {
            check(m, 'test_prefix_gpa', '3.84');
        });

        test('height', () => {
            check(m, 'test_prefix_height', '6');
        });
    });
});

function check(m, k, v) {
    expect(m.has(k), `key '${k}' is not in the map`).toBe(true);
    expect(m.get(k), `key: ${k}`).toBe(v);
}
