import * as url from 'node:url';
import { GenerateFromFile } from './generate.js';

if (import.meta.url.startsWith('file:')) {
    const modulePath = url.fileURLToPath(import.meta.url);
    if (process.argv[1] === modulePath) {
        try {
            const envMap = GenerateFromFile(process.argv[2]);
            envMap.forEach((v, k) => {
                console.log(`${k}=${v}`)
            });
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
}
