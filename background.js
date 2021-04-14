let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
  // fetch('http://localhost:5001/mobile/login/1')
  //     .then(response => response.text())
  //     .then(function(token) {
  //       console.log('token', token)
  //         return fetch('http://localhost:5001/mobile/api/gql', {
  //             body: JSON.stringify({ query: 'query {  foldersAndNotesByStatus(folderStatus:ACTIVE, noteStatus:ACTIVE) {    name,    id  }}', variables: {} }),
  //             method: 'POST',
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //               'Content-Type': 'application/json'
  //             },
  //         });
  //     })
  //     // .then(response => sendResponse({result: response.results}))
  //     .then(response => response.json())
  //     .then(console.log);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
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
      .then(response => sendResponse({result: response.results}))
      // .then(response => response.json())
      // .then(console.log);
      return true;
  });