import "./Container.css";
import PropTypes from 'prop-types';

const Container = ({ children, className }) => {
    return <div className={`container ${className}`}>{children}</div>;
};

Container.propTypes = {
    className: PropTypes.string,
};


export default Container;