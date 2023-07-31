import { Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { AboutPageAsync } from "../pages/AboutPage/AboutPage.async";
import { MainPageAsync } from "../pages/MainPage/MainPage.async";
import { useTheme } from "../theme/useTheme";
import { classNames } from "../helpers/classNames/classNames";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('app', {hovered: true, selected: false}, [theme, 'cls2', 'cls3'])}>
      <button onClick={toggleTheme}>TOGGLE</button>
      <NavLink to={"/"}>Главная</NavLink>
      <NavLink to={"/about"}>О сайте</NavLink>
      <Suspense fallback={<div>...Loading</div>}>
        <Routes>
          <Route path={"/about"} element={<AboutPageAsync />} />
          <Route path={"/"} element={<MainPageAsync />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
