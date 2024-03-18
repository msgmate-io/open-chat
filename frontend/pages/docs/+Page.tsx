import IntroContent from "./pages/Intro.mdx";
import { DocsLayout } from "./DocsLayout";


export function Page() {
    return <DocsLayout pathname={""}>
        <IntroContent />
    </DocsLayout>
}