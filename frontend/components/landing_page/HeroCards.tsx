import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, Linkedin, TriangleAlert } from "lucide-react";
import { LightBulbIcon } from "./Icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
export const defaultCardContents = {
  comment: {
    image: "",
    userName: "John Doe React",
    userTag: "@john_doe",
    comment: "This landig page is awesome!"
  },
  infoCard: {
    title: "Light & dark mode",
    description: "Lorem ipsum dolor sit amet consect adipisicing elit. Consectetur natusm."
  },
  pricingCard: {
    title: "Free",
    priceText: "0",
    priceDescription: "/mo",
    description: "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    badge: "Most popular",
    buttonText: "Start Free Trial",
    features: ["4 Team member", "4 GB Storage", "Upto 6 pages"]
  },
  userCard: {
    username: "Leo Miranda",
    userDescription: "Frontend Developer",
    info: "I really enjoy transforming ideas into functional software that exceeds expectations",
    image: "https://i.pravatar.cc/150?img=58",
  },
}


export const HeroCards = ({
  cardContents = defaultCardContents
}) => {
  const { comment, infoCard, pricingCard, userCard } = cardContents;
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            {typeof comment.image === "string" ? (
              <><AvatarImage
                alt=""
                src={comment.image}
              />
                <AvatarFallback>SH</AvatarFallback></>) : comment.image}
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">{comment.userName}</CardTitle>
            <CardDescription>{comment.userTag}</CardDescription>
          </div>
        </CardHeader>

        <CardContent>{comment.comment}</CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <img
            src={userCard.image}
            alt="user avatar"
            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
          />
          <CardTitle className="text-center">{userCard.username}</CardTitle>
          <CardDescription className="font-normal text-primary">
            {userCard.userDescription}
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>
            {userCard.info}
          </p>
        </CardContent>

        <CardFooter>
          <div>
            <a
              href="https://github.com/leoMirandaa"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Github icon</span>
              <GitHubLogoIcon className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/leo_mirand4"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">X icon</span>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-foreground w-5 h-5"
              >
                <title>X</title>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Linkedin icon</span>
              <Linkedin size="20" />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[190px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            {pricingCard.title}
            {pricingCard.badge && <Badge
              variant="secondary"
              className="text-sm text-primary"
            >
              {pricingCard.badge}
            </Badge>}
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">{pricingCard.priceText}</span>
            <span className="text-muted-foreground">{pricingCard.priceDescription}</span>
          </div>

          <CardDescription>
            {pricingCard.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">{pricingCard.buttonText}</Button>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {pricingCard.features.map(
              (benefit: string) => (
                <span
                  key={benefit}
                  className="flex"
                >
                  <Check className="text-green-500" />{" "}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="absolute w-[370px] -right-[35px] bottom-[15px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>{infoCard.title}</CardTitle>
            <CardDescription className="text-md mt-2">
              {infoCard.description}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
