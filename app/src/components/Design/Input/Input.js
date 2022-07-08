import "./Input.css";
import PropTypes from 'prop-types';

const Input = ({ value, name, placeholder, onChange }) => {
    return (
        <input className="input" onChange={onChange} id={name} name={name} value={value} placeholder={placeholder}/>
    );
};

Input.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default Input;