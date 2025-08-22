import YAML from 'yaml'
import { InvalidContentError, UnsupportedContentError } from './errors.js';

function generateYaml(inputObj, prefix) {
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
            envMap = new Map([...envMap, ...generateYaml(v, name)]);
        }
    }

    return envMap;
}

export default function GenerateYaml(rawYaml, prefix = '')  {
    let rawYamlObject = Object;

    try {
        rawYamlObject = YAML.parse(rawYaml);
    } catch (err) {
        throw new InvalidContentError('failed to parse JSON: ' + err.message);
    }

    if (rawYamlObject == null || rawYamlObject == undefined || typeof rawYamlObject == 'string') {
        throw new InvalidContentError(`failed to parse Yaml`);
    }

    return generateYaml(rawYamlObject, prefix);
}
