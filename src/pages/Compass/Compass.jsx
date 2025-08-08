import CompassLoggedOut from "./CompassLoggedOut";
import CompassLoggedIn from "./CompassLoggedIn";
import { useSelector } from "react-redux";

const Compass = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? (
    <CompassLoggedIn />
  ) : (
    <CompassLoggedOut />
  );
};

export default Compass;