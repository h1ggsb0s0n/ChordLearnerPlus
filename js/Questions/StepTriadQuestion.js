import MultipleChoiceQuestion from "/ChordLearnerPlus/js/Questions/MultipleChoiceQuestion.js";
import Scale from "/ChordLearnerPlus/js/NoteEngine/Scale.js";
import CircleOfFifths from "/ChordLearnerPlus/js/NoteEngine/CircleOfFifths.js";

class StepTriadQuestion extends MultipleChoiceQuestion{

  constructor(scale, chord, solution, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3) {
    super("Please select the step in the corresponding Scale of the Chord displayed in the Stave: ",solution, incorrectAnswer1 ,incorrectAnswer2, incorrectAnswer3);
    this.scale = scale;
    this.chord = chord;
  }

  getChord(){
    return this.chord;
  }

  getScale(){
    return this.scale;
  }



}

export default StepTriadQuestion;
