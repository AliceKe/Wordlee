import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
    const {gameOver, correctWord, currAttempt} = useContext(AppContext);
    return (
    <div className = "gameOver"> 
        <h3> 
            {gameOver.guessedWord ? "Correct" : "Incorrect"}
        </h3>
        <h1>
            Correct answer is: {correctWord}
        </h1>
        {gameOver.guessedWord && (<h3> You guessed in {currAttempt.attempt} attempts</h3>)}
    </div>
    );
}

export default GameOver;
