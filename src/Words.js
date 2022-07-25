import wordBank from "./word-bank.txt";
//import {wordBank} from "./Hints.js";

export const boardDefault = [
    ["", "", "", "", ""], 
    ["", "", "", "", ""],
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""],
];

export const generateWordSet = async () => {
    //const wordSet = new Set(Object.keys(wordBank))
    let wordSet;
    let todaysWord;
    //let todaysWord = Array.from(wordSet)[Math.floor(Math.random() * wordSet.size)];
    //let todaysHint = wordBank[todaysWord];
    //let todaysHint =  "Today’s Wordle starts with a " + todaysWord[0];
    let todaysHint;

    // console.log(todaysWord, todaysHint)
    // console.log(wordSet)
    await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      todaysHint = "Today’s Wordle starts with a " + todaysWord[0].toUpperCase()
      wordSet = new Set(wordArr);
    });

    console.log(wordSet)
    return {wordSet, todaysWord, todaysHint};
};