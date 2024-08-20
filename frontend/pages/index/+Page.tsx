export { Page };
import { GlobalContext, LandingForwardHero, LandingHero, useIsNativeClientAuthorized } from "@open-chat/open-chat-ui";
import { useContext, useEffect, useState } from "react";
import { DOCS_AT_INDEX, IS_NATIVE } from "../../renderer/constants";

function Page() {
  const hero = DOCS_AT_INDEX ? "forward" : "default";
  const isClientAuthorized = useIsNativeClientAuthorized();
  const { navigate } = useContext(GlobalContext);
  const [startupRedirected, setStartupRedirected] = useState(false);

  useEffect(() => {
    if (IS_NATIVE) {
      console.log("IS_NATIVE isClientAuthorized", isClientAuthorized)
      if (isClientAuthorized && !startupRedirected) {
        setStartupRedirected(true);
        navigate("/chat")
      }
    }
  }, [isClientAuthorized]);

  return hero == "forward" ? <LandingForwardHero /> : <LandingHero />
}
