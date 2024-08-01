import { useUser } from "@open-chat/open-chat-ui";
import { HomePage } from "../HomePage";

export { Page };

function Page() {
  const { } = useUser();

  return <>
    <HomePage />
  </>;
}
