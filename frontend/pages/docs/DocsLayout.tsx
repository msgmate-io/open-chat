import { docsConfig } from "./config"
import { DocsCommandPallet } from "./DocsCommandPallet"
import { DocsNavbar, LoginNavbar } from "@/components/pages/HomePage";
import { DocsSidebarNav } from "./DocsSidebar";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export function DocsLayout({ children, pathname }) {
    return <>
        <DocsCommandPallet />
        <DocsNavbar>
            {/* In docs nav renderd in sidebar */}
            <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
                <DocsSidebarNav items={docsConfig.sidebarNav} pathname={pathname} />
            </ScrollArea>
        </DocsNavbar>
        <div className="border-b">
            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[320px_minmax(0,1fr)] md:text-xl lg:gap-10">
                <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.7rem)] w-full shrink-0 md:sticky md:block bg-base-200 rounded-xl">
                    <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
                        <DocsSidebarNav items={docsConfig.sidebarNav} pathname={pathname} />
                    </ScrollArea>
                </aside>
                <div className="article prose pt-10">
                    {children}
                </div>
            </div>
        </div>
    </>
}