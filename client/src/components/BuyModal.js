import React, {useRef} from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function BuyModal({wallet, setWallet, showBuyModal, setShowBuyModal, name, price}){
    const buyNumber = useRef();

    const buyStockHandler = async (name, price) => {
        try {
          console.log(buyNumber.current.value);
          const numshares = buyNumber.current.value;
          const response = await fetch(`http://localhost:5000/stocks/${name}`)
          const data = await response.json();
          if (data.length > 0) {
            try {
              console.log(data[0].numshares)
              const stockResponse = await fetch(`http://localhost:5000/stocks/buy`, {
                method: 'PUT',
                body: JSON.stringify({
                  name,
                  numShares: data[0].numshares + numshares,
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

    return(
        <Modal show={showBuyModal} onHide={() => setShowBuyModal(false)}>
            <Modal.Header closeButton>
            <Modal.Title>How many shares of {name} do you want to buy?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <InputGroup className="mb-3">
                <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                ref={buyNumber}
                />
            </InputGroup>
            <p>{name} price: {price}</p>
            <Button variant="primary" onClick={buyStockHandler(name, price)}>
                Submit
            </Button>
            </Modal.Body>
        </Modal>
    );
}

export default BuyModal;