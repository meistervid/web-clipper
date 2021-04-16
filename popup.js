let fetchWorkspaces = document.getElementById("fetchWorkspaces");

fetchWorkspaces.addEventListener("click", async () => {
  console.log('lololol')
  fetch('http://localhost:5001/mobile/login/1')
    .then(response => response.text())
    .then(function(token) {
      console.log('token', token)
        return fetch('http://localhost:5001/mobile/api/gql', {
            body: JSON.stringify({ query: 'query {  foldersAndNotesByStatus(folderStatus:ACTIVE, noteStatus:ACTIVE) {    name,    id  }}', variables: {} }),
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
        });
    })
    .then(response => response.json())
    .then(({ data }) => {
      document.getElementById("fetchWorkspaces").innerHTML = JSON.stringify(data);
    });

    chrome.tabs.captureVisibleTab(null,{},function(dataUrl){
      const screenshot = document.getElementById("screenshot");
      document.getElementById("screenshot").src = dataUrl;

      console.log('screenshot', screenshot.clientWidth)

      const canvas = document.createElement('canvas');

      canvas.id = "canvas";
      canvas.width = 600;
      canvas.height = 600;
      canvas.style.top = '0px';
      canvas.style.position = "absolute";
      canvas.style.zIndex = 999;

      const body = document.getElementsByTagName("body")[0];
      body.appendChild(canvas);

      // Some optional drawings.
      var ctx = canvas.getContext("2d");
      console.log('ctx', ctx)

      // style the context
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 3;

      // calculate where the canvas is on the window
      // (used to help calculate mouseX/mouseY)
      var offsetX = 8;
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

      function handleMouseOut(e) {
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
        console.log('e', e)
          handleMouseDown(e);
      };
      canvas.onmousemove = function (e) {
        console.log('e', e)
          handleMouseMove(e);
      };
      canvas.onmouseup = function (e) {
        console.log('e', e)
          handleMouseUp(e);
      };
      // canvas.onmouseout = function (e) {
      //   console.log('e', e)
      //     handleMouseOut(e);
      // };
    });
});

