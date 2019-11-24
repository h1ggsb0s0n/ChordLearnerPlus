class Question {

constructor(question, solution){

  this.question = question;
  this.solution = solution;
  this.state = "unanswered";
  this.tries = 0;
}

getQuestion(){
  return this.question;
}

getSolution(){
  return this.solution;
}


getState(){
  return this.state;
}
// TODO: implement switch case -> state = "unanswered" "correct" "incorrect"
setState(state){
  this.state = state;
}

// FIXME: this -> Arrow function capture this of the surrounding scopte
//https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript
//some(..) checks each element of the array against a test function and returns
//true if any element of the array passes the test function, otherwise, it returns false.
//indexOf(..) >= 0 and includes(..) both return true if the given argument is present in the array.

/*checkAnswer(userAnswer){
  this.tries++;
  if( userAnswer.every((r) => this.solution.includes(r))){
    this.state ="incorrect";
    return true;
  } else {
    this.state = "correct";
    return false
  }
}*/
//Todo for ChordQuestion maybe in the Start method not tried
checkAnswer(userAnswer){
  this.tries++;
  return this.solution === userAnswer;

}

}

export default Question
