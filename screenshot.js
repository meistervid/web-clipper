const queryString = location.search;
const urlParams = new URLSearchParams(queryString);
const idpassed = urlParams.get('id')

const body = window.document.getElementsByTagName("body")[0];
body.style.margin = 0;


let originalWidth;
let originalHeight;
// set up screenshot
const img = new Image(window.innerWidth, window.innerHeight);
const src = localStorage.getItem(idpassed);
img.src = src;
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
canvas.style.zIndex = 1;
body.appendChild(canvas);

// Some optional drawings.
let ctx = canvas.getContext("2d");

// style the context
ctx.strokeStyle = "black";
ctx.setLineDash([2, 5]);
ctx.lineWidth = 2;

// calculate where the canvas is on the window
// (used to help calculate mouseX/mouseY)
let offsetX = 0;
let offsetY = 0;

// this flage is true when the user is dragging the mouse
let isDown = false;

let mouseX;
let mouseY;

// label text
ctx.font = "30px Arial";
ctx.textAlign = "center";
ctx.fillText("Select area", canvas.width/2, canvas.height/2);

// fill whole screen with slight opacity
ctx.globalAlpha = 0.2;
ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    let width = mouseX - startX;
    let height = mouseY - startY;

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
    ctx.fillRect(0, y2, topX, height); // left
    ctx.fillRect(botX, y2, canvas.width, height); // right
    ctx.fillRect(0, botY, canvas.width, canvas.height); // bottom
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

let save = document.getElementById("save");

save.addEventListener("click", () => {
    let width = mouseX - startX;
    let height = mouseY - startY;
    const y1 = startY + height;
    const y2 = startY;
    let topY = y1 < y2 ? y1 : y2;
    const x1 = startX + width;
    const x2 = startX;
    let topX = x1 < x2 ? x1 : x2;

    resizeImage(width, height, topX, topY)
});

function resizeImage(width, height, x, y, callback) {
    const canvas = document.getElementById('canvas3');
    let context = canvas.getContext('2d');
    let imageObj = new Image();

    imageObj.onload = function () {
        const yScale = this.naturalHeight / window.innerHeight;
        const xScale = this.naturalWidth / window.innerWidth;
        canvas.width = width*xScale;
        canvas.height = height*yScale;
        context.drawImage(
            imageObj, 
            x*xScale, 
            y*yScale, 
            Math.abs(width)*xScale, 
            Math.abs(height)*yScale, 
            0, 
            0, 
            Math.abs(width)*xScale, 
            Math.abs(height)*yScale
        );
        // callback(canvas.toDataURL());
    };

    imageObj.src = src;
}