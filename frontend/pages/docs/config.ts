import { lazy } from "react";
import Intro from "./pages/Intro.mdx";
import Development from "./pages/Development.mdx";
import HelmDeployment from "./pages/HelmDeployment.mdx";


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
        component: Intro
    },
    {
        route: "dev-docker",
        component: Development
    },
    {
        route: "helm-deployment",
        component: HelmDeployment
    }
]