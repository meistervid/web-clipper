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

// label text
ctx.font = "30px Arial";
ctx.textAlign = "center";
ctx.fillText("Select area", canvas.width/2, canvas.height/2);

function handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();

    // save the starting x/y of the rectangle
    startX = parseInt(e.clientX);
    startY = parseInt(e.clientY);

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
    mouseX = parseInt(e.clientX);
    mouseY = parseInt(e.clientY);

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


    // shade inverse of selection
    const y1 = startY + height;
    const y2 = startY;
    let botY = y1 > y2 ? y1 : y2;
    let topY = botY === y2 ? y1 : y2;
    const x1 = startX + width;
    const x2 = startX;
    let botX = x1 > x2 ? x1 : x2;
    let topX = botX === x2 ? x1 : x2;

    ctx.fillRect(0, 0, canvas.width, topY); // top
    ctx.fillRect(0, topY, topX, height); // left
    ctx.fillRect(botX, topY, canvas.width, height); // right
    ctx.fillRect(0, botY, canvas.width, canvas.height); // bottom
    ctx.globalAlpha = 0.2;
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