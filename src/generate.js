import fs from 'fs';
import GenerateJson from './json.js';
import GenerateYaml from './yaml.js';
import GenerateProps from './properties.js';
import { AppError, InvalidContentError } from './errors.js';

export function GenerateFromFile(f, prefix, includeKeys, format) {
    let fileContent = '';

    try {
        fileContent = fs.readFileSync(f, 'utf8');
    } catch (err) {
        throw new AppError(`failed to read config file '${f}': ${err}`);
    }

    return GenerateFromContent(fileContent, prefix, includeKeys, format);
}

export function GenerateFromContent(c, prefix, includeKeys, format='') {
    let generators = [];

    if (format == undefined || format.trim() == '') {
        generators = [
            GenerateJson,
            GenerateYaml,
            GenerateProps
        ];
    } else {
        format = format.toUpperCase().trim();

        if (format == 'JSON') {
            generators = [
                GenerateJson
            ];
        } else if (format == 'YAML' || format == 'YML') {
            generators = [
                GenerateYaml
            ];
        } else if (format == 'PROP' || format == 'PROPS' || format == 'PROPERTIES') {
            generators = [
                GenerateProps
            ];
        } else {
            throw new AppError(`invalid config file format: ${format}`);
        }
    }

    for (const generate of generators) {
        try {
            let envMap = generate(c, prefix);
            if (includeKeys != undefined && includeKeys.length > 0) {
                let filteredEnvMap = new Map();
                for (const key of includeKeys) {
                    let k = key.trim();
                    if (prefix.length > 0) {
                        k = prefix + "_" + k;
                    }

                    const val = envMap.get(k);
                    if (val != undefined) {
                        filteredEnvMap.set(k, val);
                    }
                }
                return filteredEnvMap;
            }

            return envMap;
        } catch (err) {
            if (err instanceof AppError) {
                if (!(err instanceof InvalidContentError)) {
                    throw new AppError(`failed to process content: ${err}`);
                }
            } else {
                throw err;
            }
        }
    }

    throw new AppError('content could not be processed with any method');
}
