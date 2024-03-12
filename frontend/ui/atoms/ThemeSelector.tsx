export default ThemeSelector;
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { THEMES } from "@/store/frontendTypes";
import { ReloadIcon } from "@radix-ui/react-icons"


function ThemeSelector() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const initalHidratiedTheme = Cookies.get("theme");
    setTheme(initalHidratiedTheme);
    console.log("initalHidratiedTheme", initalHidratiedTheme);
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
          setTheme(e.target.value);
          Cookies.set("theme", e.target.value);
        }}
        value={theme}
        className="select w-full"
      >
        {Object.values(THEMES).map((_theme) => (
          <option key={_theme} value={_theme}>
            {_theme}
          </option>
        ))}
      </select>)
}
