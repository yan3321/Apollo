import { rewriteFramesIntegration } from "@sentry/integrations";
import * as sentry from "@sentry/node";
import Environment from "./environment.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { name, version } = require("../package.json");

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export default class Sentry {
    public static init() {
        const __rootdir__ = __dirname || process.cwd();

        sentry.init({
            dsn: Environment.get("sentry_dsn"),
            integrations: [rewriteFramesIntegration({ root: __rootdir__ })],
            release: `${name}@${version}`,
        });

        console.info("Sentry initalized.");
    }
}
