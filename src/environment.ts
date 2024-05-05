import * as dotenv from "dotenv";
import path from "path";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

import ILocale from "./locale.js";
import importSyncPkg from "import-sync";

const importSync = importSyncPkg.default;

dotenv.config({ path: path.join(__dirname, "..", ".env") });

export default class Environment {
    public static get locale(): ILocale {
        if (!process.env.LOCALE) {
            throw new Error("LOCALE is not defined in your .env file.");
        }

        const locale = importSync(`./locales/${process.env.LOCALE}.js`).default;

        return locale;
    }

    public static get<T extends string | number | boolean | undefined>(
        value: getValues,
        returnType: "string" | "number" | "boolean" = "string",
        canBeUndefined?: boolean
    ): T {
        const valueUpper = value.toUpperCase();

        // tslint:disable-next-line: no-eval
        const computed: string | undefined = eval(`process.env.${valueUpper}`);

        if (computed) {
            if (returnType === "string") {
                return computed as T;
            } else if (returnType === "number") {
                return parseInt(computed, 10) as T;
            } else if (returnType === "boolean") {
                return (computed === "true") as T;
            }
        } else if (canBeUndefined) {
            return undefined as T;
        }

        throw new Error(`${valueUpper} is not defined in your .env file.`);
    }
}

export interface IColors {
    error: number;
    ok: number;
    maintenance: number;
}

export type getValues =
    | "ip"
    | "display_ip"
    | "port"
    | "color_ok"
    | "color_error"
    | "color_maintenance"
    | "locale"
    | "refresh_command"
    | "refresh_force_command"
    | "maintenance_toggle_command"
    | "reaction_message_id"
    | "reaction_role_id"
    | "reaction_emoji"
    | "minimum_player_count_for_ping"
    | "timeout_between_player_pings_in_minutes"
    | "limit_refresh_force_to_manager"
    | "reply_dm_on_no_perms"
    | "channel_id"
    | "server_manager_role_id"
    | "time_to_check_minutes"
    | "maximum_refresh_failures"
    | "sentry_dsn"
    | "secret";
