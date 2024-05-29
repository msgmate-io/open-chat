export default Page;
import { DocsLayout } from "../DocsLayout";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { pages } from "../config";


function Page() {
    const routeParams = useSelector((state: RootState) => state.pageProps?.routeParams);
    const page = pages.find(page => page.route == routeParams?.page);
    return <DocsLayout pathname={routeParams?.page}>{page ? <page.component /> : "404"}</DocsLayout>;
}