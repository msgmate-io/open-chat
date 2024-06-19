import { UserLoader } from "@open-chat/open-chat-ui";
import { HomePage } from "../HomePage";

export { Page };

function Page() {
  return <>
    <UserLoader />
    <HomePage />
  </>;
}
