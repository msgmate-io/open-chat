export { guard };

import type { GuardAsync } from "vike/types";
import { render } from "vike/abort";
import Cookies from "js-cookie";

const guard: GuardAsync = async (pageContext): ReturnType<GuardAsync> => {
  const isServer = typeof window === "undefined";
  if (isServer && !pageContext.sessionId) {
    throw render("/login");
  }
};
