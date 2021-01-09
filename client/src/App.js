import logo from './logo.png';
import './App.css';

import giveaway from './giveaway.svg';
import logotype from './logotype.png';
import buy from './buy.svg';
import sell from './sell.svg';
import yourstocks from './yourstocks.svg';

import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap'
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

          <Col><img src={buy} />Buy
          <p>You have a $170 balance. If you want more money, you can sell some shares!</p>
          <ul>
            <li>$TSLA (Tesla)</li>
            <li>$700</li>
            <Button>Buy!</Button>

            <li>$BNS (Scotiabank)</li>
            <li>$700</li>
            <Button>Buy!</Button>

            <li>$CM (CIBC)</li>
            <li>$700</li>
            <Button>Buy!</Button>

            <li>$TD (TD Bank)</li>
            <li>$700</li>
            <Button>Buy!</Button>

            <li>$ACN (Accenture)</li>
            <li>$700</li>
            <Button>Buy!</Button>
          </ul>
          
          </Col>

          <Col><img src={sell} />Sell
          <p>Want to lock-in your profit? Or not feeling super hopeful about a company? Then sell!</p>
            <ul>
              <li>$TSLA (Tesla)</li>
              <li>15 shares</li>
              <Button>Sell!</Button>

              <li>$BNS (Scotiabank)</li>
              <li>7 shares</li>
              <Button>Sell!</Button>

              <li>$CM (CIBC)</li>
              <li>14 shares</li>
              <Button>Sell!</Button>

              <li>$TD (TD Bank)</li>
              <li>4 shares</li>
              <Button>Sell!</Button>

              <li>$ACN (Accenture)</li>
              <li>1 share</li>
              <Button>Sell!</Button>
            </ul>
          
          </Col>
        </Row>
      </Container>


    </div>
  );
}

export default App;
