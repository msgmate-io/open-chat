import { Button, buttonVariants } from "@/components/ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { defaultCardContents } from "./HeroCards";
import { navigate } from "../atoms/Link";

export const Hero = ({
  cinematicTitle = (<></>),
  subtitle = "subtitle",
  githubLink = "",
  toAppButtonText = "Get Started",
  toAppLink = "/app",
  cardContents = defaultCardContents,
}) => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-4">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-3xl w-full md:text-4xl lg:w-8/12 font-bold">
          {cinematicTitle}
        </main>

        <p className="text-xl text-muted-foreground md:w-8/12 mx-auto lg:mx-0">
          {subtitle}
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3" onClick={() => navigate(toAppLink)}>{toAppButtonText}</Button>

          <a
            href={githubLink}
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards cardContents={cardContents} />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
