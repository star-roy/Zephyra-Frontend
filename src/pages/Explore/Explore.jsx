import ExploreLoggedOut from "./ExploreLoggedOut";
import ExploreLoggedIn from "./ExploreLoggedIn";
import { useSelector } from "react-redux";

const Explore = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? (
    <ExploreLoggedIn />
  ) : (
    <ExploreLoggedOut />
  );
};

export default Explore;