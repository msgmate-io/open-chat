import { Loaders } from "@open-chat/open-chat-ui";
import { HomePage } from "../HomePage";

export { Page };

function Page() {
  return <>
    <Loaders.UserLoader />
    <HomePage />
  </>;
}
