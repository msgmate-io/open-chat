### msgmate V2 landing page

Simple one-page scrollable landing page, with some navigation items that allow to scroll the the speicific section.

## Repo & Development

- base repo: https://github.com/msgmate-io/open-chat
- hat aber sub-repos, allso immer anschliessend: `git submodule update --init --recursive`
- docker build: `docker compose build`
- docker start: `docker compose up`

Das sollte ein vollstaendiges dev-setup sein und alle traffic nach `localhost` umleiten ( bzw. frontend und backend einzenl jeweils ports `8000` und `3000` )

### Styling Constraints and Workflows

- Base components are located inside `./frontend/components/src` and utilize [Shadcn-ui](https://ui.shadcn.com/).

You can easily add new components, for instance, an accordion, by executing the command: `npx shadcn-ui@latest add accordion` in the `./frontend` directory.

Each update to the components must be committed and pushed to `./frontend/components`.

- We utilize the [DaisyUI color themes](https://daisyui.com/docs/colors/), which are highly compatible with Tailwind CSS and Shadcn-ui. Generally, Shadcn-ui components should be preferred over DaisyUI classes.

- For styling, use Tailwind CSS, including its media queries for responsive design. Avoid using raw CSS or inline style attributes.

- Develop components such that dynamic data can be set via props.

- Pages and routes are created using Vike routing: [https://vike.dev/routing](https://vike.dev/routing). Routes are organized by folders and files in `./frontend/pages` and `./frontend/pages/<page>/+Page.tsx`.

- Define pages such that they contain constants for dynamic data like image URLs and text strings.
Example:
```
import HeroPage from "#open-chat-ui/pages/Login";

const TITLE = "Enhanced and customizable AI chat, with integrations for your favorite messengers and tools";
const SUBTITLE = "...";

export function Page() {
  return <HeroPage title={TITLE} subtitle={SUBTITLE} />;
}
```

- Since we are not adding a CMS, develop components that allow for easy text modifications.

# Sections:

### (1) "Hero" Section

Title on the left side with a bold, eye-catching gradient effect:
Msgmate.io logo prominently displayed on the right side; on mobile layout, the logo should be positioned above the title.

Title: "Enhanced and customizable AI chat, with integrations for your favorite messengers and tools."
Subtitle: "Unleash the power of AI to simplify communication and automate tasks."

### (2) Beta Banner

"Msgmate.io is actively under development. This tool suite, developed as open-source, builds upon the Open-Chat framework — integrating packages, bots, and extensions seamlessly."

- Include a large GitHub button linking to: `https://github.com/msgmate-io/open-chat/`
- Place an equally prominent button on the right side labeled 'Become a Beta Tester', blank link for now.

### (3) Features:

- **Manage Hundreds of Bots and Chats**: "User management tools to allow for easy integration and management of multiple bots and chat interfaces."
- **Open Source**: "Built on a foundation of transparency and community-driven enhancements, we build tools for developers and users with developers!"
- **Self-Hostable**: "Keep full control of your data by hosting on your own servers, run your bots at home or in the cloud."
- **Bots & Integrations**: "Easily integrate with existing systems and extend functionality with bots, everybot is just like a User, itegrated via http or websockets from anywhere."

### (4) Models

"Msgmate.io supports the use of self-hosted and open-source large language models (LLMs)! While providing a platform to test these models through our services, we collaborate with shared GPU model hosting providers. Our mission is to create easily maintainable systems that can operate independently on your infrastructure."

Create a dynamically updating list of models with hoverable descriptions to enhance user interaction:

- **meta-llama/Meta-Llama-3-70B-Instruct**:
  - "From Meta's robust lineup, the Llama 3 series stands out by offering pre-trained, instruction-tuned text generation models in varying sizes."
  
- **microsoft/WizardLM-2-8x22B**:
  - "Microsoft AI's advanced Wizard model showcases outstanding performance, rivalling leading proprietary models with its 8x22B configuration."
  
- **mistralai/Mistral-7B-Instruct-v0.2**:
  - "An instruction fine-tuned version catering to diverse conversation datasets, providing robust dialogue management."

- **Phind/Phind-CodeLlama-34B-v2**:
  - "An open-source, multi-lingual language model excelling in code-related tasks, originally trained on high-quality data to ensure top-notch performance."

- **openai/gpt-3.5-turbo**:
  - "Famed for its natural language and coding capabilities, optimized for both conversational and non-conversational AI tasks."

- **openai/gpt-4-turbo**:
  - "Representing the latest in high-performance, multimodal models. It accepts both text and image inputs to solve complex problems with heightened accuracy."

### (5) FAQ Section

Implement an accordion for FAQs to allow for expandable answers:

- **Why does msgmate.io have tokens?**
  - "Token are just for users that use the hosted msgmate.io AI agents and have an account for beta.msgmate.io. 
  In that case we pay infrastructure providers for LLM or other model completion costs, our tokens bearly cover the service running costs and are adjusted accoring to hoster pricing and model used."
  
- **How do I get a beta.msgmate.io account?**
  - "At the moment we are in closed beta, while some users are still using the original msgmate.io alpha messenger integration service. The beta is under active development and acess can only the requested by contacting `herrduenschnlate+msgateioprivatebeta@gmail.com` with a short description of you and your usecase."
  
- **What is the difference between msgmate.io and msgmate.io beta?**
  - "The original msgmate.io is a messenger integration service that allows you to chat with your favorite AI models in your favorite messengers. The new version of msgmate focuses more on the chat experience and model decentralization, the messenger integrations will be rebuild as a form of integration in the new msgmate.io"
  
- **Where can I contribute / how can I help?**
  - "You can contribute to the open-source project by submitting issues, pull requests, or by becoming a beta tester. We are always looking for feedback and suggestions to improve the platform. Feel free to open issues on any of our public repositories or contact us directly."

### (6) Footer Section

Design a distinctive footer with the following simple links:
- Impressum
- Privacy Policy
- Terms and Conditions (AGB)
- Login 
- GitHub

Make sure these links are clearly labeled and easy to navigate, representing a minimal yet fully functional section of the site.
