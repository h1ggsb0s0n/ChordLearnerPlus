
import ChordFactory from "/ChordLearnerPlus/js/ChordFactory.js";
import Octave from "/ChordLearnerPlus/js/Octave.js";
import CircleOfFifths from "/ChordLearnerPlus/js/CircleOfFifths.js";

class Logic{

constructor(numberOfNotes){
  this.circleOfFifths = new CircleOfFifths();
  this.octave = new Octave();
  this.noteArray = this.prepareNoteArray(numberOfNotes);
  this.currentNote = this.noteArray[0];
  this.solution = this.octave.returnChord(this.currentNote);
  this.answer = [];
  this.index = 0;

}



prepareNoteArray(numberOfNotes){
  var notes = [];
  var initialNotes = this.circleOfFifths.returnShuffledNotes();
  for(var i = 0; i < numberOfNotes; i++){
    notes.push(initialNotes.pop());
  }
  return notes;

}


nextNote(){
  if(this.index < this.noteArray.length -1){
    this.index += 1;
    console.log(this.index);
    this.currentNote = this.noteArray[this.index];
    this.solution = this.octave.returnChord(this.currentNote);

  }
}

getlengthofNoteArray(){
  return this.noteArray.length;
}

previousNote(){
  if(this.index > 0){
    this.index -= 1;
    this.currentNote = this.noteArray[this.index];
    this.solution = this.octave.returnChord(this.currentNote);

  }
}

getCurrentNote(){
  return this.currentNote;
}

getSolution(){
  return this.solution;
}

getIndex(){
  return this.index;
}

clearAnswer(){
  this.answer = [];
}

checkAnswer(){
}

addToneToAnswer(tone){
  this.answer.push(tone);
}

isToneInChord(tone){
  return this.solution.includes(tone);
}

}
var logic = new Logic(5);

let c = document.getElementById("c");
let d = document.getElementById("d");
let e = document.getElementById("e");
let f = document.getElementById("f");
let g = document.getElementById("g");
let a = document.getElementById("a");
let h = document.getElementById("h");
let c1 =document.getElementById("c1");
let d1 = document.getElementById("d1");
let e1 = document.getElementById("e1");


/*let cSharp = document.getElementById("c#"); //sharps are not working
let dSharp == document.getElementById("d#");
let fSharp = document.getElementById("f#");
let gSharp = document.getElementById("g#");
let aSharp = document.getElementById("a#");
let c1Sharp = document.getElementById("c1#");
let d1Sharp = document.getElementById("d1#");*/



let nextbtn = document.getElementById("nextButton");
let prevbtn = document.getElementById("previousButton");
let question = document.getElementById("question");
let firstNote = document.getElementById("firstNote");
let secondNote = document.getElementById("secondNote");
let thirNote = document.getElementById("thirdNote");

question.innerHTML = logic.getCurrentNote();
firstNote.innerHTML = logic.getSolution()[0];
secondNote.innerHTML = logic.getSolution()[1];
thirdNote.innerHTML = logic.getSolution()[2];


//btn.addEventListener("click", firstFunction);//if we put parantheses () it will fire the function as it reads it
//inside an anonamous function it does not fire it
nextbtn.addEventListener("click", function(){
  nextbtn.style.backgroundColor = "red";
  logic.nextNote();
  question.innerHTML = logic.getCurrentNote();
  firstNote.innerHTML = logic.getSolution()[0];
  secondNote.innerHTML = logic.getSolution()[1];
  thirdNote.innerHTML = logic.getSolution()[2];
});
prevbtn.addEventListener("click", function(){
  prevbtn.style.backgroundColor = "red";
  logic.previousNote();
  console.log(logic.getCurrentNote());
  question.innerHTML = logic.getCurrentNote();
  firstNote.innerHTML = logic.getSolution()[0];
  secondNote.innerHTML = logic.getSolution()[1];
  thirdNote.innerHTML = logic.getSolution()[2];
});

c.addEventListener("click", function(){
  if(logic.isToneInChord("C")){
    c.style.backgroundColor = "green";
  } else {
    c.style.backgroundColor = "red";
    c.style.webkitAnimationName = 'blink';
    c.style.webkitAnimationDuration = '4s';
  }
});
