export default ThemeSelector;
import { useEffect } from "react";
import Cookies from "js-cookie";
import { THEMES } from "@/store/frontendTypes";
import { ReloadIcon } from "@radix-ui/react-icons"
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "@/store/store";


function ThemeSelector() {
  const dispatch = useDispatch();
  const frontend = useSelector((state: any) => state.frontend);
  const theme = frontend.theme;

  useEffect(() => {
    const initalHidratiedTheme = Cookies.get("theme") || THEMES.LIGHT;
    dispatch(changeTheme(initalHidratiedTheme));
  }, []);

  useEffect(() => {
    const currentDocumentTheme =
      document.documentElement.getAttribute("data-theme");

    if (currentDocumentTheme !== theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    !theme ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> :
      <select
        onChange={(e) => {
          dispatch(changeTheme(e.target.value));
          Cookies.set("theme", e.target.value);
        }}
        value={theme}
        className="select select-sm w-full"
      >
        {Object.values(THEMES).map((_theme) => (
          <option key={_theme} value={_theme}>
            {_theme}
          </option>
        ))}
      </select>)
}
