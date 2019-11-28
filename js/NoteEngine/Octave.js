import CircleOfFifths from "/ChordLearnerPlus/js/NoteEngine/CircleOfFifths.js";

class Octave{

constructor(){
  this.octaveSharps = ["C", "C#", "D","D#","E","F","F#","G","G#","A","A#","H"];
  this.octaveFlats = ["C", "Db", "D","Eb","E","F", "Gb","G","Ab","A","B","H"];
  this.majorPattern = [4,7];//Represents the halftone steps in a major scale
  this.minorPattern = [3,7];//Represents the halftone steps in a minor scale
  this.circleOfFifths = new CircleOfFifths();
  this.scaleDegree = ["tonic", "supertonic", "mediant", "subdominant", "dominant", "subtonic","leading tone"];
}


//// TODO: Terrible Method: Adjust it!!! Build in Check if The note exists
getOctave(baseNote, tonality){
  var t = tonality.toLowerCase();
  var index;
  switch(t){
    case "major":
    if(this.circleOfFifths.isRightSide(baseNote, "major")){
      var twoOctaves = this.octaveSharps.concat(this.octaveSharps);
      index = this.octaveSharps.findIndex(note => note === baseNote);
      return twoOctaves.slice(index, index+13);
    } else {
      var twoOctaves = this.octaveFlats.concat(this.octaveFlats);
      index = this.octaveFlats.findIndex(note => note === baseNote);
      return twoOctaves.slice(index, index+13);
    }
    break;

    case "minor":
    if(this.circleOfFifths.isRightSide(baseNote, "minor")){
      var twoOctaves = this.octaveSharps.concat(this.octaveSharps);
      index = this.octaveSharps.findIndex(note => note === baseNote);
      return twoOctaves.slice(index, index+13);
    } else {
      var twoOctaves = this.octaveFlats.concat(this.octaveFlats);
      index = this.octaveFlats.findIndex(note => note === baseNote);
      return twoOctaves.slice(index, index+13);
    }
    break;


  }
}


returnScaleDegreeTriad(baseNote, degree){

}

returnScaleDegree(degree){
  var degrees = degree -1;
  return this.scaleDegree[degrees];

}

returnMinorScale(){

}

returnMajorScale(){

}

returnMajorChord(baseNote){//patternArray als zweiter Parameter
  var chord = [baseNote];
  var octave = this.getOctave(baseNote);
  this.majorPattern.forEach(step => {
    chord.push(octave[step]);
  });
  return chord
}

returnMinorChord(baseNote){
  var chord = [baseNote];
  var octave = this.getOctave(baseNote);
  this.minorPattern.forEach(step => {
    chord.push(octave[step]);
  });
  return chord
}

returnShuffledArrayMajor(){
  return this.shuffleArray(this.octaveFlats);
}

returnShuffledArrayMinor(){
  return this.shuffleArray(this.octaveFlats);
}

returnShuffledArrayMixed(){
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




export default Octave
