// background.js

console.log('background.js');


chrome.runtime.onInstalled.addListener(function() {
    enableExtensionFunctionality();
});
  
chrome.runtime.onStartup.addListener(function() {
    enableExtensionFunctionality();
});



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.toggleExtension) {
    if (request.state) {
      enableExtensionFunctionality();
      console.log('enabled');
    } else {
      disableExtensionFunctionality();
      console.log('disabled');
    }
  }
});

function enableExtensionFunctionality() {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.tabs.sendMessage(tab.id, { action: 'applyChanges' });
    });
  });
  console.log('Extension enabled');
}

function disableExtensionFunctionality() {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.tabs.sendMessage(tab.id, { action: 'revertChanges' });
    });
  });
  console.log('Extension disabled');
}