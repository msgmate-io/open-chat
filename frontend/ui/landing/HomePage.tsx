export default HomePage;
import { About } from "@/components/landing_page/About";
import { Navbar } from "@/components/landing_page/Navbar";
import { Hero } from "@/components/landing_page/Hero";
import { Sponsors } from "@/components/landing_page/Sponsors";
import { Radar } from "lucide-react";
import { Services } from "@/components/landing_page/Services";
import { ScrollToTop } from "@/components/landing_page/ScrollToTop";
import { TriangleAlert } from "lucide-react";
import featureDemontrationImage from "@/assets/feature-demonstration.svg";
import vikeLogo from "@/assets/_external_logos/vike.svg";
import djangoLogo from "@/assets/_external_logos/django.png";
import { text } from "stream/consumers";
// 
/**
import { HowItWorks } from "@/components/landing_page/HowItWorks";
import { Features } from "@/components/landing_page/Features";
import { FAQ } from "@/components/landing_page/FAQ";
import { Cta } from "@/components/landing_page/Cta";
import { Testimonials } from "@/components/landing_page/Testimonials";
import { Team } from "@/components/landing_page/Team";
import { Pricing } from "@/components/landing_page/Pricing";
import { Newsletter } from "@/components/landing_page/Newsletter";
import { Footer } from "@/components/landing_page/Footer";
 */

const heroCardContents = {
    comment: {
        image: <TriangleAlert />,
        userName: "WORK IN PROGRESS",
        userTag: "still coding ...",
        comment: "Checkout github for progress information and complete feature list!"
    },
    infoCard: {
        title: "Checkout the creator of this landing page",
        description: "Leo Miranda created the basis for this landing page using react & shadcn"
    },
    pricingCard: {
        title: "Open Source",
        priceText: "MIT",
        priceDescription: "",
        description: "This is build to be build with!",
        badge: null,
        buttonText: "Build & Contribute Now!",
        features: ["Django Backend", "Django Channels", "React & TailwindCSS", "Docker + Helm", "Android, Ios and Web", "Open Source"]
    },
    userCard: {
        username: "Tim Schupp",
        userDescription: "Full Stack Developer & Founder",
        info: "I love building stuff, especially with others open source!",
        image: "https://pbs.twimg.com/profile_images/1479831065409867781/hZhS0L9m_400x400.jpg",
    }
}

const navbarRoutes = [
    {
        href: "#features",
        label: "Features",
    },
    {
        href: "#msgmate",
        label: "About Msgmate",
    },
]
const logoTitle = "Open Chat Interface"
const cinematicTitle = (
    <>
        <h1 className="inline">
            Chat{" "}
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                Interface
            </span>{" "}
        </h1>

        <h2 className="inline">
            for{" "}
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                AI Agent & Bot
            </span>{" "}
            developers & users
        </h2>
    </>
)
const heroSubtitle = "Open source chat interface for AI developed & suppored by the creator of msgmate.io"
const githubLink = "https://github.com/tbscode/django-vike-chat"
const heroToAppButton = {
    text: "Checkout the Chat",
    link: "/chat"
}
const sponsorsTitle = "Supported by"
const sponsors = [
    {
        icon: <Radar size={34} />,
        name: "Open Chat gbr"
    },
    {
        icon: <Radar size={34} />,
        name: "Msgmate.io",
    },
    {
        icon: <Radar size={34} />,
        name: "Tim Benjamin Software UG",
    }
]
const servicesTitle = (
    <>
        <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                All in one{" "}
            </span>
        </h2>
        <h2 className="text-3xl md:text-4xl font-bold">
            Backend + Frontend + Bot API
        </h2>
    </>
)

const magemateAboutImage = featureDemontrationImage;
const msgmateAboutSubtitle = "Uses opensource tools & libaries and is build with development and build processes in mind"
const msgmateAboutHeader = (
    <h2 className="text-3xl md:text-4xl font-bold">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Used by{" "}
        </span>
        Msgmate.io
    </h2>
);
const servicesList = [
    {
        title: "Django + Django REST Framework + Django Channels",
        description:
            "Includes several other django / python related libaries and tools.",
        icon: <img src={djangoLogo} alt="Django Logo" />
    },
    {
        title: "Vike.dev + React + Shadcn UI",
        description:
            "Reactive modern UI rendered server side and routed client side. Styled with tailwind and daisyui.",
        icon: <img src={vikeLogo} alt="Vike Logo" />
    },
]

const msgmateStatistics = [
    {
        quantity: "5+",
        description: "AI Models",
    },
    {
        quantity: "300+",
        description: "Users",
    },
    {
        quantity: "5000+",
        description: "Messages Send",
    },
    {
        quantity: "200+",
        description: "Images Generated",
    },
]

function HomePage() {
    return <>
        <Navbar
            logoTitle={logoTitle}
            routes={navbarRoutes}
        />
        <Hero
            cinematicTitle={cinematicTitle}
            subtitle={heroSubtitle}
            githubLink={githubLink}
            cardContents={heroCardContents}
            toAppButtonText={heroToAppButton.text}
            toAppLink={heroToAppButton.link}
        />
        <Sponsors title={sponsorsTitle} sponsors={sponsors} />
        {/** <HowItWorks /> */}
        {/** <Features /> */}
        <Services
            sectionId="features"
            title={servicesTitle}
            image={magemateAboutImage}
            subtitle={msgmateAboutSubtitle}
            services={servicesList}
        />
        {/** <Cta /> */}
        {/**<Testimonials />**}
        <Team />
        {/** <Pricing /> */}
        {/** <Newsletter /> */}
        <About
            header={msgmateAboutHeader}
            text="Msgmate.io is a LLM chat & Agent integration for messages and more! This repository is build and maintained by the founder of msgmate.io and is used in production. It is build with the same tools and libaries as msgmate.io."
            stats={msgmateStatistics}
            sectionId="msgmate"
        />
        {/** <Footer /> */}
        <ScrollToTop />
    </>
}