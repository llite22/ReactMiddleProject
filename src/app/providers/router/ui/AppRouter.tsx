import { memo, Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "@/widgets/PageLoader";
import {
  AppRoutesProps,
  routeConfig,
} from "@/shared/config/routeConfig/routeConfig";
import { RequireAuth } from "./RequireAuth";

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    return (
      <Route
        key={route.path}
        element={
          route.authOnly ? (
            <RequireAuth>{route.element}</RequireAuth>
          ) : (
            route.element
          )
        }
        path={route.path}
      />
    );
  }, []);

  return (
    <div className="page-wrapper">
      <Suspense fallback={<PageLoader />}>
        <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
      </Suspense>
    </div>
  );
};
export default memo(AppRouter);
