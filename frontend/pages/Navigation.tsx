import { Navbar } from "@open-chat/open-chat-ui";
import {
    githubLink,
    heroImage,
    logoTitle,
    sectionBetaId,
    sectionFaqId,
    sectionFeatureId,
    sectionModelsId,
} from "./GlobalStyleConfig";

const navbarRoutes = [
    {
        href: "/api/schema/redoc/",
        label: "API",
    },
];

const navbarStartRoutes = [
    {
        href: sectionFeatureId,
        label: "Features",
        desc: "Current implemented features"
    },
    {
        href: sectionBetaId,
        label: "Beta",
        desc: "Bevome a Beta Tester"
    },
    {
        href: sectionModelsId,
        label: "Language Models",
        desc: "Current supported models"
    },
    {
        href: sectionFaqId,
        label: "FAQ",
        desc: "Frequently asked questions"
    },
]

export function HomeNavbar() {
    return (
        <Navbar
            // @ts-ignore
            logoIcon={
                <img
                    src={heroImage}
                    className="w-[32px] object-contain"
                    alt="Msgmate.io Logo"
                />
            }
            logoTitle={logoTitle}
            githubLink={githubLink}
            routes={navbarRoutes}
            listRoutes={navbarStartRoutes}
        />
    );
}