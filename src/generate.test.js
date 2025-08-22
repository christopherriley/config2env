import { describe, expect, test } from "vitest";
import { GenerateFromContent } from './generate.js';
import { AppError } from "./errors.js";


describe('GenerateFromContent', () => {
    describe('json', () => {
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

    describe('yaml', () => {
        const input = `
            version:
                windows: 1.21
                linux: 1.22
                macos: 1.23
`;

        describe('json format specified', () => {
            test('should throw', () => {
                expect(() => GenerateFromContent(input, "", "", "json")).toThrow(AppError);
            });
        });

        describe('yaml format specified', () => {
            const m = GenerateFromContent(input, "test_prefix", ["version_windows"], "yaml");

            test('should succeed', () => {
                expect(m.size).toBe(1);
                check(m, 'test_prefix_version_windows', '1.21');
            });
        });
    });
});

function check(m, k, v) {
    expect(m.has(k), `key '${k}' is not in the map`).toBe(true);
    expect(m.get(k), `key: ${k}`).toBe(v);
}
