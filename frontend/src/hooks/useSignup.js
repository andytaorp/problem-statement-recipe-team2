import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const { user, signup } = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  return { signup };
};
