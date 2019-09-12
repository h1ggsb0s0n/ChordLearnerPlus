import Chord from "/ChordLearnerPlus/js/Chord.js";
import Octave from"/ChordLearnerPlus/js/Octave.js"
class ChordFactory{

constructor(){
  this.majorPattern = [4,7];
  this.minorPattern = [3,7];
  this.octave = new Octave();
}

returnMajorChord(baseNote){
  var chordAray = [baseNote];
  var octave = this.octave.getOctave(baseNote);
  this.majorPattern.forEach(step => {
    chordAray.push(octave[step]);
  });
  return new Chord(chordAray);
  }

returnMinorChord(baseNote){
  var chordAray = [baseNote];
  var octave = this.octave.getOctave(baseNote);
  this.minorPattern.forEach(step => {
      chordAray.push(octave[step]);
    });
    return new Chord(chordAray);
  }

}


/*var factory = new ChordFactory();
var question = "Z";
var calculatedChordAray = factory.returnMajorChord(question).getChord();
document.getElementById("question").innerHTML = question;
document.getElementById("firstChord").innerHTML = calculatedChordAray[0];
document.getElementById("secondChord").innerHTML = calculatedChordAray[1];
document.getElementById("thirdChord").innerHTML = calculatedChordAray[2];*/

export default ChordFactory
