import fs from 'fs';
import os from 'os';
import * as core from "@actions/core";
import { GenerateFromFile } from './generate.js';

try {
    const GITHUB_ENV = process.env.GITHUB_ENV.trim();
    if (GITHUB_ENV.length == 0) {
        core.warning(`WARNING: GITHUB_ENV is not set - this will be a dry run only`);
    } else {
        core.info(`GITHUB_ENV: ${GITHUB_ENV}`);
    }

    const configFile = core.getInput("config-file").trim();
    if (configFile.length == 0) {
        throw new Error(`config-file input variable is not set`);
    }
    core.info(`config file: ${configFile}`);

    const envMap = GenerateFromFile(configFile);
    envMap.forEach((v, k) => {
        core.info(`${k}="${v}"`);

        if (GITHUB_ENV.length > 0) {
            try {
                fs.appendFileSync(GITHUB_ENV, `${k}=${v}` + os.EOL, 'utf8');
            } catch (err) {
                throw new Error(`failed to write to GITHUB_ENV: ${err}`);
            }
        }
    });
} catch (error) {
    core.setFailed(error.message);
}
