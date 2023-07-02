const gridContainer = document.getElementById("grid-container");
const colorWheel = document.getElementById("color-change");
const buttons = document.querySelectorAll(".btn");
const slider = document.getElementById("myRange");
const sliderValue = document.querySelector(".slide-value");
const DEFAULT_SIZE = 32;

let currentSize = DEFAULT_SIZE;

let single = true;
let rainbow = false;
let eraser = false;
let clear = false;
let clicked = false;

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    single = false;
    rainbow = false;
    eraser = false;

    switch (button.id){
        case "single":
            single = true;
            break;
        case "rainbow":
            rainbow = true;
            break;
        case "eraser":
            eraser = true;
            break;
        case "clear":
            clearGrid();
            single = true;
            break;
    }
  });
});

generateCells(DEFAULT_SIZE);
slider.onmousemove = (e) => updateSize(e.target.value);
slider.onchange = (e) => changeSize(e.target.value);

function updateSize(value){
    sliderValue.innerHTML = `${value} x ${value}`;
}

function changeSize(value){
    currentSize = value;
    clearGrid();
}

function clearGrid(){
    gridContainer.innerHTML = "";
    generateCells();
}

function generateCells() {
    gridContainer.style.gridTemplateColumns = "repeat(" + currentSize + ", 1fr)";
    gridContainer.style.gridTemplateRows = "repeat(" + currentSize + ", 1fr)";
  
    for (let row = 0; row < currentSize; row++) {
      for (let col = 0; col < currentSize; col++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.style.background = "white";
        cell.addEventListener("mousedown", function () {
          clicked = true;
          changeColor(cell);
        });
        cell.addEventListener("mouseup", function () {
          clicked = false;
        });
        cell.addEventListener("mouseover", function () {
          if (clicked) {
            changeColor(cell);
          }
        });
        gridContainer.appendChild(cell);
      }
    }
  }
  
  function changeColor(cell) {
    if (single) {
      const selectedColor = colorWheel.value;
      cell.style.backgroundColor = selectedColor;
    } else if (rainbow) {
      let red = Math.floor(Math.random() * 256);
      let green = Math.floor(Math.random() * 256);
      let blue = Math.floor(Math.random() * 256);
      let color = `rgb(${red}, ${green}, ${blue})`;
  
      cell.style.backgroundColor = color;
    } else if (eraser) {
      cell.style.backgroundColor = "white";
    }
  }