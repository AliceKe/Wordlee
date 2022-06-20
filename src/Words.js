import wordBank from "./word-bank.txt";

export const boardDefault = [
    ["", "", "", "", ""], 
    ["", "", "", "", ""],
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""],
];


const words = {
    "alice": "blues", 
    "right" : "wrong",
    "trust" : "faith",
    "mouth" : "noses",
    "flung" : "frost"
};

export const generateWordSet = async () => {
    let wordSet = new Set(["Alice", "Ke"]);
    let todaysWord = "Alice";
    let todaysHint = "I am not Chinese :(";

    // await fetch(wordBank)
    //     .then((response) => response.text())
    //     .then( (result) => {
    //         const wordArr = result.split("\n");
    //         todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
    //         wordSet = new Set(wordArr);
    //     });

    console.log(words);

     return {wordSet, todaysWord, todaysHint};
};