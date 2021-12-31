import { Component, OnInit } from '@angular/core';


interface Word {
  original: string;
  encrypted: string;
  finished: boolean;
  ignoredIndexes: number[];
}

@Component({
  selector: 'app-encrypted-text',
  templateUrl: './encrypted-text.component.html',
  styleUrls: ['./encrypted-text.component.css']
})
export class EncryptedTextComponent implements OnInit {

  constructor() {}
  text1: string = `async onBegin() {
  let btn: any = document.querySelector("button");
  btn.disabled = true;
  console.log(btn)
  if (this.decrypted) {
    // RESET
    this.ngOnInit()
    this.decrypted = false;
    this.buttonText = "BEGIN";
    this.progress = 0;
    btn.disabled  = false;
    return;
  }
  // Max iteration count is equal to
  // the length of the longest word
  let iteration = 0;
  let step = 100 / this.maxWordLength;
  let sleepDuration: number = 120;
  
  let intervals: any[] = this.animateButtonText();
  // Until all the Words are finished
  while (!this.wordsFinished(this.words)) {
    // Decrypt Words
    for (let word of this.words) {
      if (!word.finished) {
        this.decryptWord(word);
      }
    }
    // Update encryptedText view
    this.encryptedText = ((): string => {
      let text = "";
      for (let word of this.words) {
        text += word.encrypted;
      }
      return text;
    })();
    
    iteration++;
    this.progress = iteration * step;
    await sleep(
      randomInt(sleepDuration, sleepDuration + iteration * 10)
      );
  }
  // Clear animation
  this.clearButtonAnimation(intervals);
  this.decrypted = true;
  this.buttonText = "RESET";
  btn.disabled = false;
}`;
  text2: string = `decryptString(originalString: string, 
              ignoredIndexes: number[]): string {
  
  let decryptedString: string = "";

  // Pick a random index to decrypt
  let randomIndex = randomInt(0, originalString.length);

  // Check if index should be ignored
  while (ignoredIndexes.includes(randomIndex)) {
    randomIndex = randomInt(0, originalString.length);
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
  return decryptedString
  }`;
  text3: string = `encryptString(str: string) {
  let encrypted: string = "";

  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      encrypted += " ";
    } 
    else if (
        i < str.length - 2 && 
        str.substring(i, i + 1) === "\\n"
        ) {
      encrypted += "\\n";
    }
    else {
      encrypted += randomHex(1);
    }
  }
  return encrypted;
}`;
  texts: string[] = [this.text1, this.text2, this.text3];
  originalText: string = "";
  encryptedText: string = "";
  words: Word[] = [];
  maxWordLength: number = 0;
  
  progress: number = 0;
  decrypted: boolean = false;
  buttonText: string = "BEGIN";

  textSelection: number = -1;

  ngOnInit(): void {
    // Round robin texts
    this.textSelection < this.texts.length - 1 ? this.textSelection += 1 : this.textSelection = 0;

    console.log(this.textSelection);
    this.originalText = this.texts[this.textSelection];
    this.encryptedText = this.encryptString(this.originalText);
    // Generate Word objects from original and output text
    this.words = ((): Word[] => {
      let words: Word[] = [];
      let originalList: string[] = this.originalText.split(/(\s)/);
      let encryptedList: string[] = this.encryptedText.split(/(\s)/);

      let originalListClone: string[] = [...originalList];
      this.maxWordLength = originalListClone.sort((a, b) => b.length - a.length)[0].length
      console.log(this.maxWordLength)
  
      for (let i = 0; i < encryptedList.length; i++) {
        let originalStr: string = originalList[i];
        let encryptedStr: string = encryptedList[i];

        // if original word is an empty string or contains only spaces
        // then consider the word finished
        let word: Word = {original: originalStr, 
          encrypted: encryptedStr,
          finished: !originalStr || this.containsOnlySpaces(originalStr) ? true : false, 
          ignoredIndexes: []
        };
        words.push(word);
      }
      return words;
    }) ();
  }

  async onBegin() {
    let btn: any = document.querySelector("button");
    btn.disabled = true;
    console.log(btn)
    if (this.decrypted) {
      // RESET
      this.ngOnInit()
      this.decrypted = false;
      this.buttonText = "BEGIN";
      this.progress = 0;
      btn.disabled  = false;
      return;
    }
    // Max iteration count is equal to
    // the length of the longest word
    let iteration = 0;
    let step = 100 / this.maxWordLength;
    let sleepDuration: number = 120;
    
    let intervals: any[] = this.animateButtonText();
    // Until all the Words are finished
    while (!this.wordsFinished(this.words)) {
      // Decrypt Words
      for (let word of this.words) {
        if (!word.finished) {
          this.decryptWord(word);
        }
      }
      // Update encryptedText view
      this.encryptedText = ((): string => {
        let text = "";
        for (let word of this.words) {
          text += word.encrypted;
        }
        return text;
      })();
      
      iteration++;
      this.progress = iteration * step;
      await sleep(
        randomInt(sleepDuration, sleepDuration + iteration * 10)
        );
    }
    // Clear animation
    this.clearButtonAnimation(intervals);
    this.decrypted = true;
    this.buttonText = "RESET";
    btn.disabled = false;
  }

  animateButtonText(): any[] {
    let wait = 500;
    let animateInterval1 = setInterval(() => {
      this.buttonText = "DECRYPTING.  ";
    }, wait);
    let animateInterval2 = setInterval(() => {
      this.buttonText = "DECRYPTING.. ";
    }, wait + 500);
    let animateInterval3 = setInterval(() => {
      this.buttonText = "DECRYPTING...";
    }, wait + 1000);
    return [animateInterval1, animateInterval2, animateInterval3];
  }

  clearButtonAnimation(intervals: any[]) {
    for (let interval of intervals ) {
      clearInterval(interval);
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
    word.encrypted = this.decryptString(word.original, word.ignoredIndexes);
    if (word.encrypted.length === word.ignoredIndexes.length) {
      word.finished = true;
    }
  }
  
  decryptString(originalString: string, ignoredIndexes: number[]): string {
    let decryptedString: string = "";
    
    // Pick a random index to decrypt
    let randomIndex = randomInt(0, originalString.length);
    
    // Check if index should be ignored
    while (ignoredIndexes.includes(randomIndex)) {
      randomIndex = randomInt(0, originalString.length);
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
    return decryptedString
  }

  encryptString(str: string): string {
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

  containsOnlySpaces(str: string): boolean {
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
