import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import cubeLeg from "@/assets/logo.png";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Code Collaboration",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    icon: <ChartIcon />,
  },
  {
    title: "Project Management",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    icon: <WalletIcon />,
  },
  {
    title: "Task Automation",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    icon: <MagnifierIcon />,
  },
];

export const Services = ({
  title = (
    <h2 className="text-3xl md:text-4xl font-bold">
      <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
        Client-Centric{" "}
      </span>
      Services
    </h2>
  ),
  services = serviceList,
  subtitle = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis dolor.",
  image = cubeLeg,
  sectionId = "features",
}) => {
  return (
    <section className="container py-24 sm:py-32" id={sectionId}>
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          {title}

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            {subtitle}
          </p>

          <div className="flex flex-col gap-8">
            {services.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 p-1 rounded-2xl max-w-40 min-w-20">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <img
          src={image}
          className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
          alt="About services"
        />
      </div>
    </section>
  );
};
