export { guard };

import type { GuardAsync } from "vike/types";
import { render } from "vike/abort";

const guard: GuardAsync = async (pageContext: any): ReturnType<GuardAsync> => {
  let isExpired = false;
  if (!pageContext.sessionId) isExpired = true;

  if (isExpired) {
    throw render("/login");
  }
};
