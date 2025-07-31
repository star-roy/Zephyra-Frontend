import HomeLoggedIn from "./HomeLoggedIn";
import HomeLoggedOut from "./HomeLoggedOut";
import { useAuth } from "../../auth/AuthContext";

const Home = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <HomeLoggedIn />
  ) : (
    <HomeLoggedOut />
  );
};

export default Home;