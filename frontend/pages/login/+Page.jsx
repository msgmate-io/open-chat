import { LoginSection } from "#open-chat-ui/sections/LoginHero";
import { servicesList } from "../LoginPageStyleConfig";
import { HomeNavbar } from "../Navigation";

export function Page() {
  return <>
    <HomeNavbar />
    <LoginSection servicesList={servicesList} />
  </>;
}
