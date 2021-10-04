import createScript from "./createScript.js";
import getPageNameFromFilePath from "./getPageNameFromFilePath.js";
import getFilePath from "./getFilePath.js";
import api from "../../api/index.js";
import { readFileSync } from "fs";
import path from "path";

export default (snowPackDevServer) => async (filePath, options, callback) => {
  const pageName = getPageNameFromFilePath(filePath);

  let htmlFile,
    PageComponent,
    getPropsForServer,
    renderToString,
    createElement,
    pageImportPath;

  if (snowPackDevServer) {
    // import assets from dev server runtime
    const runtime = snowPackDevServer.getServerRuntime();
    pageImportPath = getFilePath(filePath, true).replace(/\.jsx$/, ".js");
    const pageComponentImport = await runtime.importModule(pageImportPath);
    const libsImport = await runtime.importModule("/utils/libs.js");

    PageComponent = pageComponentImport.exports.default;
    getPropsForServer = pageComponentImport.exports.getProps;
    renderToString = libsImport.exports.renderToString;
    createElement = libsImport.exports.createElement;

    htmlFile = readFileSync(
      path.join(path.resolve(), `/client/index.html`),
      "utf8"
    );
  } else {
    // import assets from build folder
    pageImportPath = getFilePath(filePath);
    const pageComponentImport = await import(`../../build${pageImportPath}`);
    const libsImport = await import("../../build/utils/libs.js");

    PageComponent = pageComponentImport.default;
    getPropsForServer = pageComponentImport.getProps;
    renderToString = libsImport.renderToString;
    createElement = libsImport.createElement;

    htmlFile = readFileSync(
      path.join(path.resolve(), `/build/index.html`),
      "utf8"
    );
  }

  const pageProps = getPropsForServer
    ? await getPropsForServer({ api, options })
    : null;

  const script = createScript({
    pageName,
    pageImportPath,
    pageProps,
  });
  const children = renderToString(createElement(PageComponent, pageProps));
  let markup;

  if (snowPackDevServer) {
    markup = htmlFile
      .replace(
        `<!--HMR_CLIENT_INJECTION_TAG-->`,
        ` <script>
    window.HMR_WEBSOCKET_URL = 'ws://localhost:8080';
  </script>
  <script type="module" src="/_snowpack/hmr-client.js"></script>`
      )
      .replace(`<!--SCRIPT_TAG-->`, `<script type="module">${script}</script>`)
      .replace(`<!--ROOT_TAG-->`, children);
  } else {
    markup = htmlFile
      .replace(`<!--SCRIPT_TAG-->`, `<script type="module">${script}</script>`)
      .replace(`<!--ROOT_TAG-->`, children);
  }

  return callback(null, `<!DOCTYPE html>${markup}`);
};
