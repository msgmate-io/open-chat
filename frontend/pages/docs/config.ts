import { lazy } from "react";
import Intro from "./pages/Intro.mdx";
import Development from "./pages/Development.mdx";
import CapacitorDevelopment from "./pages/CapacitorDevelopment.mdx";
import HelmDeployment from "./pages/HelmDeployment.mdx";
import GithubActions from "./pages/GithubActions.mdx";
import Backend from "./pages/Backend.mdx";
import HelmValuesExampleBase from "./pages/HelmValuesExampleBase.mdx";


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
                    title: "Github Actions",
                    href: "/workflows",
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
            ],
        },
        {
            title: "Frontend",
            baseurl: "/docs",
            items: [
                {
                    title: "Introduction",
                    href: "/frontend",
                    items: [],
                },
            ],
        },
        {
            title: "Backend",
            baseurl: "/docs",
            items: [
                {
                    title: "Introduction",
                    href: "/backend",
                    items: [],
                },
            ],
        },
    ]
}

export const detachedPages = [
    {
        route: "example-values-helm-install",
        component: HelmValuesExampleBase
    }
]

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
        route: "workflows",
        component: GithubActions
    },
    {
        route: "backend",
        component: Backend
    },
    ...detachedPages
]