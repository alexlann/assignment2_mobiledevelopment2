import "./Header.css";
import PropTypes from "prop-types";
import Container from "../Container/Container";
import Link from "../Anchor/Anchor";

const Header = ({ onLogout }) => {
  return (
    <header className="header">
      <Container className="flex space-around">
        <Link href="/">
          Swipe
        </Link>
        <Link href="/likes">
          Likes
        </Link>
        <Link color="subtle" onClick={onLogout}>
          Logout
        </Link>
      </Container>
    </header>
  );
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Header;