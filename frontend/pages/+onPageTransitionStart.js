export { onPageTransitionStart };

async function onPageTransitionStart(pageContext) {
  console.log("Page transition start");
  console.log("Is backwards navigation?", pageContext.isBackwardNavigation);
  document
    .getElementById("transitionContainer")
    .classList.add("page-is-transitioning");
  document.getElementById("chatView")?.classList.add("page-is-transitioning");
}
