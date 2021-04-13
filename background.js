let type = 'content';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ type });
  console.log('Yolo wololo');
});