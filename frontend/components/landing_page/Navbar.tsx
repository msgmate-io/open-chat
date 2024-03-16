import { Children, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { LogoIcon } from "./Icons";
import ThemeSelector from "@/ui/atoms/ThemeSelector";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#pricing",
    label: "Pricing",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

import { CalendarIcon } from "@radix-ui/react-icons"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export const UserHoverCard = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.value);

  return <HoverCard>
    <HoverCardTrigger asChild>
      {children}
    </HoverCardTrigger>
    <HoverCardContent className="w-80">
      <div className="flex justify-between space-x-4">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{user?.username}</h4>
          <p className="text-sm">
            {user?.uuid}
          </p>
          <div className="flex items-center pt-2">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground">
              Joined {new Date(user?.date_joined).toDateString()}
            </span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
}

export const DynamicLoginButton = ({
  loginLink = "/login",
  authenticatedLink = "/chat"
}) => {
  const user = useSelector<RootState>((state) => state.user.value);
  const isAuthenticated = Boolean(user)

  return !isAuthenticated ? <a
    href={loginLink}
    className={`border ${buttonVariants({ variant: "outline" })}`}
  >
    🚀
    Log-In
  </a> : <UserHoverCard>
    <a
      href={authenticatedLink}
      className={`border border-success ${buttonVariants({ variant: "outline" })}`}
    >
      ✅
      Logged-In
    </a>
  </UserHoverCard>
}

export const Navbar = ({
  logoIcon = <LogoIcon />,
  logoTitle = "ShadcnUI/React",
  routes = routeList,
  githubLink = "",
  loginLink = "/login",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full backdrop-blur-xl dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a
              href="/"
              className="ml-2 font-bold text-xl flex"
            >
              {logoIcon}
              {logoTitle}
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">

            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  Menu Icon
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    {logoTitle}
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routes.map(({ href, label }: RouteProps) => (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    href={githubLink}
                    target="_blank"
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}
                  >
                    <GitHubLogoIcon className="mr-2 w-5 h-5" />
                    Github
                  </a>
                  <DynamicLoginButton />
                  <ThemeSelector />
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routes.map((route: RouteProps, i) => (
              <a
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex gap-2 justify-center content-center items-center">
            <a
              href={githubLink}
              target="_blank"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              <GitHubLogoIcon className="mr-2 w-5 h-5" />
              Github
            </a>
            <DynamicLoginButton />
            <ThemeSelector />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
