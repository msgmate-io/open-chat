export default PageContextProcessor;

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

function PageContextProcessor() {
  const routeParams = useSelector(
    (state: RootState) => state.pageContext.routeParams
  );
  return <></>;
}
