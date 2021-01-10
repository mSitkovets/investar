import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import './App.css';
import React, {useState} from "react";

import Summary from './Summary.js';
import Nav from './Nav.js';
import StockSummary from './StockSummary.js';

import buy from './buy.svg';
import sell from './sell.svg';

import { Modal, InputGroup, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
 
const App = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

function App() {
  const [stockResult, setStockResult] = useState();
  const [userStocks, setUserStocks] = useState([]);
  const [wallet, setWallet] = useState();
  useEffect(() => {
    getData();
    async function fetchStocks() {
      const stocks = await getStocks();
      setUserStocks(stocks)
    }
    fetchStocks()
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

  const getStocks = async () => {
    try {
      const stockResponse = await fetch("http://localhost:5000/stocks/")
      const stockData = await stockResponse.json();
      const stocks_info = stockData.reduce((stocks_info, stock) => [...stocks_info, [stock["name"], stock["numshares"]]], [])
      console.log(stocks_info);
      return stocks_info
    } catch (error) {
      console.error(error.message)
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
        const newBalance = Math.round((wallet - 5 * price) * 100) / 100;
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
  }

  const sellStockHandler = async (name, numShares) => {
    try {
      const companySymbol = name.substr(0, name.indexOf('('));
      const apiResponse = await fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=CA&symbols=${companySymbol}`, {
        method: 'GET',
        headers: {
          "x-rapidapi-key": "bf8b1d549amshedfc95df35cd085p1e256bjsn56aa957d4900",
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
        }
      })
      const data = await apiResponse.json();
      let companyValue = data.quoteResponse.result[0].regularMarketPrice;

      const stockResponse = await fetch(`http://localhost:5000/stocks/sell`, {
        method: 'PUT',
        body: JSON.stringify({
          name,
          numShares: numShares - 2,
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
    // try {
    //   const newBalance = wallet + (price * numShares);
    //   if (newBalance >= 0) {
    //     const walletResponse = await fetch(`http://localhost:5000/wallets/`, {
    //       method: 'PUT',
    //       body: JSON.stringify({
    //         balance: newBalance
    //       }),
    //       headers: {
    //         'Content-Type': "application/json; charset=UTF-8"
    //       }
    //     })
    //     setWallet(newBalance);
    //   } else {
    //     console.log("You no longer have balance, would you like to restart?");
    //     alert("You no longer have balance, would you like to restart?");
    //   }
    // }
    // catch (error) {
    //   console.log(error.message)
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

          <Col><img src={yourstocks} />Your stocks!
            <ul>
              {userStocks.map((stock, index) => {
                console.log(stock)
                return (
                  <div key={index}>
                    <li>${stock[0]} {stock[1]} shares</li>
                    <p>message</p>
                  </div>
                )
              })}
            </ul>
          </Col>

          <Col><img src={buy} />Buy
          <p>You have a $170 balance. If you want more money, you can sell some shares!</p>
            <ul>
              {stockResult.map((stockData, index) => {
                let name = `${stockData.symbol}(${stockData.longName})`
                return (
                  <div key={index}>
                    <li>${name}</li>
                    <li>${stockData.regularMarketPrice} </li>
                    <Button onClick={() => { buyStockHandler(name, stockData.regularMarketPrice) }} >Buy!</Button>
                  </div>
                )
              })}
            </ul>

          </Col>

          <Col><img src={sell} />Sell
          <p>Want to lock-in your profit? Or not feeling super hopeful about a company? Then sell!</p>
            <ul>
              {userStocks.map((stock, index) => {
                console.log(stock)
                return (
                  <div key={index}>
                    <li>${stock[0]}</li>
                    <li>${stock[1]} </li>
                    <Button onClick={() => { sellStockHandler(stock[0], stock[1]) }}>Sell!</Button>
                  </div>
                )
              })}
            </ul>

          </Col>
        </Row>
      </Container>

    <Nav />

    <div>
        <h2>Hello, fellow star! 👋</h2>
    </div>

  <Summary />

<div>
  <div>

    <StockSummary />

    <div className="buySummary"><img src={buy} class="img" width="60%"/><h3>Buy</h3>
    <p>You have a $170 balance. If you want more money, you can sell some shares!</p>
    
    <ul>
      <li>$TSLA (Tesla)</li>
      <li>$700</li>

      <button type="button" class="buyButton" onClick={handleShowEditModal}>Buy!</button>

      {/* <Modal show={showEditModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
            <Modal.Title>Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h1>hello</h1>
              <InputGroup className="mb-3">
                {/* <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={changedName}
                  onChange={(e) => setChangedName(e.target.value)}
                /> */}
               {/* </InputGroup>
            </Modal.Body>
      </Modal>  */}

      <li>$BNS (Scotiabank)</li>
      <li>$700</li>

    
      <li>$CM (CIBC)</li>
      <li>$700</li>

    
      <li>$TD (TD Bank)</li>
      <li>$700</li>

      

      <li>$ACN (Accenture)</li>
      <li>$700</li>

     

    </ul>
    
    </div>

    <div className="sellSummary"><img src={sell} class="img" width="60%"/><h3>Sell</h3>
    <p>Want to lock-in your profit? Or not feeling super hopeful about a company? Then sell!</p>
      <ul>
        <li>$TSLA (Tesla)</li>
        <li>15 shares</li>
        <button type="button" class="sellButton">Sell!</button>

        <li>$BNS (Scotiabank)</li>
        <li>7 shares</li>
        <button type="button" class="sellButton">Sell!</button>

        <li>$CM (CIBC)</li>
        <li>14 shares</li>
        <button type="button" class="sellButton">Sell!</button>

        <li>$TD (TD Bank)</li>
        <li>4 shares</li>
        <button type="button" class="sellButton">Sell!</button>

        <li>$ACN (Accenture)</li>
        <li>1 share</li>
        <button type="button" class="sellButton">Sell!</button>
      </ul>
    
      </div>
    </div>
  </div>

    <footer>
      <p>SheHacks 2021 Hackathon project by Maria, Hanniya, &amp; Jaishree</p>
    </footer>

    </div>}</>
  );
}

export default App;
