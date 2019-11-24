import MultipleChoiceQuestion from "/ChordLearnerPlus/js/MultipleChoiceQuestion.js";
import Scale from "/ChordLearnerPlus/js/Scale.js";
import CircleOfFifths from "/ChordLearnerPlus/js/CircleOfFifths.js";

class IntervalQuestion extends MultipleChoiceQuestion{


  constructor(solution, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3){
    super("Please select the Interval displayed in the Stave", solution, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3);
  }


}
export default  IntervalQuestion
