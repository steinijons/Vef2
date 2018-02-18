import React from 'react';

class Container extends React.Component {
    render() {
        const children = this.props.children;
        return (
            <div className="container">
                {children}
                {children}
            </div>
        );
    }
}

export default Container;
