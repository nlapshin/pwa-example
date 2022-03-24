import * as http from "http";
import express, { Express } from "express";
import bodyParser from "body-parser";

import config, { IConfig } from './config'
import { Translate } from './entities'

export class Server {
    private readonly _app: Express;
    private readonly _config: IConfig;
    private readonly _translate: Translate;

    get app(): Express {
        return this._app;
    }

    private _server!: http.Server;

    get server(): http.Server {
        return this._server;
    }

    constructor() {
        this._config = config
        this._app = express();

        this._app.set("port", this._config.port);

        this._translate = new Translate(this._app)

        this.configureMiddleware();
    }

    public configureMiddleware() {
        this._app.use(express.static('src/server/static'));

        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: true }));

        this._translate.register()
    }

    public start() {
        this._server = this._app.listen(this._app.get("port"), () => {
            console.log("🚀 Server is running on port " + this._app.get("port"));
        });
    }
}

export default Server;
