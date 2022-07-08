import Header from "../../Design/Header/Header";
import { useAuthContext } from "../AuthContainer";

// AppHeader = header (design) with app logic
const AppHeader = () => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return <Header onLogout={handleLogout} />;
};

export default AppHeader;