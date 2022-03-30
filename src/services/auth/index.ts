import { Dispatch } from "react";
import { setLogout } from "src/store/auth";

export const logout = (dispatch: Dispatch<any>) => {
  dispatch(setLogout());
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_id");
};
