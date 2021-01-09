import logo from './logo.png';
import './App.css';

import giveaway from './giveaway.svg';
import logotype from './logotype.png';
import buy from './buy.svg';
import sell from './sell.svg';
import yourstocks from './yourstocks.svg';

import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home">
            <img src={logotype} alt="Investar logo"/>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#index">Home</Nav.Link>
            <Nav.Link href="#dictionary">Dictionary</Nav.Link>
          </Nav>
        </Navbar>

      <Container>
        <Row>
          <Col><h2>Hello, fellow star! 👋</h2></Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col xs={4}><img src={giveaway} class="celebrating" alt="Illustration of girl celebrating!"/></Col>
          <Col class="total">

            <p>Your stock portfolio total is <br></br><h1>$890</h1></p>
          </Col>
          <Col class="profit">
            <p>Today you made <br></br><h1>$120</h1></p>
          </Col>
          <Col class="rate">
          
            <p>Which means your return rate is <br></br><h1>4.3%</h1></p>
          </Col>
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
