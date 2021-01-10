import React, { useState, useEffect } from 'react';
import './App.css';

import logo from './logo.png';	
import yourstocks from './yourstocks.svg';
import Summary from './Summary.js';
import StockSummary from './StockSummary.js';
import giveaway from './giveaway.svg';	
import logotype from './logotype.png';

import Nav from './Nav.js';
import Education from './components/Education'

import buy from './buy.svg';
import sell from './sell.svg';

import { Container, Row, Col, Navbar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


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
      setWallet(walletdata.rows[0].balance)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const getStocks = async () => {
    try {
      const stockResponse = await fetch("http://localhost:5000/stocks/")
      const stockData = await stockResponse.json();
      const stocks_info = stockData.reduce((stocks_info, stock) => [...stocks_info, [stock["name"], stock["numshares"]]], [])
      console.log('HERE', stocks_info);
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
              numShares: data[0].numshares + 1,
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
              numShares: 1,
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
        const newBalance = Math.round((wallet - 1 * price) * 100) / 100;
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
          numShares: numShares - 1,
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
      console.log(prevDayBalance)
      currentBalance = wallet;
      console.log('1.', currentBalance)
      console.log(apiResult);
      console.log(userStocks);
      userStocks.map(stock => {
        const companySymbol = stock[0].substr(0, stock[0].indexOf('('));
        const company = apiResult.filter(result => {
          return result.symbol === companySymbol
        })
        currentBalance = Math.round((currentBalance + (company[0].regularMarketPrice) * stock[1]) * 100) / 100;
        console.log('2.', currentBalance)
      })
      currentBalance = currentBalance - prevDayBalance;
      console.log('3.', currentBalance)
      setTodayProfit(currentBalance)
    } catch (error) {
      console.error(error.message);
    }

  }

  return (
    <>{stockResult && <div className="App">
      <Nav />
      <Education/>
      
      <Container>
        <Row>
          <Col><h2>Hello, fellow star! 👋</h2></Col>
        </Row>
      </Container>

      <Summary wallet={wallet} profit = {todayProfit}/>

      <Container>
        <Row>

          <Col className="stockSummary"><img src={yourstocks} /><h3>Your stocks!</h3>
            <ul>
              {userStocks.map((stock, index) => {
                console.log(stock)
                return (
                  <div key={index}>
                     <p class="ticker">${stock[0]} {stock[1]} shares</p>
                     <p class="update">You bought at $400. It is now <b>$700</b>!</p>
                  </div>
                )
              })}
            </ul>
          </Col>

          <Col className="buySummary"><img src={buy} />
            <h3>Buy</h3>
          <p>You have a ${wallet} balance. If you want more money, you can sell some shares!</p>
            <ul>
              {stockResult.map((stockData, index) => {
                let name = `${stockData.symbol}(${stockData.longName})`
                return (
                  <div key={index}>
                    <p class="ticker">${name}</p>
                    <p class="ticker">${stockData.regularMarketPrice} </p>
                    <Button bsPrefix="buyButton" onClick={() => { buyStockHandler(name, stockData.regularMarketPrice) }} >Buy!</Button>
                  </div>
                )
              })}
            </ul>

          </Col>

          <Col className="sellSummary"><img src={sell} />
            <h3>Sell</h3>
          <p>Want to lock-in your profit? Or not feeling super hopeful about a company? Then sell!</p>
            <ul>
              {userStocks.map((stock, index) => {
                console.log(stock)
                return (
                  <div key={index}>
                     <p class="ticker">${stock[0]}</p>
                     <p class="ticker">{stock[1]} </p>
                    <Button  bsPrefix="sellButton" onClick={() => { sellStockHandler(stock[0], stock[1]) }}>Sell!</Button>
                  </div>
                )
              })}
            </ul>

          </Col>
        </Row>
      </Container>

      <footer class="footer">SheHacks 2021 Hackathon Project</footer>

    </div>}</>
  );
}

export default App;
