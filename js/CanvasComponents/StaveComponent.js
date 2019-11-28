import NoteComponent from "/ChordLearnerPlus/js/CanvasComponents/NoteComponent.js";
import Chord from "/ChordLearnerPlus/js/NoteEngine/Chord.js";

class StaveComponent{
 // FIXME: First Line + First treble Line
 //// TODO: instance varibable for first bass line = see add interval function + add note/chord //calculate with treble notes array -> easy extension
  constructor(x,y,length,gap,context2d, mouse){
    this.context = context2d;
    this.mouse = mouse;
    this.x = x;
    this.y = y;//represents the y position of the first Line
    this.yFirstLine = y + (gap/2)*5;//represents the y lineposition of the first VISIBLE line (treble f)
    this.yTrebleLastHelpLine = this.y + gap* 13;
    this.yBassLastHelpLine = this.y + (gap/2)*38;
    this.trebleNotes = ["D","C","H","A","G","F","E","D","C","H","A","G","F","E","D","C","H","A","G"];
    this.bassNotes =  ["G","F","E","D","C","H","A","G","F","E","D","C","H","A","G","F","E","D","C","H"];
    this.gap = gap;
    this.currentNote = new NoteComponent((gap/2), (this.x +(length/2)), this.context);
    this.length = length;
    this.addedNotes = [];
    this.sharps = ["F","C","G","D","A","E"];
    this.flats = ["H","E","A","D","G","C"];
    this.numberOfSharps = 0;
    this.numberOfFlats = 0;
    this.isSelectable = true;
  }

  // TODO: rename to drawStaveLines
  drawStave(){
    //draw treble Lines
    this.context.strokeStyle = "black";
    this.drawLine(this.x,this.yFirstLine,this.x+this.length);
    this.drawLine(this.x,this.yFirstLine+this.gap,this.x+this.length);
    this.drawLine(this.x,this.yFirstLine+(this.gap*2),this.x+this.length);
    this.drawLine(this.x,this.yFirstLine+(this.gap*3),this.x+this.length);
    this.drawLine(this.x,this.yFirstLine+(this.gap*4),this.x+this.length);

    //draw Bass Lines
    this.drawLine(this.x,this.yFirstLine+(this.gap*10),this.x+this.length);
    this.drawLine(this.x,this.yFirstLine+(this.gap*11),this.x+this.length);
    this.drawLine(this.x,this.yFirstLine+(this.gap*12),this.x+this.length);
    this.drawLine(this.x,this.yFirstLine+(this.gap*13),this.x+this.length);
    this.drawLine(this.x,this.yFirstLine+(this.gap*14),this.x+this.length);

  }

  //helper
  drawLine(x,y,x2){
    this.context.beginPath();
    this.context.moveTo(x,y);
    this.context.lineTo(x2,y);
    this.context.stroke();
  }


//// FIXME: SET NOTE VALUE HAS TO BE ADDED. MAybe
// TODO: add check to add not more than xx Notes.
  addNoteToStave(){

    var noteToAdd = new NoteComponent((this.gap/2), (this.x +(this.length/2)), this.context);
    noteToAdd.setLinePosition(this.currentNote.getLinePosition());//needs to be set for drawing the note relative to the canvas // drawing Method of NoteComponent is used
    noteToAdd.setLineNumber(this.currentNote.getLineNumber());
    noteToAdd.setNoteValue(this.returnSelectedNote());
    this.addedNotes.push(noteToAdd);
    //console.log("x of mouse with formula:" + this.mouse.returnX());
  }



  addNoteToStave3(notename){
    var noteToAdd = new NoteComponent((this.gap/2), (this.x +(this.length/2)), this.context);
    noteToAdd.setLinePosition(this.currentNote.getLinePosition())
  }

// FIXME: needs to be corrected when linenumbers will be adapted
// FIXME: This method does not work with an interval of 0 (PRIME)
  addIntervalToStave(interval){
    this.isSelectable = false;
    var noteToAdd1 = new NoteComponent((this.gap/2), (this.x +(this.length/2)), this.context);
    var noteToAdd2 = new NoteComponent((this.gap/2), (this.x +(this.length/2)), this.context);
    var lineDifference = interval; // Example => A third (3) is only (2) Lines differences

    switch(Math.floor(Math.random()*2)){

      case 0:
      //Adds an interval at the treble Lines

      var maxLineNumber = 18 - interval;
      var lineNumber = Math.floor(Math.random()*maxLineNumber); //calculates the lineNumber of the first note of the interval
      noteToAdd1.setLinePosition(this.returnLinePosition(lineNumber));
      noteToAdd1.setLineNumber(lineNumber);


      noteToAdd2.setLinePosition(this.returnLinePosition(lineNumber+lineDifference));
      noteToAdd2.setLineNumber(lineNumber+lineDifference);

      this.addedNotes.push(noteToAdd1);
      this.addedNotes.push(noteToAdd2);
      break;


      case 1:
      // Adds an interval at the bass lines.
      var maxLineNumber = 40 - interval; // needs to be substracted because interval can't go over the 40th line
      var lineNumber = this.randomIntFromInterval(19, maxLineNumber);//19 is the firstBassLine
      noteToAdd1.setLinePosition(this.returnLinePosition(lineNumber));
      noteToAdd1.setLineNumber(lineNumber);

      noteToAdd2.setLinePosition(this.returnLinePosition(lineNumber+lineDifference));
      noteToAdd2.setLineNumber(lineNumber+lineDifference);

      this.addedNotes.push(noteToAdd1);
      this.addedNotes.push(noteToAdd2);
      break;

    }
  }

