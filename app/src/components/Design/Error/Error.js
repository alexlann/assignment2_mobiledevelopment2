import "./Error.css";
import PropTypes from "prop-types";

const Error = ({children, color="primary"}) => {
    return (
        <div className={`error error--${color}`} >
            {children}
        </div>
    )
}

Error.propTypes = {
    color: PropTypes.oneOf(["primary", "warning"]),
    children: PropTypes.string,
}

export default Error;