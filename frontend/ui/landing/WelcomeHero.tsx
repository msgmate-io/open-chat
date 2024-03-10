export default WecomeHero;

import { func } from "prop-types";
import ThemeSelector from "../atoms/ThemeSelector";
import { Button } from "@/components/ui/button";
import React from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

function FeaetureIcon({ title, children }) {
  return (
    <div className="w-70 h-32 rounded-xl bg-base-300 relative shadow-xl hover:bg-accent p-2">
      <div className="w-full h-full flex flex-col content-start items-start justify-center">
        <div className="w-full p-2 flex content-center items-center justify-center">
          <h1 className="text-xl">{title}</h1>
        </div>
        <div className="w-full flex flex-grow content-center items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

function WecomeHero() {
  const pageSource = typeof window !== "undefined" ? window.location.href : "";
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ];

  return (
    <div className="h-screen w-screen relative bg-content">
      <div className="navbar bg-base-100 w-full p-10">
        <div className="flex-1">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src="assets/logo.png" />
          </div>
          <a className="btn btn-ghost text-xl" href="https://msgmate.io">
            msgmate.io
          </a>
          <button className="btn">Test</button>
        </div>
        <div className="flex-none">
          <a role="button" className="btn btn-ghost" href="login">
            Login
          </a>
          <a role="button" className="btn btn-ghost" href="register">
            Register
          </a>

          <ThemeSelector />
        </div>
      </div>

      <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components that you can copy and
                      paste into your apps. Accessible. Customizable. Open
                      Source.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button variant="link">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

      <div className="w-full h-full flex p-10 relative">
        {/* <div className="w-full h-full flex flex-col gap-6 content-center items-center justify-center relative"></div> */}

        {/* <div className="w-full h-full flex flex-col gap-6 content-center items-center justify-center relative">
          <div className="border-2 rounded-2xl">
            <h1 className="text-2xl sm:text-4xl lg:text-7xl">
              {" "}
              Django-Vike-Chat 👋
            </h1>
          </div>
          <h1 className="text-sm sm:text-xl">
            Example of a open dynamic chat app
          </h1>
          <div className="flex flex-row flex-wrap gap-4 max-w-full content-center items-center justify-center">
            <FeaetureIcon title={"DaisyUI + tailwind"}>
              <ThemeSelector />
            </FeaetureIcon>
            <FeaetureIcon title={"Vike SSR + ClientRouting"}>
              <a href={`/chat/`} className="btn btn-primary">
                Navigate client side (chat)
              </a>
            </FeaetureIcon>
            <FeaetureIcon title={"Fully opensource on github"}>
              <button className="btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Check the repo
              </button>
            </FeaetureIcon>
            <FeaetureIcon title={"Django Auth + User Management"}>
              <UserIndicator />
            </FeaetureIcon>
          </div>
        </div> */}
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"