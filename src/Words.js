// import wordBank from "./word-bank.txt";
import {wordBank} from "./Hints.js";

export const boardDefault = [
    ["", "", "", "", ""], 
    ["", "", "", "", ""],
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""],
];

export const generateWordSet = async () => {
    const wordSet = new Set(Object.keys(wordBank))
    let todaysWord = Array.from(wordSet)[Math.floor(Math.random() * wordSet.size)];
    let todaysHint = wordBank[todaysWord];

    console.log(todaysWord, todaysHint)
    console.log(wordSet)
     return {wordSet, todaysWord, todaysHint};
};