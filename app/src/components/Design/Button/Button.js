import "./Button.css";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Button = ({ className, href, color = "primary", onClick, type = "button", children, active = true }) => {
    const activeClass = !active ? "btn--passive" : '';
    if (href) {
        return (
            <Link
                to={href}
                className={`btn btn--${color} ${className}`}
                onClick={onClick}
            >
                {children}
            </Link>
        )
    }
    return (
        <button className={`btn btn--${color} ${className} ${activeClass}`} onClick={onClick} type={type}>
            {children}
            
        </button>
    );
};

Button.propTypes = {
    color: PropTypes.oneOf(["primary", "warning"]),
    onClick: PropTypes.func,
    className: PropTypes.string,
    active: PropTypes.bool,
    children: PropTypes.string,
};

export default Button;