//todo Add Step in a scale

class Chord{
  constructor(chordArray, tonality, scale){
    this.chordArray = chordArray;
    this.tonality = tonality;
    this.scale = scale;
    this.step = undefined;

  }

  getChordArray(){
    return this.chordArray;
  }

  getFirstReversal(){
    var firstReversal = [this.chordArray[1], this.chordArray[2], this.chordArray[0]];
    return firstReversal;
  }
  getSecondReversal(){
    var secondReversal = [this.chordArray[2], this.chordArray[0], this.chordArray[1]];
    return secondReversal;
  }

  getTonality(){
    return this.tonality;
  }

  getScale(){
    return this.scale;
  }

  setStep(step){
    this.step = step;
  }
}

export default Chord
