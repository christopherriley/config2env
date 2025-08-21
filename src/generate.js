import fs from 'fs';
import GenerateJson from './json.js';
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
    try {
        return GenerateJson(c, prefix);
    } catch (err) {
        if (!(err instanceof InvalidContentError)) {
            throw new AppError(`failed to process JSON content: ${err}`);
        }
    }

    throw new AppError('content could not be processed with any known method');
}
