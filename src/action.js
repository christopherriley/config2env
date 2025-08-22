import fs from 'fs';
import os from 'os';
import * as core from "@actions/core";
import { GenerateFromFile } from './generate.js';
import { AppError } from './errors.js';

try {
    const GITHUB_ENV = process.env.GITHUB_ENV.trim();
    if (GITHUB_ENV.length == 0) {
        throw new AppError(`GITHUB_ENV env var is not set`);
    }
    core.info(`GITHUB_ENV: ${GITHUB_ENV}`);

    const configFile = core.getInput("config-file").trim();
    if (configFile.length == 0) {
        throw new AppError(`config-file input variable is not set`);
    }
    core.info(`config file: ${configFile}`);

    const prefix = core.getInput("prefix").trim();
    if (prefix.length > 0) {
        core.info(`env var prefix: ${prefix}`);
    }

    const includeKeys = core.getInput("include-keys").trim().split(",");

    const envMap = GenerateFromFile(configFile, prefix, includeKeys);
    envMap.forEach((v, k) => {
        core.info(`${k}="${v}"`);

        try {
            fs.appendFileSync(GITHUB_ENV, `${k}=${v}` + os.EOL, 'utf8');
        } catch (err) {
            throw new AppError(`failed to write to GITHUB_ENV: ${err}`);
        }
    });
} catch (err) {
    if (err instanceof AppError) {
        core.setFailed(err.message);
    } else {
        core.setFailed(err);
    }
}
