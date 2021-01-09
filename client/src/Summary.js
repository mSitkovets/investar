import React from 'react';
import './App.css';

import giveaway from './giveaway.svg';
import graph from './graph.png';
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function Summary(){
    return(
        <Container>
        <Row>
          <Col xs={4}><img src={giveaway} class="celebrating" alt="Illustration of girl celebrating!"/></Col>
          <Col className="total">

            <p>Your stock portfolio total is <br></br><h1>$890</h1></p>
          </Col>
          <Col className="profit">
            <p>Today you made <br></br><h1>$120</h1></p>
          </Col>
          <Col className="rate">
          
            <p>Your return rate is <br></br><h1>4.3%</h1></p>
          </Col>
        </Row>
        

        <img src={graph} class="graph" width="80%" alt="Stock growth graph"/>
      </Container>

    )
}

export default Summary;