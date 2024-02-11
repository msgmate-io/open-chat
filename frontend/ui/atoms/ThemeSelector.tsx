export default ThemeSelector;
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducer";
import React, { useEffect } from "react";
import { changeTheme } from "../../store/localSettings/api";
import Cookies from "js-cookie";
import { THEMES } from "../../store/localSettings/types";

function ThemeSelector() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.localSettings?.theme);

  useEffect(() => {
    const currentDocumentTheme =
      document.documentElement.getAttribute("data-theme");

    if (currentDocumentTheme !== theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <select
      onChange={(e) => {
        console.log("THEME", e.target.value);
        changeTheme(e.target.value as THEMES)(dispatch);
      }}
      value={theme}
      className="select w-full"
    >
      {Object.values(THEMES).map((theme) => (
        <option key={theme} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
}
