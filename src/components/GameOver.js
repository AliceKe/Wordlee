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
        
        {gameOver.guessedWord ? 
            <audio 
                src = "../assets/ovation.mp3"
                autoPlay
                volume="0.9"
                >
                    Your browser does not support the <code>audio</code> element.
            </audio> : 
            <audio 
                src = "../assets/Sad_Trombone.mp3"
                autoPlay
                volume="1.0"
                >
            </audio>
        }
    </div>
    );
}

export default GameOver;
