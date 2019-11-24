import Chord from "/ChordLearnerPlus/js/Chord.js";
import Scale from "/ChordLearnerPlus/js/Scale.js";
import ScaleFactory from "/ChordLearnerPlus/js/ScaleFactory.js";

class ChordFactory{

constructor(){
  //this.majorPattern = [4,7];// represent the corresponding  tones of the pattern
  //this.minorPattern = [3,7];
  this.scaleFactory = new ScaleFactory();
}

  returnMajorChord(baseNote){
    var majorScale = this.scaleFactory.returnMajorScale(baseNote);
    var scaleArray = majorScale.getScale();
    return new Chord([scaleArray[0],scaleArray[2],scaleArray[4]], "major", majorScale);
  }


  returnMinorChord(baseNote){
    var minorScale = this.scaleFactory.returnNaturalMinorScale(baseNote);
    var scaleArray = minorScale.getScale();
    var note1 = scaleArray[0];
    var note2 = scaleArray[2];
    var note3 = scaleArray[4];
    return new Chord([note1,note2,note3], "minor", minorScale);
  }

}

export default ChordFactory;
