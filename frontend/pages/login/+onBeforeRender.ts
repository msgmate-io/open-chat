export default onBeforeRender;

async function onBeforeRender(pageContext) {
  return {
    pageContext: {
      pageProps: {
        xcsrfToken: pageContext.xcsrfToken,
      },
    },
  };
}