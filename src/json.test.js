const GenerateJson = require('./json');

const inputJsonSimple = `
{
	"name": "chris",
	"age": 27,
	"gpa": 3.84
}
`;

const inputJsonNested = `
{
	"version": {
		"windows": 1.21,
		"linux": 1.22,
		"macos": 1.23
	}
}
`;

describe('basic json', () => {
    const m = GenerateJson(inputJsonSimple);

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
    const m = GenerateJson(inputJsonNested);

    expect(m.size).toBe(3);

    test('windows version', () => {
        check(m, 'version_windows', '1.21');
    });

    test('linux version', () => {
        check(m, 'version_linux', '1.22');
    });

    test('windows version', () => {
        check(m, 'version_macos', '1.23');
    });
});

function check(m, k, v) {
    expect(m.has(k)).toBe(true);
    expect(m.get(k)).toBe(v);
}
