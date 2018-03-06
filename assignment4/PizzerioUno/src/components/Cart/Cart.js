import React from 'react';
import { connect } from 'react-redux';

class About extends React.Component {

    render () {
        return (
            <div>
                <p>no orders!</p>
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {state};
};


export default connect(mapStateToProps)(About);
