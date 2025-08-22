import * as url from 'node:url';
import { parseArgs } from 'node:util';
import { GenerateFromFile } from './generate.js';
import { AppError } from './errors.js';

if (import.meta.url.startsWith('file:')) {
    const modulePath = url.fileURLToPath(import.meta.url);
    if (process.argv[1] === modulePath) {
        try {
            const { values, positionals } = parseArgs({
                args: process.argv.slice(2),
                options: {
                    key: {
                        type: 'string',
                        multiple: true,
                        short: 'k',
                    },
                    prefix: {
                        type: 'string',
                        short: 'p',
                    },
                    format: {
                        type: 'string',
                        short: 'f',
                    }
                },
                allowPositionals: true,
            });

            const configFile = positionals[0];
            if (configFile == undefined || configFile.trim().length == 0) {
                throw new AppError(`config file was not specified`);
            }

            let prefix = values.prefix;
            if (prefix == undefined || prefix.trim().length == 0) {
                prefix = ""
            }

            let format = values.format;
            if (format == undefined || format.trim().length == 0) {
                format = ""
            }

            const envMap = GenerateFromFile(configFile, prefix, values.key, format);
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
