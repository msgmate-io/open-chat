import { BetaBanner } from "#open-chat-ui/landing_page/BetaBanner";
import { FAQ } from "#open-chat-ui/landing_page/FAQ";
import { Features } from "#open-chat-ui/landing_page/Features";
import { Footer } from "#open-chat-ui/landing_page/Footer";
import { Hero } from "#open-chat-ui/landing_page/Hero";
import { ALanguageModels } from "#open-chat-ui/landing_page/LanguageModels";
import { ScrollToTop } from "#open-chat-ui/landing_page/ScrollToTop";
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
                    logoImage={heroImage}
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
            <ALanguageModels
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


