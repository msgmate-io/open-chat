import { LoginNavbar } from "@/components/pages/HomePage";

import { DocsSidebarNav } from "./DocsSidebar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import IntroContent from "./Intro.mdx";

import { MainNavItem, SidebarNavItem } from "types/nav"

const docsConfig = {
    sidebarNav: [
        {
            title: "Getting Started",
            items: [
                {
                    title: "Introduction",
                    href: "/docs",
                    items: [],
                },
                {
                    title: "Docker Development",
                    href: "/docs/dev-docker",
                    items: [],
                },
                {
                    title: "Local Installation",
                    href: "/docs/dev-local",
                    items: [],
                },
            ],
        },
    ]
}

export function DocsLayout({ children }) {
    return <>
        <LoginNavbar />
        <div className="border-b">
            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[320px_minmax(0,1fr)] md:text-xl lg:gap-10">
                <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.7rem)] w-full shrink-0 md:sticky md:block bg-base-200 rounded-xl">
                    <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
                        <DocsSidebarNav items={docsConfig.sidebarNav} />
                    </ScrollArea>
                </aside>
                <div className="article prose pt-10">
                    {children}
                </div>
            </div>
        </div>
    </>
}

export function Page() {
    return <DocsLayout>
        <IntroContent />
    </DocsLayout>
}