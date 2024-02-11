export default onBeforeRender;

async function onBeforeRender(pageContext) {
  return {
    pageContext: {
      xcsrfToken: pageContext.xcsrfToken,
      chatId: pageContext.routeParams.chatId,
      INJECT_REDUX_STATE: {
        intalize: "Me yes please :)",
      },
    },
  };
}
