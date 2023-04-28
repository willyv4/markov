/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require("./markov");
const axios = require("axios");
const fs = require("fs");

function routeFunctions() {
  const url = "https://" || "http://";
  const path = process.argv[2];
  path.includes(url) ? readUrl(path) : readFile(path);
}

routeFunctions();

async function readUrl(path) {
  try {
    const res = await axios.get(path);
    const mm = new MarkovMachine(res.data);
    console.log(mm.makeText());
  } catch (error) {
    console.log(`Error... can't fetch ${path}`, error);
  }
}

function readFile(path) {
  fs.readFile(`${path}`, "utf8", (error, data) => {
    if (error) {
      console.log(`error!!!... can't read ${path}`, error), process.kill(1);
    } else {
      const mm = new MarkovMachine(data);
      console.log(mm.makeText());
    }
  });
}
