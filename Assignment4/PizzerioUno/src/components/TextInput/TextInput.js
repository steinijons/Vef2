import React from 'react';
import { PropTypes } from 'prop-types';

const TextInput = ({onChange, name, value, type/*, validate*/}) => {
    return (
        <div>
            <input type={type} name={name} value={value} onChange={onChange} className="input input-big"/>
        </div>
    );
};

TextInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    validate: PropTypes.func
};

TextInput.defaultProps = {
    type: 'text',
    //validate: () => ''
};

export default TextInput;
