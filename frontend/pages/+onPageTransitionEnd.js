export { onPageTransitionEnd };

async function onPageTransitionEnd(pageContext) {
  console.log("Page transition end");
  console.log("Is backwards navigation?", pageContext.isBackwardNavigation);
  document
    .getElementById("transitionContainer")
    .classList.remove("page-is-transitioning");
  document
    .getElementById("chatView")
    ?.classList.remove("page-is-transitioning");
}
