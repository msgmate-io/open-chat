export default HomePage;
import { About } from "@/components/landing_page/About";
import { Navbar } from "@/components/landing_page/Navbar";
import { Hero } from "@/components/landing_page/Hero";
import { Sponsors } from "@/components/landing_page/Sponsors";
import { Radar } from "lucide-react";
import { Services } from "@/components/landing_page/Services";
import { ScrollToTop } from "@/components/landing_page/ScrollToTop";
import featureDemontrationImage from "@/assets/feature-demonstration.svg";
import vikeLogo from "@/assets/_external_logos/vike.svg";
import djangoLogo from "@/assets/_external_logos/django.png";
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

const navbarRoutes = [
    {
        href: "#pricing",
        label: "Pricing",
    },
    {
        href: "#faq",
        label: "FAQ",
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

function HomePage() {
    return <>
        <Navbar
            logoTitle={logoTitle}
            routes={navbarRoutes}
        />
        <Hero cinematicTitle={cinematicTitle} subtitle={heroSubtitle} githubLink={githubLink} />
        <Sponsors title={sponsorsTitle} sponsors={sponsors} />
        {/** <HowItWorks /> */}
        {/** <Features /> */}
        <Services
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
            text="Msgmate.io is a LLM chat & Agent integration for messages and more!"
        />
        {/** <Footer /> */}
        <ScrollToTop />
    </>
}