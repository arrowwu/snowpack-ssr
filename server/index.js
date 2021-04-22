import path from "path";
import express from "express";
import pkg from "snowpack";

import templateEngineFunc from "./utils/templateEngineFunc.js";
import createRoutes from "./utils/createRoutes.js";
import snowpackConfig from "../snowpack.config.dev.js";

const { startServer, createConfiguration } = pkg;


export default async function server(isDev) {
  const app = express();
  
  
  
  app.use('/', createRoutes());

  // reference: https://expressjs.com/en/advanced/developing-template-engines.html
  // https://expressjs.com/en/guide/using-template-engines.html
  if (isDev) {
    const config = createConfiguration(snowpackConfig);
    const devServer = await startServer({ config });

    // define the template engine
    app.engine("jsx", templateEngineFunc(devServer));
    app.use(devServer.handleRequest);
<<<<<<< HEAD

    // specify the views directory
    app.set("views", path.join(process.cwd(), "client", "pages"));

    // register the template engine, now it will be able to render .jsx files
    app.set("view engine", "jsx");
  } else {
    // define the template engine
    app.engine("js", templateEngineFunc());
    app.use(express.static(path.join(process.cwd(), "build")));
    // specify the views directory
    app.set("views", path.join(process.cwd(), "build", "pages"));

    // register the template engine, now it will be able to render .jsx files
    app.set("view engine", "js");
  }

  
=======
  } else {
    // define the template engine
    app.engine("jsx", templateEngineFunc());
    app.use(express.static(path.join(process.cwd(), "build")));
  }

  // specify the views directory
  app.set("views", path.join(process.cwd(), "client", "pages"));

  // register the template engine, now it will be able to render .jsx files
  app.set("view engine", "jsx");
>>>>>>> Initial commit

  return app;
}
