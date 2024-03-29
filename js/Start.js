import Octave from "/ChordLearnerPlus/js/NoteEngine/Octave.js";
import CircleOfFifths from "/ChordLearnerPlus/js/NoteEngine/CircleOfFifths.js";
import QuestionFactory from "/ChordLearnerPlus/js/Questions/QuestionFactory.js";
import StaveComponent from "/ChordLearnerPlus/js/CanvasComponents/StaveComponent.js";
import Chord from "/ChordLearnerPlus/js/NoteEngine/Chord.js";


$(document).ready(() => {
  //todo visability of let -> var probably better?
  // TODO: implementation of drawFlatsOrSharps method -> used twice
  // todo: add the sharps and flats into the ChordQuestion
  let $typeOfQuestion = $("#typeOfQuestion");
  let $question = $("#question")
  let $answers = $("#answers");
  let $checkAnswerButton = $("#checkAnswer");
  let $header = $("#home-section");
  let $overlay = $(".overlay_result");
  let $overlayImgCorrect = $("#correct");
  let $overlayImgFalse = $("#false");
  let $currentQuestion = $("#question1");
  let $nextQuestion = $("#question2");
  let questionFactory = new QuestionFactory();
  let circleOfFifths = new CircleOfFifths();
  let questionArray = questionFactory.returnArrayOfQuestions(10);
  let currentIndex = 0;
  let currentQuestion = questionArray[0];
  var mouse = { //needed to for eventlistener in stave canvas
    x: undefined,
    y: undefined
  };
  var canvas = document.querySelector("canvas");
  var context = canvas.getContext("2d");
  var trebleClefImage = new Image();
  var bassClefImage = new Image();
  trebleClefImage.src = 'media/clef/trebleclef.png';
  bassClefImage.src = 'media/clef/bassclef.png';
  var stave = new StaveComponent(50,21,700,20, context, mouse);


  $checkAnswerButton.click(function() {

  if(checkUserAnswers()){
    currentQuestion.setState("correct");
    addOverlay(true);
    colorCurrentQuestionButton(true);
  } else {
    currentQuestion.setState("incorrect");
    addOverlay(false);
    colorCurrentQuestionButton(false);
  }

  nextQuestion();
  setCard();
  });

  canvas.addEventListener("click", function(event){
    stave.addNoteToStave();
  });

let removeOverlay = function(){
  $overlay.remove();
}

let addOverlay = function(correctness){
  $header.append($overlay);
  $overlay.append($overlayImgCorrect);
  $overlay.append($overlayImgFalse);

  switch(correctness){
    case true:
    $header.append($overlay);
    $overlayImgFalse.remove();
    break;

    case false:
    $header.append($overlay);
    $overlayImgCorrect.remove();
    break;
  }

  $header.mousedown(removeOverlay);// add eventlistener to remove elent

}

$overlay.mousedown(removeOverlay);



  //sets type of question, question answers answer depending on the type of card
  let setCard = function(){
    let type = currentQuestion.constructor.name;
    $typeOfQuestion.html(type);
    $question.html(currentQuestion.getQuestion());
    $answers.empty(); //empty previous multipleChoiceAnswers
    stave.clearStave();//reset all selected notes and all accidentals
    switch(type){//type
      case "StepTriadQuestion":
        var chord = currentQuestion.getChord();
        var scale = currentQuestion.getScale();
        console.log(scale);
        stave.selectable(false);
        stave.addChordToStave(chord);
        if(scale.getNumberOfSharps() > 0){
          stave.drawSharps(scale.getNumberOfSharps())
        } else if(scale.getNumberOfFlats() > 0){
          stave.drawFlats(scale.getNumberOfFlats());
        }
        $answers.append(returnRadioButton(currentQuestion.getSolution(), "correctAnswer"));
        $answers.append(returnRadioButton(currentQuestion.getIncorrectAnswer1(), "incorrectAnswer1"));
        $answers.append(returnRadioButton(currentQuestion.getIncorrectAnswer2(), "incorrectAnswer2"));
        shuffleChildElements($answers);
        break;
      case "IntervalQuestion":
        stave.selectable(false);
        stave.addIntervalToStave(circleOfFifths.returnIntervalNumber(currentQuestion.getSolution()));
        console.log("The interval is:");
        console.log(circleOfFifths.returnIntervalNumber(currentQuestion.getSolution()));
        $answers.append(returnRadioButton(currentQuestion.getSolution(), "correctAnswer"));
        $answers.append(returnRadioButton(currentQuestion.getIncorrectAnswer1(), "incorrectAnswer"));
        $answers.append(returnRadioButton(currentQuestion.getIncorrectAnswer2(), "incorrectAnswer"));
        $answers.append(returnRadioButton(currentQuestion.getIncorrectAnswer3(), "incorrectAnswer"));
        shuffleChildElements($answers);

        break;

      case "ChordQuestion":
        stave.selectable(true);
        var chord = currentQuestion.getChord();
        var scale = chord.getScale();
        if(scale.getNumberOfSharps() > 0){
          stave.drawSharps(scale.getNumberOfSharps());
        } else if(scale.getNumberOfFlats() > 0){
          stave.drawFlats(scale.getNumberOfFlats());
        }
        $answers.append(currentQuestion.getBaseTone()+ " " + currentQuestion.getTonality());
        break;
    }

  }


  let checkUserAnswers = function(){
    let isCorrect;
    let type = currentQuestion.constructor.name;
    switch(type){
      case "ChordQuestion":
      isCorrect = stave.isInChord(currentQuestion.getChord());
      break;

      case "IntervalQuestion":
      isCorrect = currentQuestion.checkAnswer(returnValueSelectedRadioButton())
      break;

      case "StepTriadQuestion":
      isCorrect = currentQuestion.checkAnswer(returnValueSelectedRadioButton());
      break;
    }

    return isCorrect;
  }

  let returnValueSelectedRadioButton= function(){
    var selectedVal = "";
    var $selectedRadioButton = $("input[name='exampleRadios']:checked");//exampleRadios
    if ($selectedRadioButton.length > 0) {
    selectedVal = $selectedRadioButton.val();
    }
    return selectedVal;
  }

  let shuffleChildElements = function(parent){
    var divs = parent.children();
    while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
  }

  //recursive function => not working so far

  let nextQuestion = function(){
    //getToIncorrectQuestion();
    //colorTheQuestion();
    //colorCurrentQuestionButton();
    if(currentIndex < questionArray.length-1){
      currentIndex += 1;
      currentQuestion = questionArray[currentIndex];
      }
      else{ //restart at 0
        currentIndex = 0;
        currentQuestion = questionArray[currentIndex];
      }
      $currentQuestion = $("#Question"+ (currentIndex + 1)); //starts at 0
      $nextQuestion = $("#Question"+ (currentIndex+ 2));//not working after one loop
      blinkCurrentQuestionButton();
    }
    //ToDo: Recursive function Recursive Function to loop to the next question// NOT WORKING!
    let getToIncorrectQuestion = function(){
      let stateOfNextQuestion = questionArray[currentIndex + 1];
      if(stateOfNextQuestion === "correct"){
        currentIndex += 1;
        currentQuestion = questionArray[currentIndex];
        getToIncorrectQuestion();
      }
    }


    let returnRadioButton = function(innerHTML,id ){
      return '<div class="form-check"><input class="form-check-input" type="radio" name="exampleRadios" id="'+id+'" value="'+innerHTML+'" checked><label class="form-check-label" for="exampleRadios1">'+innerHTML+'</label></div>'
    }


    let colorCurrentQuestionButton = function(bool){
      $currentQuestion.removeClass("btn-warning");
      $currentQuestion.removeClass("btn-danger");
      $currentQuestion.removeClass("btn-success");
      $currentQuestion.removeClass("blink_me");

      switch (bool){
        case false:
        $currentQuestion.addClass("btn-danger");
        break;
        case true:
        $currentQuestion.addClass("btn-success");
        break;
      }
    }

    let blinkCurrentQuestionButton = function(){
      $currentQuestion.addClass("blink_me");
    }

      let animate = function() {

        requestAnimationFrame(animate); //creates a loop for us -> Function Animate
        context.clearRect(0, 0, innerWidth, innerHeight);
        stave.drawStave();
        stave.drawAddedNotes();
        stave.update();
        //achtung hier möchte er auch hier immer die linien grau machen.
        context.drawImage(trebleClefImage, 120,20);
        context.drawImage(bassClefImage, 140, 243, 130, 130);
      }

      canvas.addEventListener("mousemove", function(event){
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
      });

      //-> If moved above ReferenceError: can't access lexical declaration `setCard' before initialization
      removeOverlay();
      setCard();
      animate();



});
