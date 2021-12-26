import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { asapScheduler } from 'rxjs';

@Component({
  selector: 'app-encrypted-text',
  templateUrl: './encrypted-text.component.html',
  styleUrls: ['./encrypted-text.component.css']
})
export class EncryptedTextComponent implements OnInit {
  orignalText: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed dolor ac mi fermentum consectetur. Etiam volutpat elit nunc, ac rhoncus felis gravida vitae. Integer vel lorem ullamcorper, volutpat tortor sit amet, bibendum nisi. Sed auctor maximus sapien nec rhoncus. Mauris lacinia lorem at lectus rutrum, nec blandit ante consequat."
  outputText: string = this.encryptText(this.orignalText);

  constructor() { 

  }

  ngOnInit(): void {
  }

  onBegin() {
    let second: number = 1000;
    let duration: number = 2 * second;

    // Copy output text and 
    // resolve it to original text
    let encryptedWords: string[] = this.outputText.split(" ");
    let originalWords: string[] = this.orignalText.split(" ");

    let decryptInterval = setInterval(() => {
      // Decrypt Text 
      let temp: string = "";

      // Iterate each word
      for (let i = 0; i < encryptedWords.length; i++) {
        let word : string = encryptedWords[i];
        let originalWord: string = originalWords[i];

        // Cleverly pick clean char indexes
        let cleanRange: number = 5;

        temp += originalWord.substring(0, cleanRange) + this.randomHex(word.length).substring(cleanRange, 0);
        if (i !== encryptedWords.length - 1) {
          temp += " "
        }
      }
      // Update OutputText
      this.outputText = temp;
    }
    , 0.1 * second);
    setTimeout(clearInterval, duration, decryptInterval)
    // this.outputText = "a";
  }

  decryptWord(index: number, duration: number) {
    let interval: number = 0.2;
    while (duration < 0) {
    }
  }

  encryptText(text: string) {
    console.log("encrypting!")
    let encryptedText: string = "";
    let words: string[] = text.split(" ");

    // Generate random hex for each word
    for (let i = 0; i < words.length; i++) {
      let word: string = words[i];
      encryptedText += this.randomHex(word.length);

      if (i !== words.length - 1) {
        encryptedText += " ";
      }
    }
    return encryptedText;
  }

  randomHex(length: number) {
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
}

