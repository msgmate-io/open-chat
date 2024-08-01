export { Page };
import { LandingForwardHero, LandingHero } from "@open-chat/open-chat-ui";
import { DOCS_AT_INDEX } from "../../renderer/constants";

function Page() {
  const hero = DOCS_AT_INDEX ? "forward" : "default";

  return hero == "forward" ? <LandingForwardHero /> : <LandingHero />
}
