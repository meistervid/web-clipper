let fetchWorkspaces = document.getElementById("fetchWorkspaces");

fetchWorkspaces.addEventListener("click", async () => {
  fetch('http://localhost:5001/mobile/login/1')
    .then(response => response.text())
    .then(function(token) {
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
      localStorage.clear();
      const id = Date.now();
      localStorage.setItem(id, dataUrl);
      window.open(`chrome-extension://kciheegmooocpbodmemaongdaohpfbdd/screenshot.html?id=${id}`);
    });
});

