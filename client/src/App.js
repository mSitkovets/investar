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

  return (
    <div>
    <div className="App">

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

    </div>
   </div>
)}

export default App;
