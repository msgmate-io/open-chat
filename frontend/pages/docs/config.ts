import Development from "./pages/Development.mdx";
import { lazy } from "react";


export const docsConfig = {
    sidebarNav: [
        {
            title: "Getting Started",
            baseurl: "/docs",
            items: [
                {
                    title: "Introduction",
                    href: "/",
                    items: [],
                },
                {
                    title: "Docker Development",
                    href: "/dev-docker",
                    items: [],
                },
                {
                    title: "Local Installation",
                    href: "/dev-local",
                    items: [],
                },
                {
                    title: "Helm deployment",
                    href: "/helm-deployment",
                    items: [],
                },
            ],
        },
    ]
}

export const pages = [
    {
        route: "",
        component: lazy(() => import("./pages/Intro.mdx"))
    },
    {
        route: "dev-docker",
        component: lazy(() => import("./pages/Development.mdx"))
    },
    {
        route: "helm-deployment",
        component: lazy(() => import("./pages/HelmDeployment.mdx"))
    }
]