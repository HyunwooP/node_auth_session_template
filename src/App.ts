import * as express from "express";
import {
  createExpress,
  createServer,
  connectMysql,
  connectRepository,
  generateTestData,
  createRoute,
  Redis,
} from "./lib";

class App {
  private readonly server: express.Application = createExpress();

  public onCreateRoute(): void {
    console.log("App Created Route");
    createRoute(this.server);
  }

  public onCreateServer(): void {
    console.log("App Created Server");
    createServer(this.server);
  }

  public async onConnectDB(): Promise<void> {
    console.log("App Connected DB");
    await connectMysql();
    await Redis.connectRedis();
  }

  public async onConnectRepository(): Promise<void> {
    console.log("App Connected Repositorys");
    await connectRepository();
  }

  public async onCreateTestSample(): Promise<void> {
    console.log("App Created Test Datas");
    await generateTestData();
  }
}

export default new App();
