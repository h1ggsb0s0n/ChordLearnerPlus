import Octave from "/ChordLearnerPlus/js/Octave.js";
import Scale from "/ChordLearnerPlus/js/Scale.js";
import CircleOfFifths from "/ChordLearnerPlus/js/CircleOfFifths.js";


class ScaleFactory {

  constructor(){
    this.majorPattern = [2,2,1,2,2,2]; //Represents the halftone steps in an octave
    this.naturalMinorPattern = [2,1,2,2,1,2]; //Represents teh Halftone steps in an octave
    this.harmonicMinorPatter = [2,1,2,2,1,2]; //sounds arabic
    this.melodicMinorPattern = [2,1,2,2,2,1];


    this.octave = new Octave();
    this.circleOfFifths = new CircleOfFifths;
  }

  returnMajorScale(baseNote){
    return this.returnScale(baseNote, this.majorPattern , "major","majorScale");
  }

  returnNaturalMinorScale(baseNote){
    return this.returnScale(baseNote, this.naturalMinorPattern,"minor", "NaturalMinorScale");
  }

  returnHarmonicMinorScale(baseNote){
    return this.returnScale(baseNote, this.harmonicMinorPatter, "minor", "HarmonicMinorScale");
  }

  returnMelodicMinorScale(baseNote){
    return this.returnScale(baseNote, this.melodicMinorPattern,"minor", "MelodicMinorScale");
  }

// TODO: Refactor -> scale without basenote


//private Methods
//todo This method does not work with Harmonic and Melodic scales? Ask Musik teacher.
  returnScale(baseNote, pattern, tonality, type){
    var scale = [baseNote];
    var oct = this.octave.getOctave(baseNote, tonality);//returns an octave of tones from a selected baseNote (12 Halftones)
    var index = 0;

    pattern.forEach(step => {
      index = index + step;
      scale.push(oct[index]);

    });
    return new Scale(scale, type, this.circleOfFifths.returnNumberOfSharps(baseNote, tonality), this.circleOfFifths.returnNumberOfFlats(baseNote, tonality));
  }

}

export default ScaleFactory;
