import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import Container from './components/Container/Container';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
              <h2>Hello love</h2>
            </Container>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<Adduser />, document.getElementById(''))
