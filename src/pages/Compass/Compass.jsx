import CompassLoggedOut from "./CompassLoggedOut";
import CompassLoggedIn from "./CompassLoggedIn";
import { useAuth } from "../../auth/AuthContext";

const Compass = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <CompassLoggedIn />
  ) : (
    <CompassLoggedOut />
  );
};

export default Compass;