import { useSelector } from "react-redux";
import { SetRedirect } from "./hooks";
import PublicRoutes from "./public-routes";
import RestrictedRoutes from "./restricted-routes";

const Router = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.authenticated);

  SetRedirect({ isAuthenticated });

  return (
    <div className="App">
      {isAuthenticated ? <RestrictedRoutes /> : <PublicRoutes />}
    </div>
  );
};

export default Router;
