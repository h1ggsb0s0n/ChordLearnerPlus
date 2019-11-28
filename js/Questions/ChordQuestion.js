import Question from "/ChordLearnerPlus/js/Questions/Question.js";

class ChordQuestion extends Question  {
  constructor(question, chord) {
    super("Please Select the following Chord:", chord.getChordArray());
    this.chord = chord;
    this.tonality = chord.getTonality();
  }

  getTonality(){
    return this.tonality;
  }

  getChord(){
    return this.chord;
  }


  getBaseTone(){
    return this.solution[0];
  }


}

export default ChordQuestion;
