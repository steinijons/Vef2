import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container/Container';
import '../styles/site';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <h2>I am a title</h2>
            </Container>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
