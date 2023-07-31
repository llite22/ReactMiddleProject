import { NavLink } from "react-router-dom";
import { useTheme } from "./providers/ThemeProvider/lib/useTheme";
import { classNames } from "@/shared/lib/classNames/classNames";
import AppRouter from "./providers/router/ui/AppRouter";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={classNames("app", { hovered: true, selected: false }, [
        theme,
        "cls2",
        "cls3",
      ])}
    >
      <button onClick={toggleTheme}>TOGGLE</button>
      <NavLink to={"/"}>Главная</NavLink>
      <NavLink to={"/about"}>О сайте</NavLink>
      <AppRouter/>
    </div>
  );
};

export default App;
