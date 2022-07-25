import words from "./word-bank.txt";

var wordBank = {
    "Alice": "", 
    "Blues" :  "",
    "Plank" : ":)"
}

fetch(words)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      for (const element of wordArr) {
        const e = element.toString()
        wordBank[e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()] = "";
      }
    });

console.log(wordBank)

export {wordBank};