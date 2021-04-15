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
});