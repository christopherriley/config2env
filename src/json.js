import { InvalidContentError, UnsupportedContentError } from './errors.js';

function generateJson(inputObj, prefix) {
    let envMap = new Map();

	if (prefix.length > 0) {
		prefix = prefix + "_";
	}

    const m = new Map(Object.entries(inputObj));

    for (const [k, v] of m) {
        const name = prefix + k;

        if (v instanceof Array) {
            throw new UnsupportedContentError('key \'' + name + '\': arrays are not supported')
        } else if (typeof v == "string") {
            envMap.set(name,  v);
        } else if (typeof v == "number") {
            envMap.set(name,  "" + v);
        } else if (typeof v == "object") {
            envMap = new Map([...envMap, ...generateJson(v, name)]);
        }
    }

    return envMap;
}

export default function GenerateJson(rawJson, prefix)  {
    let rawJsonObject = Object;

    try {
        rawJsonObject = JSON.parse(rawJson);
    } catch(error) {
        throw new InvalidContentError('failed to parse JSON: ' + error);
    }

    return generateJson(rawJsonObject, prefix);
}
