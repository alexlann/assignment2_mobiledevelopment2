import cors from "cors";
import bodyParser from "body-parser";

const registerMiddleware = (app) => {
  // use CORS middleware
  app.use(cors());
  app.use(bodyParser.json());
};

export { registerMiddleware };