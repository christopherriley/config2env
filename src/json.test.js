const InvalidContentError = require('./errors');
const UnsupportedContentError = require('./errors');
const GenerateJson = require('./json');


describe('basic json', () => {
    const input = `
        {
            "name": "chris",
            "age": 27,
            "gpa": 3.84
        }
`;
    const m = GenerateJson(input);

    expect(m.size).toBe(3);

    test('name', () => {
        check(m, 'name', 'chris');
    });

    test('age', () => {
        check(m, 'age', '27');
    });

    test('gpa', () => {
        check(m, 'gpa', '3.84');
    });
});

describe('nested json', () => {
    const input = `
        {
            "version": {
                "windows": 1.21,
                "linux": 1.22,
                "macos": 1.23
            }
        }
`;

    const m = GenerateJson(input);

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

describe('json with array', () => {
    const input = `
        {
            "something": {
                "a": [1,2,3]
            }
        }
`;

    test('should throw unsupported content error', () => {
        expect(() => GenerateJson(input)).toThrow(UnsupportedContentError);
    });
});

describe('plain text', () => {
    const input = `this is just some plain unstructured text.`;

    test('should throw invalid content error', () => {
        expect(() => GenerateJson(input)).toThrow(InvalidContentError);
    });
});

function check(m, k, v) {
    expect(m.has(k)).toBe(true);
    expect(m.get(k)).toBe(v);
}
