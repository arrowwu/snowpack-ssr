import server from "./index.js";

async function start() {
  // if `dev` is provided as the command line arg, Snowpack dev server will be started
  // to serve client assets.
  const isDev = process.argv[2] === "dev";

  const port = isDev ? 3000 : 3001;

  const app = await server(isDev);

  app.listen(port, () => 
    // eslint-disable-next-line no-console
    console.info(`Listening on port ${port}`)
  );
}

start();
