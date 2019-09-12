class CircleOfFifths{
//Exception einfügen in isRightSide
//CLearify: Usage of static classes
//add long classes
constructor(){
  this.rightSideShort = ["C","G","D","A","E", "H"];
  this.leftSideShort = ["F","B","Eb","Ab", "Db","Gb"];
}

returnRightSide(){
  return this.rightSideShort;
}

returnLeftSide(){
  return this.leftSideShort;
}

isRightSide(note){
try {
    if(this.rightSideShort.includes(note)){
      return true;
    } else if(this.leftSideShort.includes(note)){
      return false;
    }
    throw "Note is nid valid, please provide a valid note";
  } catch(err) {
    //document.write("writing is working");
    document.getElementById("errorMessages").innerHTML = "Note is nid valid, please provide a valid note";
  }
}

returnShuffledNotes(){
  var notes =  this.rightSideShort.concat(this.leftSideShort);
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
