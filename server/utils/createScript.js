export default args => {
  
  const { pageName, pageImportPath, pageProps } = args;
  const serializedPageProps = JSON.stringify(pageProps);
  const props = `${serializedPageProps}`;

  const script = `
    import ${pageName} from "${pageImportPath}";
    import hydrate from "/utils/hydrate.js";

    hydrate({
      props: ${props},
      component: ${pageName},
    })
  `;

  return script;
}
