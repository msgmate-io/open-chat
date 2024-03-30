export default HomePage;
import djangoLogo from "@/assets/_external_logos/django.png";
import k8sLogo from "@/assets/_external_logos/kubernetes.svg";
import vikeLogo from "@/assets/_external_logos/vike.svg";
import featureDemontrationImage from "@/assets/feature-demonstration.svg";
import { About } from "@/components/landing_page/About";
import { Hero } from "@/components/landing_page/Hero";
import { HowItWorks } from "@/components/landing_page/HowItWorks";
import { Navbar } from "@/components/landing_page/Navbar";
import { ScrollToTop } from "@/components/landing_page/ScrollToTop";
import { Services } from "@/components/landing_page/Services";
import { Radar, TriangleAlert } from "lucide-react";
import { Link } from "../atoms/Link";
import { Team } from "../landing_page/Team";

const HoverLink = ({ href, children }) => {
  return (
    <Link
      className="group bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text transition-all duration-300 ease-in-out"
      href={href}
    >
      <span className="bg-left-bottom bg-gradient-to-r from-pink-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
        {children}
      </span>
    </Link>
  );
};

const heroCardContents = {
  comment: {
    image: <TriangleAlert />,
    className: "animate-pulse bg-orange-300",
    userName: "WORK IN PROGRESS",
    userTag: "still coding ...",
    comment:
      "Check out GitHub for progress information and complete feature list!",
  },
  infoCard: {
    title: "Check out the creator of this landing page template",
    description: (
      <>
        <HoverLink href="https://github.com/leoMirandaa">Leo Miranda</HoverLink>{" "}
        created the open template used as basis for this landing page
      </>
    ),
  },
  pricingCard: {
    title: "Open Source",
    priceText: "MIT",
    priceDescription: "",
    description: "This is built to be built with!",
    badge: null,
    buttonText: "Build & Contribute Now!",
    features: [
      "Django Backend",
      "Django Channels",
      "React & TailwindCSS",
      "Docker + Helm",
      "Android, iOS and Web",
      "Open Source",
    ],
  },
  userCard: {
    username: "Tim Schupp",
    userDescription: "Full Stack Developer & Founder",
    info: "I love building stuff, especially with others using open source - so I initiated this Project!",
    image:
      "https://pbs.twimg.com/profile_images/1479831065409867781/hZhS0L9m_400x400.jpg",
  },
};

const navbarRoutes = [
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#packages",
    label: "Packages",
  },
  {
    href: "/docs",
    label: "Docs",
  },
  {
    href: "/api/schema/redoc/",
    label: "API",
  },
];
const logoTitle = "Open Chat Interface";
const cinematicTitle = (
  <div className="flex flex-col" >
    <h1 className="inline mb-10 text-5xl">
      Open Chat
    </h1>
    <h1 className="inline">
      Modularized{" "}
      <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
        Chat-Interface and API
      </span>{" "}
    </h1>

    <h2 className="inline">
      for{" "}
      <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
        (AI-)Chat
      </span>{" "}
      users and developers
    </h2>
  </div>
);
const heroSubtitle =
  "Packaged open source full-stack application that can be deployed as a (AI-)Chat-Interface or its individual python packages can be used in any Django project. The REST and WebSocket APIs are built to be extensible and to be integratable with Bots and other apps.";
const githubLink = "https://github.com/tbscode/django-vike-chat";
const heroToAppButton = {
  text: "Check out the Chat",
  link: "/chat",
};
const sponsorsTitle = "Supported by";
const sponsors = [
  {
    icon: <Radar size={34} />,
    name: "Open Chat gbr",
  },
  {
    icon: <Radar size={34} />,
    name: "Msgmate.io",
  },
  {
    icon: <Radar size={34} />,
    name: "Tim Benjamin Software UG",
  },
];
const servicesTitle = (
  <>
    <h2 className="text-3xl md:text-4xl font-bold">
      <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
        All in one{" "}
      </span>
      (AI-)Chat-App{" "}
    </h2>
    <h2 className="text-3xl md:text-4xl font-bold">
      Backend + Frontend + Bot API
    </h2>
  </>
);

const magemateAboutImage = featureDemontrationImage;
const msgmateAboutSubtitle =
  "Uses open source tools & libraries and is built with development and build processes in mind";
const msgmateAboutHeader = (
  <h2 className="text-3xl md:text-4xl font-bold">
    Used and Supported by <HoverLink href="https://msgmate.io">Msgmate.io</HoverLink>
  </h2>
);
const servicesList = [
  {
    title: "Django + REST Framework + Channels",
    description:
      "Includes several other django / python related libraries and tools.",
    icon: <img src={djangoLogo} alt="Django Logo" />,
  },
  {
    title: "Vike.dev + React + Shadcn UI",
    description:
      "Reactive modern UI rendered server side and routed client side. Styled with tailwind and daisyui.",
    icon: <img src={vikeLogo} alt="Vike Logo" />,
  },
];

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
    description: "Messages Sent",
  },
  {
    quantity: "200+",
    description: "Images Generated",
  },
];

