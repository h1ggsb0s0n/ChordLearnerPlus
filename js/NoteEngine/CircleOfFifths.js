class CircleOfFifths{
//Exception einfügen in isRightSide
//CLearify: Usage of static classes
//add long classes
constructor(){
  this.majorKeysRight = ["C","G","D","A","E", "H"];
  this.majorKeysLeft = ["F","B","Eb","Ab", "Db","Gb"];
  this.minorKeysRight = ["A","E","H","F#","C#","G#"];
  this.minorKeysLeft = ["D","G","C","F","B","Eb"];

  this.intervals = ["Prime","Sekunde","Terz","Quarte", "Quinte", "Sexte", "Septime", "Oktave","None", "Dezime", "Undezime"];
  this.step = ["Tonika", "Subdominante-Parallele", "Dominanten-Parallele", "Subdominante" , "Tonika-Parallele", "Leitton", "Tonika"];
}

returnInterval(intervalNumber){
  var i = intervalNumber-1; // 1 => Prime => 0 Position of intervals Array
  return this.intervals[i];
}

returnIntervalNumber(interval){
  return this.intervals.indexOf(interval);
}

getIntervals(){
  return this.intervals;
}

returnStep(step){
  var s = step -1;
  return this.step[s];
}


//todo: not used?
returnRightSide(){
  return this.majorKeysRight;
}

//todo: not used?
returnLeftSide(){
  return this.majorKeysLeft;
}

// TODO: Implement better method -> maybe rename to returnNumberofSharps() ->

isRightSide(note, tonality){

  switch(tonality){
    case "major":
    if(this.isMajorKey(note)){
      if(this.majorKeysRight.includes(note)){
        return true;
      } else {
        return false;
      }
    }
    break;

    case "minor":
    if(this.isMinorKey(note)){
      if(this.minorKeysRight.includes(note)){
        return true;
      } else {
        return false;
      }
    }
    break;
  }
}

isMajorKey(note){
  if(this.majorKeysRight.includes(note) || this.majorKeysLeft.includes(note)){
    return true;
  } else{
    return false;
  }
}

isMinorKey(note){
  if(this.minorKeysRight.includes(note) || this.minorKeysLeft.includes(note)){
    return true;
  } else {
    return false;
  }
}



// TODO: Make easier
returnNumberOfSharps(baseNote, tonality){
  var numberOfSharps;
  switch(tonality){
    case "major":
    numberOfSharps = this.majorKeysRight.indexOf(baseNote);
    break;

    case "minor":
    numberOfSharps = this.minorKeysRight.indexOf(baseNote);
    break;
  }

  return Math.max(0, numberOfSharps);
}

// TODO: Maybe change method with note only
returnNumberOfFlats(baseNote, tonality){
  var numberOfSharps;
  switch(tonality){
    case "major":
    numberOfSharps = this.majorKeysLeft.indexOf(baseNote) + 1; //0 in array is 1 flat
    break;

    case "minor":
    numberOfSharps = this.minorKeysLeft.indexOf(baseNote) + 1; //0 in array is 1 flat
    break;
  }

  return Math.max(0, numberOfSharps);//return 0 when negative
}


//returns 12 notes shuffled
returnShuffledNotesMajor(){
  var notes =  this.majorKeysRight.concat(this.majorKeysLeft);
  this.shuffleArray(notes);
  return notes;
}

returnShuffledNotesMinor(){
  var notes =  this.minorKeysRight.concat(this.minorKeysLeft);
  this.shuffleArray(notes);
  return notes;
}



shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
  }

}



export default CircleOfFifths
