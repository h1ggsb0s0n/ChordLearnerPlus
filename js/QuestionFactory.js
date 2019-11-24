import Question from "/ChordLearnerPlus/js/Question.js"
import ChordQuestion from "/ChordLearnerPlus/js/ChordQuestion.js"
import MultipleChoiceQuestion from "/ChordLearnerPlus/js/MultipleChoiceQuestion.js"
import IntervalQuestion from "/ChordLearnerPlus/js/IntervalQuestion.js"
import ChordFactory from "/ChordLearnerPlus/js/ChordFactory.js";
import ScaleFactory from "/ChordLearnerPlus/js/ScaleFactory.js";
import CircleOfFifths from "/ChordLearnerPlus/js/CircleOfFifths.js";
import StepTriadQuestion from "/ChordLearnerPlus/js/StepTriadQuestion.js";

class QuestionFactory {

  constructor(){

    // TODO: rename majorArray => majorKeysShuffled
    this.circleOfFifths = new CircleOfFifths();
    this.chordFactory = new ChordFactory();
    this.scaleFactory = new ScaleFactory();
    this.majorArray = this.createArrayOfNotesMajor(10); //shuffled major keys of the circleOfFifths
    this.minorArray = this.createArrayOfNotesMinor(10); //shuffled minor keys of the circleOfFifths
  }

  //todo does it need a break for default?
    returnArrayOfQuestions(numberOfQuestions){

      let questionArray = [];
      for (var i = 0; i < numberOfQuestions; i++){
          let randomNo = Math.floor(Math.random()*3); //return 0 or 1
          switch(randomNo){
            case 0:
            questionArray.push(this.createChordQuestion());
            break;

            case 1:
            questionArray.push(this.createIntervalQuestion());
            break;

            case 2:
            questionArray.push(this.createStepTriadQuestion());
            break;

            default:
            questionArray.push(this.createChordQuestion());
          }

      }
      return questionArray;
    }


//Easy practice does only use major keys and first, fourth and fifth step
  createStepTriadQuestion(){
    let basenote = this.majorArray.pop();//getBaseNote
    let stepArray = [1,4,5];//determine steps in the scale -> tonika (1), Subdominante(4), Dominante(5)
    let scale = this.scaleFactory.returnMajorScale(basenote);

    this.shuffleArray(stepArray);//get a random step
    let step = stepArray.shift();
    this.refillKeyArray();
    console.log("StepArray: "+ stepArray)
    return new StepTriadQuestion(scale, scale.returnTriad(step), scale.returnStep(step), scale.returnStep(stepArray.shift()), scale.returnStep(stepArray.shift()));
  }



 //be carefull -> pass by value
 // TODO: pop() does not make sense
  createIntervalQuestion(){
    var intervals = this.circleOfFifths.getIntervals();
    var question = new IntervalQuestion(intervals.pop(), intervals.pop(), intervals.pop(), intervals.pop());
    return question;
  }

//todo Refactor
  createChordQuestion(){//
    let chord = null;
    var randomNo = Math.floor(Math.random()*2); //return 0 or 1
    switch(randomNo){
      case 0: // creates major chord question
      chord = this.chordFactory.returnMajorChord(this.majorArray.pop());
      break;

      case 1:
      chord =  this.chordFactory.returnMinorChord(this.minorArray.pop());
      break;
    }
    this.refillKeyArray();
    return new ChordQuestion ("Plesase select the following chord", chord);
  }


  //FIXME: adapt the process to use number Of Notes.-> max 12 is possible
  createArrayOfNotesMajor(numberOfNotes){
    var notes = [];
    var initialNotes = this.circleOfFifths.returnShuffledNotesMajor();

    for(var i = 0; i < numberOfNotes; i++){
      notes.push(initialNotes.pop());
    }
    return notes;
  }

  createArrayOfNotesMinor(numberOfNotes){
    var notes = [];
    var initialNotes = this.circleOfFifths.returnShuffledNotesMinor();

    for(var i = 0; i < numberOfNotes; i++){
      notes.push(initialNotes.pop());
    }
    return notes;
  }


  //helper
  randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
  }

// TODO: TEst this method
  refillKeyArray(){
    if(this.majorArray.length < 1){
      this.majorArray.createArrayOfNotesMajor(10)
    }

    if(this.minorArray.length <1){
      this.minorArray.createArrayOfNotesMinor(10);
    }
  }

  //helpers

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }



}


}

export default QuestionFactory
