import express from "express"
import * as bodyParser from "body-parser"
import { Routes } from "./routes/crmRoutes";
import mongoose from "mongoose";

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();

  public mongoUrl: string = 'mongodb://mongo/CRMdb';

  /**
   *
   */
  constructor() {
      this.app = express();
      this.config();
      this.routePrv.routes(this.app);
      this.mongoSetup();
  }
  private mongoSetup() {
    (mongoose as any).Promise = global.Promise;
    mongoose.connect(this.mongoUrl).catch(err => {
      console.log("Error: ", err);
    });
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}))
  }
}
export default new App().app;