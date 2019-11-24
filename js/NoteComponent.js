class NoteComponent {

  constructor(radius, xPosition, context2d){
    this.context = context2d;
    this.radius = radius;
    this.correct = "notAssigned";
    this.noteValue;
    this.linePosition;
    this.lineNumber;
    this.xPosition = xPosition;
  }


  drawNote(color){
    this.context.beginPath();
    this.context.arc(this.xPosition, this.linePosition, this.radius, 0, Math.PI * 2, false); // x, y, radius  ,startAngle, endAngle, drawcounterclockwise
    this.context.strokeStyle = color;
    this.context.fillStyle = color; //selects any color in the array
    this.context.stroke();
    this.context.fill();
    
  }

  setXPosition(x){
    this.xPosition = x;
  }
//setCorrect
  isCorrect(){
    this.correct = true;
  }

  isFalse(){
    this.correct = false;
  }

  isInChord(){
    return this.correct;
  }

  setLinePosition(y){
    this.linePosition = y;
  }

  getLinePosition(){
    return this.linePosition;
  }

  getNoteValue(){
    return this.noteValue;
  }

  setNoteValue(noteValue){
    this.noteValue = noteValue;
  };

  setLineNumber(lineNumber){
    this.lineNumber = lineNumber;
  }

  getLineNumber(){
    return this.lineNumber;
  }
}

export default NoteComponent;