  // TODO: Ugly method please refactor
  addAccidentals(note){
    var noteWithAccidental = note;
    if(this.numberOfSharps > 0){
      for(var i = 0; i < this.numberOfSharps; i++){
        if(note === this.sharps[i]){
           noteWithAccidental = note.concat("#");
        }
      }

    }else if(this.numberOfFlats > 0){

      for(var i = 0; i < this.numberOfFlats; i++){
        if(note === this.flats[i]){
          if(note === "H"){
            noteWithAccidental = "B";
          } else{
            noteWithAccidental = note.concat("b");
          }
        }
      }
    }
    return noteWithAccidental;
  }


  //rename to calculateSelectedNote()
  returnSelectedNote(){
    var selectedNote;
    var currentLine = this.currentNote.getLineNumber();
    if(this.currentNote.getLineNumber() < 20 ){
      selectedNote = this.trebleNotes[currentLine];
    } else{
      selectedNote = this.bassNotes[currentLine - 20];
    }
    var sharpNote = this.addAccidentals(selectedNote);
    return sharpNote;
  }




  //checks if notes have been added to the stav
  //can be deleted
  containsNotes(){
    if(this.addedNotes.length > 0){
      return true;
    } else{
      return false;
    }
  }



  //checks on which line (+- gap between the lines/4) the MousePointer is located.
  isOnLine(lineNumber){
    var linePosition = this.yFirstLine + (lineNumber * (this.gap/2));
    if(this.mouse.y >= (linePosition) - (this.gap/4) && this.mouse.y <= (linePosition) + (this.gap/4)){
      return true;
    } return false;
  }



  //returns the closestLine relative to the current mouse position in the canvas

  closestLine(){
    var distanceToFirstLine = this.mouse.y - this.y;
    var numberOfFirstLine = Math.floor(distanceToFirstLine/(this.gap/2));
    var numberOfSecondLine = numberOfFirstLine + 1;
    if(distanceToFirstLine < 0){
      return 0;
    }
    else if(this.mouse.y > this.yBassLastHelpLine){
      return 38;
    }
    else if(this.mouse.y - numberOfFirstLine*(this.gap/2) > (numberOfSecondLine*(this.gap/2) - this.mouse.y)){
      return numberOfFirstLine;
    } else
    return numberOfSecondLine;

  }

  // TODO: Refactor: AddAccidentals method uses a method
  drawSharps(numberOfSharps){
    this.numberOfSharps = numberOfSharps;
    this. numberOfFlats = 0;//set previous drawn flats to 0
    const sharpPosTreble = [6,9,5,7,10,8]; //line location of sharps
    const sharpPosBass = [28,31,27,29,32,30]; //line location of sharps
    var xPos = this.x + 20;
    for(var i = 0; i < this.numberOfSharps; i++){
      var yPosTreble = this.getYLinePosition(sharpPosTreble[i]);
      var yPosBass = this.getYLinePosition(sharpPosBass[i]);
      this.context.font = "30px Arial";
      this.context.fillText("#", xPos, yPosTreble);
      this.context.fillText("#", xPos, yPosBass);

        xPos = xPos + 10;
    }
  }

  drawFlats(numberOfFlats){
    this.numberOfFlats = numberOfFlats;
    this.numberOfSharps = 0;
    const flatPosTreble = [10,7,11,8,12,9]; //represents the line position of each sharp
    const flatPosBass = [32,29,33,30,34,31];
    var xPos = this.x + 20;
    for(var i = 0; i < this.numberOfFlats; i++){
      var yPosTreble = this.getYLinePosition(flatPosTreble[i]);
      var yPosBass = this.getYLinePosition(flatPosBass[i]);
      this.context.font = "30px Arial";
      this.context.fillText("b", xPos, yPosTreble);
      this.context.fillText("b", xPos, yPosBass);
      xPos = xPos + 10;
    }
  }

  getYLinePosition(lineNumber){
    return this.y + (lineNumber * (this.gap/2));
  }

  //returns the y position of a selected line
  //not working
  returnLinePosition(lineNumber){
    return this.y + (lineNumber * (this.gap/2));
  }

