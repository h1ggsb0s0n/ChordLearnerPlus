class Chord{
  constructor(chordArray){
    this.chordArray = chordArray;
  }

  getChord(){
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
}

export default Chord
