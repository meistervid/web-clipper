const queryString = location.search;
const urlParams = new URLSearchParams(queryString);
const idpassed = urlParams.get('id')

const body = window.document.getElementsByTagName("body")[0];
body.style.margin = 0;

// set up screenshot
const img = new Image();
img.src = localStorage.getItem(idpassed);
img.style.width = `${window.innerWidth}px`;
img.style.border = 'none';
body.appendChild(img);

// set up canvas
const canvas = window.document.createElement('canvas');
canvas.id = "canvas";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.top = '0px';
canvas.style.left = '0px';
canvas.style.position = "absolute";
canvas.style.zIndex = 999;
body.appendChild(canvas);

// Some optional drawings.
var ctx = canvas.getContext("2d");

// style the context
ctx.strokeStyle = "black";
ctx.setLineDash([2, 5]);
ctx.lineWidth = 2;

// calculate where the canvas is on the window
// (used to help calculate mouseX/mouseY)
var offsetX = 0;
var offsetY = 0;

// this flage is true when the user is dragging the mouse
var isDown = false;

// these vars will hold the starting mouse position
var startX;
var startY;


function handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();

    // save the starting x/y of the rectangle
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);

    // set a flag indicating the drag has begun
    isDown = true;
}

function handleMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    // the drag is over, clear the dragging flag
    isDown = false;
}

function handleMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();

    // if we're not dragging, just return
    if (!isDown) {
        return;
    }

    // get the current mouse position
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mousemove stuff here

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // calculate the rectangle width/height based
    // on starting vs current mouse position
    var width = mouseX - startX;
    var height = mouseY - startY;

    // draw a new rect from the start position 
    // to the current mouse position
    ctx.strokeRect(startX, startY, width, height);

}

// listen for mouse events
canvas.onmousedown = function (e) {
    handleMouseDown(e);
};
canvas.onmousemove = function (e) {
    handleMouseMove(e);
};
canvas.onmouseup = function (e) {
    handleMouseUp(e);
};