import { Component, OnInit } from '@angular/core';

interface Word {
  original: string;
  encrypted: string;
  finished: boolean;
  decryptedIndexes: number[];
}

interface Line {
  words: Word[];
}

@Component({
  selector: 'app-encrypted-text',
  templateUrl: './encrypted-text.component.html',
  styleUrls: ['./encrypted-text.component.css']
})
export class EncryptedTextComponent implements OnInit {
  originalText: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed dolor ac mi fermentum consectetur. Etiam volutpat elit nunc, ac rhoncus felis gravida vitae. Integer vel lorem ullamcorper, volutpat tortor sit amet, bibendum nisi. Sed auctor maximus sapien nec rhoncus. Mauris lacinia lorem at lectus rutrum, nec blandit ante consequat."
  outputText: string = "todo";
  text = {} as Word;
  lines: Line[] = [];
  output = "";

  constructor() { 

  }

  ngOnInit(): void {
  }
  

  // DEBUG PLS
  async onBegin() {
    this.text.original = "original test for the original text";
    this.text.finished = false;
    this.text.decryptedIndexes = [];

    this.lines = readLines(this.text.original);
    for (let line of readLines(this.text.original)) {
      for (let word of line.words) {
        this.output += word.original;
      }
    }
    await sleep(5000)

    this.encryptWord(this.text);
    while (this.text.finished == false) {
      console.log(this.text)
      this.decryptWord(this.text);
      this.output = this.text.encrypted;
      await sleep(10000);
    }
    // let second: number = 1000;
    // let duration: number = 2 * second;

    // // ============================== //
    // // ===      DECRYPT TEXT      === //
    // // ============================== //
    // // Loop: read output
    // let encryptedWords: string[] = this.outputText.split(" ");
    // let originalWords: string[] = this.originalText.split(" ");

    // let decryptInterval = setInterval(() => {
    //   // Decrypt Text 
    //   let temp: string = "";

    //   // Iterate each word
    //   for (let i = 0; i < encryptedWords.length; i++) {
    //     let word : string = encryptedWords[i];
    //     let originalWord: string = originalWords[i];

    //     // Cleverly pick clean char indexes
    //     let cleanRange: number = 5;

    //     temp += originalWord.substring(0, cleanRange) + this.randomHex(word.length).substring(cleanRange, 0);
    //     if (i !== encryptedWords.length - 1) {
    //       temp += " "
    //     }
    //   }
    //   // Update OutputText
    //   this.outputText = temp;
    // }
    // , 0.1 * second);
    // setTimeout(clearInterval, duration, decryptInterval)
    // // this.outputText = "a";
  }


  decryptLine(line: string) {
    let wordList: string[] = line.split(/(\s+)/);
  }

  decryptWord(word: Word): void {
    console.log("decryptWord()");
    let wordLength: number = word.encrypted.length;
    let newEncryptedString: string = "";

    // Select a random char index to decrypt
    // meaning replace with orginal char
    let charIndex: number = randomInt(0, wordLength);

    // Check if selected index is alredy decrypted 
    while (word.decryptedIndexes.includes(charIndex)) {
      charIndex = randomInt(0, wordLength);
    }
    word.decryptedIndexes.push(charIndex);

    // Construct newEncryptedString
    for (let i = 0; i < wordLength; i++) {
      if (word.decryptedIndexes.includes(i)) {
        newEncryptedString += word.original[i];
      } else {
        // Change rest of the indexes with random chars
        newEncryptedString += randomHex(1);
      }
    }
    // Update word
    word.encrypted = newEncryptedString;

    // Check if all words are decrypted
    if (word.encrypted.length === word.decryptedIndexes.length) {
      word.finished = false;
    }

  }

  encryptWord(word: Word) {
    console.log("encrypting!");
    console.warn(word);

    // Generate random hex
    for (let i = 0; i < word.original.length; i++) {
      if (i > 0 && word.original.substring(i, i - 1) === "\n") {
        console.log("New line Detected")
        word.encrypted += word.original[i];
        word.decryptedIndexes.push(i);
      }
      word.encrypted += randomHex(1);
    }
  }
}

function randomHex(length: number) {
  let randomHex: string = "";
  let numbers: string[] = ["0", "1", "2", "3", "4", 
                           "5", "6", "7", "8", "9"];
  let chars: string[] = ["a", "b", "c", "d", "f"];
  let tendency_for_chars: number = 0.1;

  for (let i = 0; i < length; i++) {
    let random: number = Math.random();
    // select a bag but prefer chars
    let bag = random > 0.5 + tendency_for_chars ? numbers : chars;
    // select an item from array randomly
    randomHex += bag[Math.floor(Math.random() * bag.length)];
  }
  return randomHex;
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function readLines(text: string): Line[] {
  let lineList: string[] = text.split("\n");

  let outputLines: Line[] = [];

  for (let line of lineList) {
    let words: string[] = line.split(/(\s+)/);
    let tempLine = {words: []} as Line;
    
    // Create Word
    for (let word of words)  {
      let tempWord = {
        original: word, 
        encrypted: "", 
        finished: false,
        decryptedIndexes: []
      } as Word;

      // Add to Line
      tempLine.words.push(tempWord);
    }
    outputLines.push(tempLine);
  }
  return outputLines;
}

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}
