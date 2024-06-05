import { LoginSection } from "@open-chat/open-chat-ui";
import { servicesList } from "../LoginPageStyleConfig";
import { HomeNavbar } from "../Navigation";

export function Page() {
  return <>
    <HomeNavbar />
    <LoginSection servicesList={servicesList} />
  </>;
}
