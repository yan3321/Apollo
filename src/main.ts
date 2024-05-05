import Bot from "./bot.js";
import Environment from "./environment.js";
import Sentry from "./sentry.js";

if (Environment.get("sentry_dsn", "string", true)) {
    Sentry.init();
}

new Bot().start();
