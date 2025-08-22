import { describe, expect, test } from "vitest";
import InvalidContentError from './errors.js';
import UnsupportedContentError from './errors.js';
import GenerateYaml from './yaml.js';


describe('basic yaml', () => {
    const input = `
        name: "chris"
        age: 27
        gpa: 3.84
`;
    const m = GenerateYaml(input, "test_prefix");

    expect(m.size).toBe(3);

    test('name', () => {
        check(m, 'test_prefix_name', 'chris');
    });

    test('age', () => {
        check(m, 'test_prefix_age', '27');
    });

    test('gpa', () => {
        check(m, 'test_prefix_gpa', '3.84');
    });
});

describe('nested yaml', () => {
    const input = `
        version:
            windows: 1.21
            linux: 1.22
            macos: 1.23
`;

    const m = GenerateYaml(input);

    expect(m.size).toBe(3);

    test('windows version', () => {
        check(m, 'version_windows', '1.21');
    });

    test('linux version', () => {
        check(m, 'version_linux', '1.22');
    });

    test('macos version', () => {
        check(m, 'version_macos', '1.23');
    });
});

describe('yaml with array', () => {
    const input = `
        something:
            a:
            - item1
            - item2
            - item3
`;

    test('should throw unsupported content error', () => {
        expect(() => GenerateYaml(input)).toThrow(UnsupportedContentError);
    });
});

describe('invalid test', () => {
    const input = `this is just some plain unstructured text.`;

    test('should throw invalid content error', () => {
        expect(() => GenerateYaml(input)).toThrow(InvalidContentError);
    });
});

function check(m, k, v) {
    expect(m.has(k), `key '${k}' is not in the map`).toBe(true);
    expect(m.get(k), `key: ${k}`).toBe(v);
}
