import { UserLoader } from "@open-chat-ui/loaders/UserLoader";
import { HomePage } from "@open-chat-ui/pages/HomePage";


export { Page };

function Page() {
  return <>
    <UserLoader />
    <HomePage />
  </>;
}
