import fs from 'fs';
import GenerateJson from './json.js';
import GenerateYaml from './yaml.js';
import { AppError, InvalidContentError } from './errors.js';

export function GenerateFromFile(f, prefix) {
    let fileContent = '';

    try {
        fileContent = fs.readFileSync(f, 'utf8');
    } catch (err) {
        throw new AppError(`failed to read config file '${f}': ${err}`);
    }

    return GenerateFromContent(fileContent, prefix);
}

function GenerateFromContent(c, prefix) {
    const generators = [
        GenerateJson,
        GenerateYaml
    ];

    for (const generate of generators) {
        try {
            return generate(c, prefix);
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
