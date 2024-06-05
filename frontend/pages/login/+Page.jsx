import { Sections } from "@open-chat/open-chat-ui";
import { servicesList } from "../LoginPageStyleConfig";
import { HomeNavbar } from "../Navigation";

export function Page() {
  return <>
    <HomeNavbar />
    <Sections.LoginSection servicesList={servicesList} />
  </>;
}
