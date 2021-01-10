import React from 'react';
import '../App.css';

import welcome from '../Images/welcome.svg';
import teaching from '../Images/teaching.svg';
import analyse from '../Images/analyse.svg';
import plan from '../Images/plan.svg';
import 'bootstrap/dist/css/bootstrap.min.css'

function Education() {
    return (

        <div>
            <img width="50%" src={welcome} />

            <h2 class="edu">Welcome to Investar, where you can see your money grow in awesome ways. Stocks and investing may sound like big terms, but don't be scared! We are here to help.
            </h2>


            <img width="50%" src={teaching} />
            <h2 class="edu">The stock market is like a grove of fruit trees! The trees rely on their numbers to thrive, yet the survival of the forest as a whole does not rely on the success of any single species of tree.
            </h2>

            <img width="50%" src={analyse} />
            <h2 class="edu">The stock market is like a store where you can buy and sell the trees you own. To do this, people post asking and selling prices on a bulletin board. Once two match, the sale is made.
            </h2>

            <img width="50%" src={plan} />
            <h2 class="edu">And that's all! Time for you to practice!</h2>
            <br></br>
            <hr></hr>
        </div>
    )
}

export default Education;