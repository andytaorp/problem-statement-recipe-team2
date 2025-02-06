import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Signup = () => {
  const { user, signup } = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <div className="signup">
      <h1>Signup</h1>
      <form onSubmit={signup}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
