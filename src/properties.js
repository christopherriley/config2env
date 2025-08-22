import { getProperties } from 'properties-file';
import { InvalidContentError, UnsupportedContentError } from './errors.js';

function generateProps(inputObj, prefix) {
    let envMap = new Map();

    if (inputObj == undefined || inputObj == null) {
        throw new InvalidContentError("invalid content");
    }

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
            envMap = new Map([...envMap, ...generateProps(v, name)]);
        }
    }

    return envMap;
}

export default function GenerateProps(rawProps, prefix = '')  {
    let rawPropsObject = Object;

    try {
        rawPropsObject = getProperties(rawProps);
    } catch (err) {
        throw new InvalidContentError('failed to parse properties: ' + err.message);
    }

    if (rawPropsObject == null || rawPropsObject == undefined || typeof rawPropsObject == 'string') {
        throw new InvalidContentError(`failed to parse properties`);
    }

    return generateProps(rawPropsObject, prefix);
}
