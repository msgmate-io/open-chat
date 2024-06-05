import {
    BetaBanner,
    FAQ,
    Features,
    Footer, Hero,
    LanguageModelsSection,
    ScrollToTop
} from "@open-chat/open-chat-ui";
import { HomeNavbar } from "./Navigation";

import {
    becomeTesterBtnText,
    betaSubtitle,
    betaTitle,
    cinematicTitle,
    faqQuestionProps,
    featureList,
    featureTitle,
    heroSubtitle,
    languageModelSubtitle,
    languageModels,
    languageModelsTitle,
} from "./HomePageStyleConfig";

import {
    githubLink,
    heroImage,
    sectionBetaId,
    sectionFaqId,
    sectionFeatureId,
    sectionModelsId,
} from "./GlobalStyleConfig";

export function HomePage() {
    return (
        <>
            <HomeNavbar />
            <div className="flex justify-center">
                <Hero
                    cinematicTitle={cinematicTitle}
                    subtitle={heroSubtitle}
                    logoUrl={heroImage}
                />
            </div>
            <Features
                id={sectionFeatureId}
                title={featureTitle}
                features={featureList}
            />
            <BetaBanner
                id={sectionBetaId}
                title={betaTitle}
                subtitle={betaSubtitle}
                githubLink={githubLink}
                becomeTesterBtnText={becomeTesterBtnText}
            />
            <LanguageModelsSection
                id={sectionModelsId}
                title={languageModelsTitle}
                subtitle={languageModelSubtitle}
                models={languageModels}
            />
            <FAQ
                id={sectionFaqId}
                questions={faqQuestionProps}
            />
            <Footer
                logoImage={heroImage}
                githubLink={githubLink}
                imprintLink={""}
                privacyLink={""}
                termsLink={""}
            />
            <ScrollToTop />
        </>
    );
}


