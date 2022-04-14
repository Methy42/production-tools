import { IncomingMessage, Server, ServerResponse } from "http";

export interface IAppOption {
  appName: string;
  port: number;
  hostname?: string;
  server?: Server;
  notRunServer?: boolean;
  https?: boolean;
  apiMap?: { [path: string]: IApi }
  toolMap?: { [name: string]: any }
}

export interface IApi {
  [ methods: string ]: (context: IAppContext) => void;
}

export interface IAppContext {
  req: IncomingMessage;
  res: ServerResponse;
  toolMap: { [name: string]: any };
}

export default class App implements IAppOption {
  constructor(option: IAppOption) {
    this.appName = option.appName;
    this.port = option.port;
    this.hostname = option.hostname || '127.0.0.1';

    if (option.server) {
      this.server = option.server;
    } else {
      this.server = new Server();
    }

    if (option.apiMap) {
      this.apiMap = option.apiMap;
    } else {
      this.apiMap = {};
    }

    if (option.toolMap) {
      this.toolMap = option.toolMap;
    } else {
      this.toolMap = {};
    }

    !option.notRunServer && this.listen();
  }

  appName: string;
  port: number;
  hostname?: string;
  server: Server;

  apiMap: { [path: string]: IApi };

  toolMap: { [name: string]: any };

  listen() {
    this.server.listen(this.port, this.hostname, () => {
      console.log(`${ this.appName } listening to http://${ this.hostname }:${ this.port } ...`);
      this.onRequest();
    });
  }

  onRequest() {
    this.server.on("request", (req, res) => {
      console.log("[request]", req.url, req.method);
      if (req.url && req.method && this.apiMap[req.url] && this.apiMap[req.url][req.method]) {
        this.apiMap[req.url][req.method]({
          req, res, toolMap: this.toolMap
        });
      } else {
        res.end("404");
      }
    });
  }
}