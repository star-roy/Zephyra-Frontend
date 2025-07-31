import ExploreLoggedOut from "./ExploreLoggedOut";
import ExploreLoggedIn from "./ExploreLoggedIn";
import { useAuth } from "../../auth/AuthContext";

const Explore = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <ExploreLoggedIn />
  ) : (
    <ExploreLoggedOut />
  );
};

export default Explore;