  //draws a Note on the line and
  drawOnLine(lineNumber){
    var yLinePosition = this.y + (lineNumber * (this.gap/2));
    //why do i check for -1?????
    if(lineNumber){
      this.currentNote.setLinePosition(yLinePosition);
      this.currentNote.setLineNumber(lineNumber);
      this.currentNote.drawNote();

      //drawHelpLines Treble
      this.drawHelpers(lineNumber);
    }
  }

  drawHelpers(lineNumber){
    if(lineNumber <= 18){
      switch(lineNumber){
        // upper lines
        case 0:
        case 1:
        this.drawHelpLine(1);
        this.drawHelpLine(3);
        break;

        case 2:
        case 3:
        this.drawHelpLine(3);
        break;

        //lines below
        case 15:
        case 16:
        this.drawHelpLine(15);
        break;

        case 17:
        case 18:
        this.drawHelpLine(15);
        this.drawHelpLine(17);
        break;
      }
    } else{

      switch(lineNumber) {
        //upper lines
        case 18:
        case 19:
        this.drawHelpLine(19);
        this.drawHelpLine(21);
        this.drawHelpLine(23);
        break;

        case 20:
        case 21:
        this.drawHelpLine(21);
        this.drawHelpLine(23);
        break;

        case 22:
        case 23:
        this.drawHelpLine(23);
        break;

        //lines below stave
        case 35:
        case 36:
        this.drawHelpLine(35);
        break;

        case 37:
        case 38:
        this.drawHelpLine(35);
        this.drawHelpLine(37);
        break;

        case 39:
        case 40:
        this.drawHelpLine(35);
        this.drawHelpLine(37);
        this.drawHelpLine(39);
        break;
      }
    }
  }

  drawHelpLine(lineNumber){
    var yLinePosition = this.y + (lineNumber * (this.gap/2));
    //drawLine(x,y,x2)
    this.drawLine(this.x +(this.length/2)-30, yLinePosition, this.x +(this.length/2)+30);
  }

  //TODO: not working -> should color falsely chosen notes
  drawAddedNotes(){
    for (const n of this.addedNotes){
      if(n.isInChord() === "notAssigned"){
        n.drawNote("black");
        this.drawHelpers(n.getLineNumber());

      }
      else if(n.isInChord()){
        n.drawNote("green");
      } else{
        n.drawNote("red");
      }
    }
  }

  selectable(bool){
    this.isSelectable = bool;
  }


  //rename?
  addChordToStave(chord){
    let chordArray = chord.getChordArray();
    chordArray.forEach(note => this.addNoteToStaveRandomLocation(note));
  }

  // TODO: move up to add note to Stave
  addNoteToStaveRandomLocation(noteWithAccidental){
    let note = this.removeAccidental(noteWithAccidental);
    let noteToAdd = new NoteComponent((this.gap/2), (this.x +(this.length/2)), this.context);
    let randomLineNumber = this.returnRandomLineNumber(note);
    noteToAdd.setLinePosition(this.returnLinePosition(randomLineNumber));
    noteToAdd.setLineNumber(randomLineNumber);
    this.addedNotes.push(noteToAdd);
  }


  //helper Method can be deleted
  returnRandomLocation(note, type){
    let locations = [];
    switch(type){
      case "treble": //search in treble
        for (var i=0; i < this.trebleNotes.length; i++ ){
          if ( this.trebleNotes[i] === note ){
              locations.push(i);
          }
        }

      case "bass": // search in bass
        for (var i=0; i < this.bassNotes.length; i++ ){
          if ( this.bassNotes[i] === note ){
            locations.push(i);
        }
      }
    }
    return locations[Math.floor(Math.random()*locations.length)];
  }

  //helper method
  returnRandomLineNumber(note){
    let notes = this.trebleNotes.concat(this.bassNotes);
    let locations = [];
    for (var i=0; i < notes.length; i++ ){
      if (notes[i] === note ){
          locations.push(i);
      }
    }
    return locations[Math.floor(Math.random()*locations.length)];
  }

  //helperMethod
  removeAccidental(note){
    var baseNote = note;
    if(note === "B"){ //Exception
      baseNote = "H";
    } else if(note.length > 1){
      baseNote = note.slice(0, -1);
    }
    return baseNote;
  }

  //checks if the selected Notes are in the Chord handover as a
  //renamaa
  isInChord(chord){
    var chordArray = chord.getChordArray();
    var isInChord2 = false;
    if(this.addedNotes.length > 0){ //every turns true when on a empty array
      isInChord2 = this.addedNotes.every(note => chordArray.includes(note.getNoteValue()));
    } else{
      isInChord2 = false;
    }
    return isInChord2;
  }

  clearStave(){
    this.addedNotes = [];
    this.numberOfFlats = 0;
    this.numberOfSharps = 0;
  }

  //helper
  randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
  }

  update(){

    if(this.isSelectable){
      this.drawOnLine(this.closestLine());
    }

    if(this.numberOfSharps > 0){
      this.drawSharps(this.numberOfSharps);
    }

    if(this.numberOfFlats > 0){
      this.drawFlats(this.numberOfFlats);
    }



  }
}

export default StaveComponent;
