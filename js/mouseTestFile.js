import StaveComponent from "/ChordLearnerPlus/js/StaveComponent.js";
import Mouse from "/ChordLearnerPlus/js/Mouse.js";


var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

var mouse = {
  x: undefined,
  y: undefined
}

canvas.addEventListener("mousemove", function(event){
  const rect = canvas.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
});


canvas.width = 1000;
canvas.height = 1000;

var trebleClefImage = new Image();
trebleClefImage.src = 'media/clef/trebleclef.png';
var bassClefImage = new Image();
bassClefImage.src = 'media/clef/bassclef.png';

var stave = new StaveComponent(50,21,700,20, context, mouse);
stave.selectable(true);
//stave.addIntervalToStave(5);
function animate() {

  requestAnimationFrame(animate); //creates a loop for us -> Function Animate
  context.clearRect(0, 0, innerWidth, innerHeight);
  stave.drawStave();
  stave.drawAddedNotes();

  stave.update();
  stave.drawFlats(2);
  //stave.drawFlats(10);

  //achtung hier möchte er auch hier immer die linien grau machen.
  context.drawImage(trebleClefImage, 120,20);
  context.drawImage(bassClefImage, 140, 243, 130, 130);
}





canvas.addEventListener("click", function(event){
  stave.addNoteToStave();
});


animate();
