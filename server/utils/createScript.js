export default args => {
  
  const { pageName, pageImportPath, pageProps } = args;
  const serializedPageProps = JSON.stringify(pageProps);
  const props = `${serializedPageProps}`;

  const script = `
    import ${pageName} from "${pageImportPath}";
    import hydrate from "/utils/hydrate.js";
    import { registerServiceWorker } from "/utils/registerServiceWorker.js";

    hydrate({
      props: ${props},
      component: ${pageName},
    });

    try {
      const res = await registerServiceWorker();
      console.log('ServiceWorker registration successful with scope: ', res);
    } catch (err) {
      console.error('ServiceWorker registration failed: ', err);
    };

    
  `;

  return script;
}
