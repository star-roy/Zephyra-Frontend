import HomeLoggedIn from "./HomeLoggedIn";
import HomeLoggedOut from "./HomeLoggedOut";
import { useSelector } from "react-redux";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  console.log("Home component rendering, isAuthenticated:", isAuthenticated);

  return isAuthenticated ? (
    <HomeLoggedIn />
  ) : (
    <HomeLoggedOut />
  );
};

export default Home;