import { UserLoader } from "#open-chat-ui/loaders/UserLoader";
import { HomePage } from "../HomePage";

export { Page };

function Page() {
  return <>
    <UserLoader />
    <HomePage />
  </>;
}
