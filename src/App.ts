import {
  createExpress,
  createServer,
  connectDB,
  connectRepository,
  generateTestData,
  createRoute,
} from "./lib";

class App {
  private readonly server: Express.Application = createExpress();

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
    await connectDB();
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
