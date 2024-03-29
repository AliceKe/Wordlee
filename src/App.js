import './App.css';
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import React, {createContext, useEffect, useState} from 'react';
import { boardDefault, generateWordSet } from "./Words";
import GameOver from './components/GameOver';
import Timer from './components/Timer';
import background from "./assets/mountains.jpg";
import sound from "./assets/sunrays.wav";
import {SiApplemusic} from 'react-icons/si'

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});
  const [correctWord, setCorrectWord] = useState("");
  const [wordHint, setWordHint] = useState("");
  const [counter, setCounter] = useState(300);
  const audioElement = new Audio(sound);
  const [isPlaying, setIsPlaying] = useState(false)

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
    if (currAttempt.letterPos === 0) return;
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

    // if (wordSet.has(currWord.charAt(0).toUpperCase() + currWord.slice(1).toLowerCase())) {
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({attempt: currAttempt.attempt +1, letterPos: 0});
    } else{
      console.log(currWord)
      alert("Word not found");
    }

    // if (currWord === correctWord){
    if (currWord.toLowerCase() === correctWord) {
      setGameOver({gameOver: true, guessedWord: true});
      return;
    } 

    console.log(currAttempt);
    if (currAttempt.attempt === 5) {
      setGameOver({gameOver: true, guessedWord: false});
    }
  };

  const togglePause = () => {
    if (isPlaying) {
      // Pause the song if it is playing
      audioElement.pause();
    } else {
      // Play the song if it is paused
      audioElement.play();
    }
    // Change the state of song
    setIsPlaying( { isPlaying: !isPlaying })
    console.log(isPlaying)
  }

  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>  
      <nav>
        <h1>Wordle</h1>
      </nav>
      {!gameOver.gameOver &&
        <Timer min = {0}/>
      }
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
          <button
            onClick = {togglePause}
            className = "sound"
            >
            {/* <AiFillPlayCircle/> */}
            <SiApplemusic/>
          </button>    
        <Board/>
        {!gameOver.gameOver && <div>
          <br /> 
          Hint: {wordHint}
        </div>}
        {gameOver.gameOver ? <GameOver/> : <Keyboard/>}
      </AppContext.Provider>
    </div>
  );
}

export default App;
