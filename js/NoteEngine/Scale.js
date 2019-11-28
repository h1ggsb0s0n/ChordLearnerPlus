import Chord from "/ChordLearnerPlus/js/NoteEngine/Chord.js";

class Scale {

  constructor(scale, type, numberOfFlats, numberOfSharps){
    this.scale = scale;
    this.type = type;
    this.step = ["Tonika", "Subdominante-Parallele", "Dominanten-Parallele", "Subdominante" , "Dominante", "Tonika-Parallele", "Ersatz-Dominante, Leitton"];
    this.numberOfSharps = numberOfFlats;
    this.numberOfFlats = numberOfSharps;
  }

  getScale(){
    return this.scale;
  }

  getNumberOfFlats(){
    return this.numberOfFlats;
  }

  getNumberOfSharps(){
    return this.numberOfSharps;
  }

  returnStep(step){
    return this.step[step-1];
  }

  // TODO: CREATE a CLAss that Calculates the tonality
  // does this make sense-> belongs more to the scale
  returnTriad(step){
    var startIndex = step-1;
    var twoScales = this.scale.concat(this.scale);
    var firstTone = twoScales[startIndex];
    var secondTone = twoScales[startIndex+2];
    var thirdTone = twoScales[startIndex+4];
    return new Chord([firstTone, secondTone, thirdTone], this);
  }
}

export default Scale;
