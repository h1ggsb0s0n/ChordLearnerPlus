import Question from "/ChordLearnerPlus/js/Questions/Question.js";
class MultipleChoiceQuestion extends Question{

constructor(question, solution, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3){
  super(question, solution);
  this.incorrectAnswer1 = incorrectAnswer1;
  this.incorrectAnswer2 = incorrectAnswer2;
  this.incorrectAnswer3 = incorrectAnswer3;
}


setSolution(solution){
  this.solution = solution;
}

getSolution(){
  return this.solution;
}

setIncorrectAnswer1(answer){
  this.incorrectAnswer1 = answer;
}

getIncorrectAnswer1(){
  return this.incorrectAnswer1;
}

setIncorrectAnsswer2(answer){
  this.incorrectAnswer2 = answer;
}

getIncorrectAnswer2(){
  return this.incorrectAnswer2;
}

setIncorrectAnswer3(answer){
  this.incorrectAnswer3 = answer;
}

getIncorrectAnswer3(){
  return this.incorrectAnswer3;
}


}


export default MultipleChoiceQuestion
