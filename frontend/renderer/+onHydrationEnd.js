export default function onHydrationEnd(pageContext) {
    console.log(
        "Hydration finished; page is now interactive.",
        window.innerWidth,
        pageContext
    );
}
