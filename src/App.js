import './App.css';
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import React, {createContext, useEffect, useState} from 'react';
import { boardDefault, generateWordSet } from "./Words";
import GameOver from './components/GameOver';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});
  const [correctWord, setCorrectWord] = useState("");
  const [wordHint, setWordHint] = useState("");

  useEffect( () => {
    generateWordSet().then( (words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
      setWordHint(words.todaysHint);
    })
  }, []);

  const onSelectLetter = (keyVal) =>{
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({attempt: currAttempt.attempt, letterPos: currAttempt.letterPos +1})
  }

  const onDelete = () =>{
    if (currAttempt.letterPos== 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos- 1] = "";
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos-1})
  }

  const onEnter = () =>{
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i  = 0; i < 5; i ++){
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({attempt: currAttempt.attempt +1, letterPos: 0});
    } else{
      alert("Word not found");
    }

    if (currWord === correctWord){
      setGameOver({gameOver: true, guessedWord: true});
      return;
    } 

    console.log(currAttempt);
    if (currAttempt.attempt === 5) {
      setGameOver({gameOver: true, guessedWord: false});
    }
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value = {{
          board, 
          setBoard, 
          currAttempt, 
          setCurrAttempt, 
          onSelectLetter, 
          onDelete, 
          onEnter, 
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
          }}>
        <Board/>
        <div>
          Hint: {wordHint}
        </div>
        {gameOver.gameOver ? <GameOver/> : <Keyboard />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
