import NavbarLoggedIn from "./NavbarLoggedIn";
import NavbarLoggedOut from "./NavbarLoggedOut";
import { useAuth } from "../../auth/AuthContext";

const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <NavbarLoggedIn />
  ) : (
    <NavbarLoggedOut />
  );
};

export default Navbar;