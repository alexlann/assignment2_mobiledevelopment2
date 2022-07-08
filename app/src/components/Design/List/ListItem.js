import "./List.css";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const ListItem = ({children, onClick, active = false, href}) => {
    const clickableClass = onClick ? "list-item-clickable" : '';
    const activeClass = active ? "list-item-clickable--active" : '';

    if(href) {
        return (
            <Link to={href} onClick={onClick} className={`list-item list-item-a ${activeClass} ${clickableClass}`}>
                {children}
            </Link>
        )
    }
    return (
        <li onClick={onClick} className={`list-item ${activeClass} ${clickableClass}`}>
            {children}
        </li>
    )
}

ListItem.propTypes = {
    onClick: PropTypes.func,
    active: PropTypes.bool,
}

export default ListItem;