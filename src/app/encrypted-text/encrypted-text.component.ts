import { Component, OnInit } from '@angular/core';

interface Word {
  original: string;
  output: string;
  finished: boolean;
  ignoredIndexes: number[];
}

@Component({
  selector: 'app-encrypted-text',
  templateUrl: './encrypted-text.component.html',
  styleUrls: ['./encrypted-text.component.css']
})


export class EncryptedTextComponent implements OnInit {
  // "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed sed dolor ac mi fermentum consectetur."
  // "Learn one way to build applications with \nAngular and reuse your code and abilities to build apps for any \ndeployment target. For web, \nmobile web, \nnative mobile \nand native desktop."
  originalText: string = "Learn one way to build applications with \nAngular and reuse your code\n and abilities to build apps for any deployment target. \nFor web, \nmobile web, \nnative mobile \nand native desktop.";
  outputText: string = this.encryptString(this.originalText);
  words: Word[] = [];

  constructor() {}

  ngOnInit(): void {
    // Generate Word objects from original text
    this.words = ((): Word[] => {
      // Generate Words from encryptedText
      let words: Word[] = [];
      let encryptedList = this.outputText.split(/(\s)/);
      let originalList = this.originalText.split(/(\s)/);
  
      for (let i = 0; i < encryptedList.length; i++) {
        let word = {original: originalList[i], 
                    output: encryptedList[i],
                    // if word doesn't have any valid character
                    // meaning str has "" or only spaces consider it finished
                    finished: this.hasNoValidCharacter(originalList[i]) ? true : false, 
                    ignoredIndexes: this.getSpecialCharIndexesOf(originalList[i])
                  } as Word;
        words.push(word);
        console.log(word)
      }
      return words;
    }) ();
  }
  
  
  
  async onBegin() {
    let iteration = 0;

    // Until all words are finished
    while (!this.wordsFinished(this.words)) {
      // If word is not finihed decrypt that word
      for (let word of this.words) {
        if (!word.finished) {
          this.decryptWord(word);
        }
      }
      // Update encryptedText view
      this.outputText = ((): string => {
        let text = "";
        for (let word of this.words) {
          text += word.output;
        }
        return text;
      })();

      iteration++;
      console.log("Iteration: ", iteration);

      await sleep(randomInt(75, 75 + iteration * 10));
    }
  }

  wordsFinished(words: Word[]): boolean {
    for (let word of words) {
      if (!word.finished) {
        return false;
      }
    }
    return true;
  }

  decryptWord(word: Word) {
    console.log("decyptWord()")
    if (word.output === "") {
      word.finished = true;
      return;
    }
    word.output = this.decryptString(word.original, word.ignoredIndexes);
    if (word.output.length === word.ignoredIndexes.length) {
      word.finished = true;
    }
  }
  
  decryptString(originalString: string, ignoredIndexes: number[]): string {
    console.log("decyptString()")
    console.log("Original str: ", "'" + originalString + "'")
    let decryptedString: string = "";
    
    // Pick a random index to decrypt
    let randomIndex = randomInt(0, originalString.length);
    
    // Check if index should be ignored
    while (ignoredIndexes.includes(randomIndex)) {
      randomIndex = randomInt(0, originalString.length);
      // If selected index if a space break
      // so that it'll be added to the ignored indexes
      if (originalString[randomIndex] === " ") {
        console.log("Space detected: ", "'" + originalString[randomIndex] + "'")
        break;
      }
    }
    // Add random index to ignoreed indexes
    // so that char will be replaced with original text
    ignoredIndexes.push(randomIndex);
    
    // Build decrypted string
    for (let i = 0; i < originalString.length; i++) {
      // If index alredy decrypted
      if (ignoredIndexes.includes(i)) {
        decryptedString += originalString[i];
      } else {
        decryptedString += randomHex(1);
      }
    }
    console.log("Decrypted str: ", "'" + decryptedString + "'")
    return decryptedString
  }

  encryptString(str: string): string {
    console.log("encryptString()")
    let encrypted: string = "";

    for (let i = 0; i < str.length; i++) {
      if (str[i] === " ") {
        encrypted += " ";
      } else if (i < str.length - 2 && str.substring(i, i + 1) === "\n") {
        encrypted += "\n";
      }
      else {
        encrypted += randomHex(1);
      }
    }
    return encrypted;
  }

  getSpecialCharIndexesOf(str: string): number[] {
    let indexes: number[] = [];

    for (let i = 0; i < str.length; i++) {
      if (str[i] === " ") {
        indexes.push(i);
      } else if (i < str.length - 2 && str.substring(i, i + 1) === "\n") {
        console.warn("New line detected at: ", i);
        indexes.push(i);
        indexes.push(i + 1);
      }
    }
    return indexes;
  }

  hasNoValidCharacter(str: string): boolean {
    if (str === "") {
      return true;
    }
    for (let chr of str) {
      if (chr !== " ") {
        return false;
      }
    }
    return true;
  }
}

function randomHex(length: number): string {
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

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}
