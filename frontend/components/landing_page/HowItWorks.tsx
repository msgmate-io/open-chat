import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GiftIcon, MapIcon, MedalIcon, PlaneIcon } from "./Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const defaultFeatures: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Accesibility",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
  {
    icon: <MapIcon />,
    title: "Community",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
  {
    icon: <PlaneIcon />,
    title: "Scalability",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
  {
    icon: <GiftIcon />,
    title: "Gamification",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
];

const defaultCinematicTitle = (
  <h2 className="text-3xl md:text-4xl font-bold ">
    How It{" "}
    <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
      Works{" "}
    </span>
    Step-by-Step Guide
  </h2>);


export const HowItWorks = (
  {
    cinematicTitle = defaultCinematicTitle,
    features = defaultFeatures,
    subtitle = <>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis dolor pariatur sit!</>
  }: {
    features?: FeatureProps[],
    cinematicTitle?: JSX.Element,
    subtitle?: JSX.Element
  }
) => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      {cinematicTitle}
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">{subtitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="flex gap-4 items-center content-center justify-center">
                {icon}
              </CardTitle>
              <CardTitle className="flex gap-4 items-center content-center justify-center">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
