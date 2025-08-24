import NavbarLoggedIn from "./NavbarLoggedIn";
import NavbarLoggedOut from "./NavbarLoggedOut";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? (
    <NavbarLoggedIn />
  ) : (
    <NavbarLoggedOut />
  );
};

export default Navbar;