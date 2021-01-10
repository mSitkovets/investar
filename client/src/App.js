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
  const [stockResult, setStockResult] = useState();
  const [userStocks, setUserStocks] = useState([]);
  const [wallet, setWallet] = useState();
  const [todayProfit, setTodayProfit] = useState();
  let currentBalance;
  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      getProfit(data.quoteResponse.result);
      setStockResult(data.quoteResponse.result);
    }
    fetchData();
    async function fetchStocks() {
      const stocks = await getStocks();
      setUserStocks(stocks)
    }
    fetchStocks();

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
      setWallet(walletdata.rows[0].balance);
      return data;
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


    try {

      const newBalance = Math.round((wallet + (companyValue * numShares)) * 100) / 100;;

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
  }

  const getProfit = async (apiResult) => {
    try {
      const prevDayBalanceResponse = await fetch(`http://localhost:5000/portfolios`);
      const prevDayBalance = await prevDayBalanceResponse.json();
      currentBalance = wallet;
      console.log(apiResult);
      userStocks.map(stock => {
        const companySymbol = stock[0].substr(0, stock[0].indexOf('('));
        const company = apiResult.filter(result => {
          return result.symbol === companySymbol
        })
        currentBalance = Math.round((currentBalance + (company[0].regularMarketPrice) * stock[1]) * 100) / 100;
      })
      currentBalance = currentBalance - prevDayBalance;

      setTodayProfit(currentBalance)
    } catch (error) {
      console.error(error.message);
    }

  }
  return (
    <>{stockResult && todayProfit && <div className="App">
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
            <p>Today you made <br></br><h1>${todayProfit}</h1></p>
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
          <p>You have a ${wallet} balance. If you want more money, you can sell some shares!</p>
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


    </div>}</>
  );
}

export default App;
