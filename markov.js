// added comments for my understanding

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  // steps
  /*
  init empty map
  loop over the words entered
  define word 
  define next word
  if map does not contain word
    add the word and arr as it's val
  get the word from the chain and push(nextWord) to it's arr and so on

define last word
if map does not contain lastword
   add the last word and an arr with null in it

else get the word from the map and push null to it's value

  */

  makeChains() {
    // init empty map to store words
    let chains = new Map();
    // iterate through the length of every word except the last
    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;
      // if chains map does not contain word
      // then add the word as a key with an empty arr as it's val
      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
      // get the word from chains and push the next word.
      chains.get(word).push(nextWord);
    }
    this.chains = chains;
  }

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return out.join(" ");
  }
}

// let mm = new MarkovMachine(
//   "I do not like them In a house. I do not like them With a mouse. I do not like them Here or there. I do not like them Anywhere. I do not like green eggs and ham. I do not like them, Sam-I-am."
// );

// console.log(mm.makeText());
// console.log(mm.makeText((numWords = 50)));

module.exports = {
  MarkovMachine,
};
