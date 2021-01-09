import React from 'react';
import './App.css';

import logotype from './logotype.png';
import { Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function Nav(){
    return(
        <Navbar bg="light" variant="light">
            <img src={logotype} width="20%" alt="Investar logo"/>
        </Navbar>
    )
}

export default Nav;