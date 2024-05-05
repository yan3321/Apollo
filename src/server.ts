import { GameDig, type QueryResult } from "gamedig";

export default class Server {
    public query?: gamedig.QueryResult;

    private ip: string;
    private port: number;

    constructor(ip: string, port: number) {
        this.ip = ip;
        this.port = port;
    }

    public queryServer(): Promise<QueryResult | undefined> {
        return new Promise((resolve) => {
            GameDig.query({
                host: this.ip,
                port: this.port,
                type: "arma3",
            })
                .then((query) => {
                    this.query = query;
                    resolve(query);
                })
                .catch((error) => {
                    console.warn(error);
                    resolve(undefined);
                });
        });
    }
}
