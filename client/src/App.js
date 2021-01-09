import logo from './logo.png';
import logotype from './logotype.png';
import './App.css';

import giveaway from './giveaway.svg';
import buy from './buy.svg';
import sell from './sell.svg';
import yourstocks from './yourstocks.svg';

import { Navbar, Jumbotron } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home">
            <img src={logotype} />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#index">Home</Nav.Link>
            <Nav.Link href="#dictionary">Dictionary</Nav.Link>
          </Nav>
        </Navbar>
      </header>

      <h2>Hello, fellow star</h2>

      <Container>
        <Row>
          <Col><img src={giveaway} /></Col>
          <Col>Your stock portfolio total is $890</Col>
          <Col>Today you made $120</Col>
          <Col>Which means your return rate is 4.3%</Col>
        </Row>
      </Container>

      <p>graph goes here</p>

      <Container>
        <Row>

          <Col><img src={yourstocks} />Your stocks!</Col>

          <Col><img src={buy} />Buy</Col>

          <Col><img src={sell} />Sell</Col>
        </Row>
      </Container>


    </div>
  );
}

export default App;
