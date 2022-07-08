import "./List.css";
import PropTypes from "prop-types";

const List = ({children, className}) => {
    return (
        <ul className={`list ${className}`}>
            {children}
        </ul>
    )
}

List.propTypes = {
    className: PropTypes.string,
}

export default List;