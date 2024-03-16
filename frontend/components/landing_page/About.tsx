import { Statistics } from "./Statistics";
import pilot from "@/assets/logo.png";
import { defaultStatistics } from "./Statistics";

export const About = ({
  header = (
    <h2 className="text-3xl md:text-4xl font-bold">
      <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
        About{" "}
      </span>
      Company
    </h2>
  ),
  sectionId = "about",
  text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
  stats = defaultStatistics
}) => {
  return (
    <section
      id={sectionId}
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              {header}
              <p className="text-xl text-muted-foreground mt-4">
                {text}
              </p>
            </div>

            <Statistics stats={stats} />
          </div>
        </div>
      </div>
    </section>
  );
};
