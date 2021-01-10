import React from 'react';
import './App.css';

import yourstocks from './yourstocks.svg';
import { Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function StockSummary(){
    return(
        <div className="stockSummary"><img src={yourstocks} class="img" width="60%"/><h3>Your stocks!</h3>
          <p class="ticker">$TSLA (Tesla) &nbsp; 15 shares</p>
          <p class="update">You bought at $400. It is now <b>$700</b>!</p>

          <p class="ticker">$BNS (Scotiabank) &nbsp; 7 shares</p>
          <p class="update">You bought at $128. It is now <b>$132</b>!</p>

          <p class="ticker">$CM (CIBC) &nbsp; 14 shares</p>
          <p class="update">You bought at $490. It is now <b>$430</b>!</p>

          <p class="ticker">$TD (TD Bank) &nbsp; 4 shares</p>
          <p class="update">You bought at $210. It is now <b>$270</b>!</p>

          <p class="ticker">$ACN (Accenture) &nbsp; 1 shares</p>
          <p class="update">You bought at $128. It is now <b>$270</b>!</p>
          
          </div>

    )
}

export default StockSummary;