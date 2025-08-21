import fs from 'fs';
import GenerateJson from './json.js';
import { InvalidContentError } from './errors.js';

export function GenerateFromFile(f) {
    let fileContent = '';

    try {
        fileContent = fs.readFileSync(f, 'utf8');
    } catch (err) {
        throw new Error(`failed to read config file '${f}': ${err}`);
    }

    return GenerateFromContent(fileContent);
}

function GenerateFromContent(c) {
    try {
        return GenerateJson(c);
    } catch (err) {
        if (!(err instanceof InvalidContentError)) {
            throw new Error(`failed to process JSON content: ${err}`);
        }
    }

    throw new Error('content could not be processed with any known method');
}
