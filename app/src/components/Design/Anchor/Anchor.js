import "./Anchor.css";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Anchor = ({ className, href, color = "primary", onClick, children}) => {
    if (href) {
        return (
            <Link
                to={href}
                className={`link link--${color} ${className}`}
                onClick={onClick}
            >
                {children}
            </Link>
        )
    }
    return (
        <button className={`link link--${color} ${className}`} onClick={onClick}>
            {children}
            
        </button>
    );
};

Anchor.propTypes = {
    color: PropTypes.oneOf(["primary", "subtle"]),
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.string,
};

export default Anchor;