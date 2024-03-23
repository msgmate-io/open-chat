import { lazy } from "react";
import Intro from "./pages/Intro.mdx";
import Development from "./pages/Development.mdx";
import CapacitorDevelopment from "./pages/CapacitorDevelopment.mdx";
import GithubActions from "./pages/GithubActions.mdx";
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
                    title: "Capacitor Native App",
                    href: "/dev-capacitor",
                    items: [],
                },
                {
                    title: "Helm deployment",
                    href: "/helm-deployment",
                    items: [],
                },
                {
                    title: "Github Actions",
                    href: "/github-actions",
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
        route: "dev-capacitor",
        component: CapacitorDevelopment
    },
    {
        route: "helm-deployment",
        component: HelmDeployment
    },
    {
        route: "github-actions",
        components: GithubActions
    },
]