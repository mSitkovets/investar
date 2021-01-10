import React, { useState, useEffect } from 'react';
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
  // const [query, setQuery] = useState("")
  const [stockResult, setStockResult] = useState();
  const [wallet, setWallet] = useState();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=CA&symbols=TD%2CTSLA%2CBNS%2CACN%2CCM", {
        method: 'GET',
        headers: {
          "x-rapidapi-key": "bf8b1d549amshedfc95df35cd085p1e256bjsn56aa957d4900",
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
        }
      })
      const data = await response.json();
      const walletResponse = await fetch("http://localhost:5000/wallets")
      const walletdata = await walletResponse.json();
      setWallet(walletdata.rows[0].balance)
      setStockResult(data.quoteResponse.result)
    } catch (error) {
      console.log(error)
    }
  }
  const buyStockHandler = async (name, price) => {
    try {
      console.log("buy stock")
      const response = await fetch(`http://localhost:5000/stocks/${name}`)
      const data = await response.json();
      if (data.length > 0) {
        try {
          console.log(data[0].numshares)
          const stockResponse = await fetch(`http://localhost:5000/stocks/buy`, {
            method: 'PUT',
            body: JSON.stringify({
              name,
              numShares: data[0].numshares + 5,
              boughtValue: price
            }),
            headers: {
              'Content-Type': "application/json; charset=UTF-8"
            }

          })
          const stockData = await stockResponse.json();
          console.log(stockData);
        } catch (error) {
          console.error(error.message)
        }
      } else {
        try {
          console.log("react post")
          const stockResponse = await fetch("http://localhost:5000/stocks/buy", {
            method: "POST",
            body: JSON.stringify({
              name,
              numShares: 5,
              boughtValue: price
            }),
            headers: {
              'Content-Type': "application/json; charset=UTF-8"
            }
          })

          const stockData = await stockResponse.json();
          console.log(stockData);
        } catch (error) {
          console.error(error.message)
        }
      }

      try {
        const newBalance = wallet - price;
        if (newBalance >= 0) {
          const walletResponse = await fetch(`http://localhost:5000/wallets/`, {
            method: 'PUT',
            body: JSON.stringify({
              balance: newBalance
            }),
            headers: {
              'Content-Type': "application/json; charset=UTF-8"
            }
          })
          setWallet(newBalance);
        } else {
          console.log("You no longer have balance, would you like to restart?");
          alert("You no longer have balance, would you like to restart?");
        }
      }
      catch (error) {
        console.log(error.message)
      }

    } catch (error) {
      console.error(error.message)
    }
    // try {
    // } catch (error) {

    // }
  }
  return (
    <>{stockResult && <div className="App">
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">
          <img src={logotype} alt="Investar logo" />
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
          <Col xs={4}><img src={giveaway} class="celebrating" alt="Illustration of girl celebrating!" /></Col>
          <Col class="total">

            <p>Your stock portfolio total is <br></br><h1>${wallet}</h1></p>
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
              {stockResult.map(stockData => {
                let name = `${stockData.symbol}(${stockData.longName})`
                return <>
                  <li>${name}</li>
                  <li>${stockData.regularMarketPrice} </li>
                  <Button onClick={() => { buyStockHandler(name, stockData.regularMarketPrice) }} >Buy!</Button>
                </>
              })}
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


    </div>}</>
  );
}

export default App;
