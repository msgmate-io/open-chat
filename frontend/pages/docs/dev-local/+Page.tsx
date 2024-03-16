export default Page;
import { createElement } from "react";
import { DocsLayout } from "../+Page";
import Content from "./Content.mdx";

function Page() {
    const ContentR = createElement(Content);
    return <DocsLayout>{ContentR}</DocsLayout>;
}