import * as url from 'node:url';
import { GenerateFromFile } from './generate.js';

if (import.meta.url.startsWith('file:')) {
    const modulePath = url.fileURLToPath(import.meta.url);
    if (process.argv[1] === modulePath) {
        try {
            const configFile = process.argv[2];
            if (configFile == undefined || configFile.trim().length == 0) {
                throw new Error(`config file was not specified`)
            }

            const envMap = GenerateFromFile(configFile);
            envMap.forEach((v, k) => {
                console.log(`${k}=${v}`)
            });
        } catch (err) {
            console.error(err.message);
            process.exit(1);
        }
    }
}
