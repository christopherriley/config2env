import * as url from 'node:url';
import { GenerateFromFile } from './generate.js';
import { AppError } from './errors.js';

if (import.meta.url.startsWith('file:')) {
    const modulePath = url.fileURLToPath(import.meta.url);
    if (process.argv[1] === modulePath) {
        try {
            const configFile = process.argv[2];
            if (configFile == undefined || configFile.trim().length == 0) {
                throw new AppError(`config file was not specified`)
            }

            let prefix = process.argv[3];
            if (prefix == undefined || configFile.trim().length == 0) {
                prefix = ""
            }

            const envMap = GenerateFromFile(configFile, prefix);
            envMap.forEach((v, k) => {
                console.log(`${k}=${v}`)
            });
        } catch (err) {
            if (err instanceof AppError) {
                console.error(err.message);
                process.exit(1);
            } else {
                console.error(err);
                process.exit(1);
            }
        }
    }
}
