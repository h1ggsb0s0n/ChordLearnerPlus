import CircleOfFifths from "/ChordLearnerPlus/js/CircleOfFifths.js";

class Octave{

constructor(){
  this.octaveMajor = ["C", "C#", "D","D#","E","F","F#","G","G#","A","A#","H"];
  this.octaveMinor = ["C", "Db", "D","Eb","E","F", "Gb","G","Ab","A","B","H"];
  this.majorPattern = [4,7];
  this.minorPattern = [3,7];
  this.circleOfFifths = new CircleOfFifths();
}



getOctave(baseNote){
  //double the array to slice it
  var index;
  if(this.circleOfFifths.isRightSide(baseNote)){
      var twoOctaves = this.octaveMajor.concat(this.octaveMajor);
      index = this.octaveMajor.findIndex(note => note === baseNote);
      return twoOctaves.slice(index, index+13);
  }else{
    var twoOctaves = this.octaveMinor.concat(this.octaveMinor);
    index = this.octaveMinor.findIndex(note => note === baseNote);
    return twoOctaves.slice(index, index+13);
  }
}

returnChord(baseNote){//patternArray als zweiter Parameter
  var chord = [baseNote];
  var octave = this.getOctave(baseNote);
  this.majorPattern.forEach(step => {
    chord.push(octave[step]);
  });
  return chord
}

returnShuffledArrayMajor(){
  return this.shuffleArray(this.octaveMinor);
}

returnShuffledArrayMinor(){
  return this.shuffleArray(this.octaveMinor);
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
