import App from "./App";

(async () => {
  try {
    /**
     * Create Route Item
     */
    await App.onCreateRoute();

    /**
     * Create HTTP Server
     */
    await App.onCreateServer();

    /**
     * Connect DB
     */
    await App.onConnectDB();

    /**
     * Connect TypeOrm Mysql Repositorys
     */
    await App.onConnectRepository();

    /**
     * Create Mysql Sample Data
     */
    await App.onCreateTestSample();
  } catch (e) {
    console.log(e);
  }
})();