const showSponsorsBanner = false;

export function LoginNavbar() {
  return (
    <Navbar
      logoIcon={"💬 "}
      logoTitle={logoTitle}
      githubLink={githubLink}
      routes={[
        {
          href: "/",
          label: "🔙 Back Home",
        },
      ]}
    />
  );
}

export function DocsNavbar({ children }) {
  return (
    <Navbar
      logoIcon={"💬 "}
      logoTitle={logoTitle}
      githubLink={null}
      loginLink={null}
      mobileFlexDir="row"
      mobileChildren={children}
      routes={[
        {
          href: "/",
          label: "🔙",
        },
      ]}
    />
  );
}

const howItWorksCinematicTitle = (
  <h2 className="text-3xl md:text-4xl font-bold ">
    Modularized to be{" "}
    <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
      Reusable
    </span>
  </h2>
);

const howItWorksSubtitle = <>
  These are the{" "}
  <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
    planned features and modules
  </span>
</>

const defaultFeatures: FeatureProps[] = [
  {
    icon: <img src={djangoLogo} className="w-14" alt="Django Logo" />,
    title: <span>'Chat' Chat Module</span>,
    description:
      "A django app dedicated to chat only! Includes models, views, serializers, channels consumer and more.Independent of django user module, fully customizable and extendable.",
  },
  {
    icon: <img src={djangoLogo} className="w-14" alt="Django Logo" />,
    title: <span>'Core' User Management Module</span>,
    description:
      "Independent of chat offers authentication and user management if you don't want to use django's default user module or provide your own. Comes with Profile and Settings model REST APIs for any Django application e.g.: an (AI-)Chat-Application.",
  },
  {
    icon: <>
      <img src={djangoLogo} className="w-14" alt="Django Logo" />
      +
      <img src={k8sLogo} className="w-14" alt="Kubernetes Logo" />
      +
      <img src={vikeLogo} alt="Vike Logo" className="w-10" />
    </>,
    title: <span>Scalable Packaged AI-Chat-Interface</span>,
    description:
      "Combined with the Vike-React frontend, the two chat modules and the Docker or Kubernetes deployment the whole thing can be used as complete self-hostable AI chat interface"
  },
];

const teamSubtitle = "The people behind the project";
const teamList = [
  {
    imageUrl: null,
    name: "Fabian Rücker",
    position: "Data Scientist & Fullstack Developer",
    socialNetworks: [
      {
        name: "Github",
        url: "https://github.com/fruecker89",
      },
    ],
  },
  {
    imageUrl: null,
    name: "Jannis Tölle",
    position: "Web-Developer & Computer Science Student",
    socialNetworks: [
      {
        name: "Github",
        url: "https://github.com/JannisToelle",
      },
    ],
  },
  {
    imageUrl: null,
    name: "Tim Schupp",
    position: "CTO & Fullstack Developer",
    socialNetworks: [
      {
        name: "Github",
        url: "https://github.com/tbscode",
      },
    ],
  },
]

export const showSponsors = false;



export function HomeNavbar() {
  return (
    <Navbar
      logoIcon={"💬 "}
      logoTitle={logoTitle}
      githubLink={githubLink}
      routes={navbarRoutes}
    />
  );
}

function HomePage() {
  return (
    <>
      <HomeNavbar />
      <Hero
        cinematicTitle={cinematicTitle}
        subtitle={heroSubtitle}
        githubLink={githubLink}
        cardContents={heroCardContents}
        toAppButtonText={heroToAppButton.text}
        toAppLink={heroToAppButton.link}
      />
      <Services
        sectionId="features"
        title={servicesTitle}
        image={magemateAboutImage}
        subtitle={msgmateAboutSubtitle}
        services={servicesList}
      />
      <HowItWorks
        cinematicTitle={howItWorksCinematicTitle}
        features={defaultFeatures}
        subtitle={howItWorksSubtitle}
      />
      <Team subtitle={teamSubtitle} teamList={teamList} />
      {showSponsors && <About
        header={msgmateAboutHeader}
        text="Msgmate.io is a LLM chat & Agent integration for messages and more! This repository is built and maintained by the founder of msgmate.io and is used in production. It is built with the same tools and libraries as msgmate.io."
        stats={msgmateStatistics}
        sectionId="msgmate"
      />}
      <ScrollToTop />
    </>
  );
}