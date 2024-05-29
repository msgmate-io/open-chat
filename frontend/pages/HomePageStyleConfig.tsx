const cinematicTitle = (
    <div className="flex flex-col" >
        <h1 className="inline mb-10 text-5xl">
            Msgmate.io
        </h1>
        <h1 className="inline">
            Enhanced and customizable{" "}
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                AI Chat
            </span>,{" "}
        </h1>

        <h2 className="inline">
            with{" "}
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                integrations
            </span>{" "}
            for{" "}
            <span className="inline bg-gradient-to-r from-[#D247BF]  to-[#FE9933] text-transparent bg-clip-text">
                your favorite messangers and tools
            </span>
        </h2>
    </div>
);
const heroSubtitle =
    "Unleash the the power of AI to simplify communication and automate tasks.";
const navbarRoutes = [
    {
        href: "/docs",
        label: "Docs",
    },
    {
        href: "/api/schema/redoc/",
        label: "API",
    },
];

const featureTitle = "Features";
const featureList = [
    {
        title: "Open Source",
        description: "Built on a foundation of transparency and community-driven enhancements, we build tools for developers and users with developers!",
        image: null
    },
    {
        title: "Self-Hostable",
        description: "Keep full control of your data by hosting on your own servers, run your bots at home or in the cloud.",
        image: null
    },
    {
        title: "Manage Hundreds of Bots and Chats",
        description: "User management tools to allow for easy integration and management of multiple bots and chat interfaces.",
        image: null
    },
    {
        title: "Bots & Integrations",
        description: "Easily integrate with existing systems and extend functionality with bots, everybot is just like a User, itegrated via http or websockets from anywhere.",
        image: null
    },
]

const betaTitle = "Beta";
const betaSubtitle = "Msgmate.io is actively under development. This tool suite, developed as open-source, builds upon the Open-Chat framework — integrating packages, bots, and extensions seamlessly.";
const becomeTesterBtnText = "Become a Beta Tester";

const languageModelsTitle =
    <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        6{" "}
        <span className="inline bg-gradient-to-r from-[#D247BF]  to-[#FE9933] text-transparent bg-clip-text">
            Models
        </span>
        {" "}Currently supported
    </h2>
const languageModelSubtitle = "Msgmate.io supports the use of self-hosted and open-source large language models (LLMs)! While providing a platform to test these models through our services, we collaborate with shared GPU model hosting providers. Our mission is to create easily maintainable systems that can operate independently on your infrastructure."
const languageModels = [
    {
        title: "meta-llama/Meta-Llama-3-70B-Instruct",
        description: "From Meta's robust lineup, the Llama 3 series stands out by offering pre-trained, instruction-tuned text generation models in varying sizes."
    },
    {
        title: "microsoft/WizardLM-2-8x22B",
        description: "Microsoft AI's advanced Wizard model showcases outstanding performance, rivalling leading proprietary models with its 8x22B configuration."
    },
    {
        title: "mistralai/Mistral-7B-Instruct-v0.2",
        description: "An instruction fine-tuned version catering to diverse conversation datasets, providing robust dialogue management."
    },
    {
        title: "Phind/Phind-CodeLlama-34B-v2",
        description: "An open-source, multi-lingual language model excelling in code-related tasks, originally trained on high-quality data to ensure top-notch performance."
    },
    {
        title: "openai/gpt-3.5-turbo",
        description: "Famed for its natural language and coding capabilities, optimized for both conversational and non-conversational AI tasks."
    },
    {
        title: "openai/gpt-4-turbo",
        description: "Representing the latest in high-performance, multimodal models. It accepts both text and image inputs to solve complex problems with heightened accuracy."
    },
]

const faqQuestionProps = [
    {
        question: "Why does msgmate.io have tokens?",
        answer: "Token are just for users that use the hosted msgmate.io AI agents and have an account for beta.msgmate.io. In that case we pay infrastructure providers for LLM or other model completion costs, our tokens bearly cover the service running costs and are adjusted accoring to hoster pricing and model used.",
        value: "item-1",
    },
    {
        question: "How do I get a beta.msgmate.io account?",
        answer: "At the moment we are in closed beta, while some users are still using the original msgmate.io alpha messenger integration service. The beta is under active development and acess can only the requested by contacting herrduenschnlate+msgateioprivatebeta@gmail.com with a short description of you and your usecase.",
        value: "item-2",
    },
    {
        question: "What is the difference between msgmate.io and msgmate.io beta?",
        answer: "The original msgmate.io is a messenger integration service that allows you to chat with your favorite AI models in your favorite messengers. The new version of msgmate focuses more on the chat experience and model decentralization, the messenger integrations will be rebuild as a form of integration in the new msgmate.io",
        value: "item-3",
    },
    {
        question: "Where can I contribute / how can I help?",
        answer: "You can contribute to the open-source project by submitting issues, pull requests, or by becoming a beta tester. We are always looking for feedback and suggestions to improve the platform. Feel free to open issues on any of our public repositories or contact us directly.",
        value: "item-4",
    },
]


export {
    becomeTesterBtnText, betaSubtitle, betaTitle, cinematicTitle, faqQuestionProps, featureList, featureTitle, heroSubtitle, languageModelSubtitle,
    languageModels, languageModelsTitle, navbarRoutes
};
