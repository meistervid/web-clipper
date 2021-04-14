// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  console.log('loaded color no action whatever shit piss', color)
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    console.log('lololol')
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  async function setPageBackgroundColor() {


    const data = await fetch('http://localhost:5001/mobile/login/1')
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
      .then(console.log);
      
    console.log(data)

    chrome.storage.sync.get("color", ({ color }) => {
      console.log('color', color)
      document.body.style.backgroundColor = color;
    });
}