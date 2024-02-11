export { usePageContext };
export { PageContextProvider };

import React, { useContext } from "react";
import type { PageContext } from "vike/types";

const projectKey = "_vike_react";

const globalObject = getGlobalObject("PageContextProvider.ts", {
  reactContext: React.createContext<PageContext>(undefined as never),
});

const assert = (condition: any, message = "Assertion failed") => {
  if (!condition) {
    throw new Error(`[PageContextProvider] ${message}`);
  }
};

export function getGlobalObject<T extends Record<string, unknown> = never>(
  // We use the filename as key; each `getGlobalObject()` call should live inside a file with a unique filename.
  key: `${string}.ts`,
  defaultValue: T
): T {
  // @ts-ignore
  const globalObjectsAll = (globalThis[projectKey] =
    globalThis[projectKey] || {});
  const globalObject = (globalObjectsAll[key] =
    globalObjectsAll[key] || defaultValue);
  return globalObject;
}

function PageContextProvider({
  pageContext,
  children,
}: {
  pageContext: PageContext;
  children: React.ReactNode;
}) {
  assert(pageContext);
  const { reactContext } = globalObject;
  return (
    <reactContext.Provider value={pageContext}>
      {children}
    </reactContext.Provider>
  );
}

/** Access the pageContext from any React component */
function usePageContext() {
  const { reactContext } = globalObject;
  const pageContext = useContext(reactContext);
  /* React throws an error upon wrong hook usage, so I guess a nice error message isn't needed? And I guess we can therefore assume and assert pageContext to have been provided? Let's see if users report back an assert() failure.
  if (!pageContext) throw new Error('<PageContextProvider> is needed for being able to use usePageContext()')
  */
  assert(pageContext);
  return pageContext;
}
